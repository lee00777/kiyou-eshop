import { React, useState } from 'react';
import { uploadImage } from '../api/uploader';
import useProducts from '../hooks/useProducts';
import Popup from '../components/Popup';
import { useCallback } from 'react';

export default function NewProduct() {
  const [ product, setProduct ] = useState({});             
  const [ file, setFile ] = useState();                     
  const [ optionFile, setOptionFile ] = useState();        
  const [ isUploading, setIsUploading ] = useState(false);  
  const [ success, setSuccess ] = useState(false);          

  const { addProduct } = useProducts(); 

  const handleChange = useCallback((ev)=>{
    const { name, value, files } = ev.target;
    if(name === "file"){
      setFile(files && [...files]); 
      return;
    }
    if(name === "optionFile"){
      setOptionFile(files && [...files]);
      return;
    }
    setProduct((product)=> ({...product, [name]: value}))
  },[])

  const removeFileImage = useCallback(() =>{
    const fileInputs= document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input=>{
      input.value='';
    })
  },[])

  const handleSubmit = useCallback(async(ev) => {
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
      addProduct.mutate({product,urls}, {onSuccess: ()=>{ 
        setSuccess(true);
      }})
      setProduct({})
      setFile();
      setOptionFile();
      removeFileImage();      
      setIsUploading(false)
    }catch(err){
      console.error('Error happened:', err)
    }
  },[ file, optionFile, addProduct, removeFileImage, product])

  return (
    <section className='w-full text-center body-wrapper mt-28 my-12'>
      <h2 className='text-2xl font-semibold mt-36 mb-12 text-brand'>Product Registration</h2>
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
          { success && <Popup child={
            <div className='w-full  h-full flex flex-col justify-center items-center'>
              <p className='w-5/6 text-center mx-auto text-lg -mb-3 text-black-400'> <span className=' border-b-8 border-[#ffe7e2]'>Item </span>has been registered to database!</p>
              <div className='w-5/6 mt-16 text-center'>
                <button className='w-full sm:w-auto h-auto p-3 rounded-lg border border-gray-400 text-gray hover:brightness-110' onClick={()=>{setSuccess(false)}}>Close</button> 
              </div>
            </div>
            }/>}
        </form>
    </section>
  );
}

