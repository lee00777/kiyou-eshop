import React from 'react';
import { useState } from 'react';
import { uploadImage } from '../api/uploader';
import useProducts from '../hooks/useProducts';

export default function NewProduct() {
  const [ product, setProduct ] = useState({});            // 사용자 input을 받아와서 database에 저장하기 위해 임시로 사용되는 변수
  const [ file, setFile] = useState();                     // 사용자 input 중 file이미지를 받아와서 database에 저장하기 위해 임시로 사용되는 변수 (product에 별도로 하는 이유는, 파일은 cloudinary라는 db에 저장하고 그걸 firebase에 다시 넣기 위함임)
  const [ optionFile, setOptionFile] = useState();                     // 사용자 input 중 file이미지를 받아와서 database에 저장하기 위해 임시로 사용되는 변수 (product에 별도로 하는 이유는, 파일은 cloudinary라는 db에 저장하고 그걸 firebase에 다시 넣기 위함임)
  const [ isUploading, setIsUploading ] = useState(false); // better UX위해, 현재 업로드 중이라는거 알려주는 용도
  const [ success, setSuccess ] = useState();              // better UX위해, 성공적으로 업로드 되었다는거 알려주는 용도

  const { addProduct} = useProducts(); //[3] 최근방식

  const handleChange = (ev)=>{
    const { name, value, files } = ev.target;
    if(name === "file"){
      setFile(files && [...files]); // if(files){setFile(files[0])}의 의미임
      return;
    }
    if(name === "optionFile"){
      setOptionFile(files && [...files]);
      return;
    }
    setProduct((product)=> ({...product, [name]: value}))
  }
  const removeFileImage = () =>{
    const fileInputs= document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input=>{
      input.value='';
    })
  }
  async function handleSubmit(ev){
    ev.preventDefault();
    setIsUploading(true);

    try{
      let ProductUrls = [];
      let optionUrls = [];
      for (const item of file){
        const url = await uploadImage(item);
        ProductUrls.push(url);
      }
      for (const item of optionFile){
        const url = await uploadImage(item);
        optionUrls.push(url);
      }
      let urls = {
        product: ProductUrls,
        options: optionUrls
      }
      addProduct.mutate({product,urls}, {onSuccess: ()=>{ //[2] Firebase에 새로운 제품을 추가함
        setSuccess('Item is registered successfully!');
        setTimeout(()=>{
          setSuccess(null);
        },4000)
      }})
      setProduct({})
      setFile();
      setOptionFile();
      removeFileImage();       // 파일은 value attribute이 불가능하므로, js에 불러와서 value를 clear해줘야함
      setIsUploading(false)
    }catch(err){
      console.error('Error happened:', err)
    }
  }
  
  return (
    <section className='w-full text-center body-wrapper mt-28 my-12'>
      <h2 className='text-2xl font-semibold mt-36 mb-12 text-brand'>Product Registration</h2>
      {success && <p className='my-s'>✅{success}</p> }
      { file && <img className="w-96 mx-auto mb-2" src={URL.createObjectURL(file[0])} alt='local file'/>}
        <form onSubmit={handleSubmit} className='flex flex-col px-12'>
          <label htmlFor="file" className='text-left font-semibold text-description'>Product Images</label>
          <input type="file" accept='image/*' name="file" multiple required onChange={handleChange} />  
          <label htmlFor="optionFile" className='text-left font-semibold text-description mt-2'>Option Images</label>
          <input type="file" accept='image/*' name="optionFile" multiple required onChange={handleChange} />  
          <h4 className='text-left mt-2 font-semibold text-description'> Product information </h4>
          <input type="text" name="title" value={product.title?? ''} placeholder='Product Name' required onChange={handleChange}/>
          <input type="number" name="price" value={product.price ?? ''} placeholder='Price' required onChange={handleChange}/>
          <input type="text" name="category" value={product.category ?? ''} placeholder='Categories' required onChange={handleChange}/>
          <input type="text" name="description" value={product.description ?? ''} placeholder='Description' required onChange={handleChange}/>
          <input type="text" name="size" value={product.size ?? ''} placeholder='Size (Separated by comma (,))' required onChange={handleChange} />
          <input type="text" name="trend" value={product.trend ?? ''} placeholder='Trends (Separated by comma (,))' required onChange={handleChange} />
          <input type="text" name="colors" value={product.colors ?? ''} placeholder='Colors (Separated by comma (,))' required onChange={handleChange} />        
          <button  className="w-full bg-brand py-2 mt-5 px-4 text-white rounded-sm hover:brightness-110" disabled={isUploading} >
          { isUploading? 'Uploading...' : 'Add Products'}
          </button>
        </form>
    </section>
  );
}

