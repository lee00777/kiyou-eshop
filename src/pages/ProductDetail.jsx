import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { GrNext, GrPrevious } from "react-icons/gr";
import { useAuthContext } from '../contexts/AuthContext';
import { responsive } from '../utils/slidersetting';
import useProducts from '../hooks/useProducts';
import useCart from '../hooks/useCart';
import Popup from '../components/Popup';
import Slider from '../components/UI/Slider';
import Option from '../components/Option';
import Size from '../components/Size';

export default function ProductDetail() {
  const { productsQuery: { isPending, data:products}} = useProducts();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending && products) {
      if (!products.map(item => item.id).includes(id)) {
        navigate("/not-found");
      }
    }
  }, [isPending, products, id, navigate]);

  const {state:{
    product:{ image,title,description, size, trend, colors, category, price},
  },} = useLocation();

  const { uid, login } = useAuthContext();
  const { addOrUpdateItem } = useCart();

  // 옵션 항목들
  const [ selectedSize, setSelectedSize ] = useState(size && size[0]);
  const [ selectedColor, setSelectedColor] = useState(colors && colors[0]);
  const [ selectedOptionIdx, setSelectedOptionIdx ] = useState(0);
  // 카트 
  const [ addedCart, setAddedCart ] = useState(false);
  // 로그인 여부
  const [ notLoggedIn, setNotLoggedIn ] = useState(false);
  
  const handleSizeSelect = useCallback((ev)=>{
    setSelectedSize(ev.target.value);
  },[])

  const handleClick = useCallback(() =>{
    if(uid=== null){
      setNotLoggedIn(true);
    }else{
      const product ={
        id, image, title, price, description, option: {selectedSize, selectedColor}, quantity:1,
        original:{id, image,title,description, size, trend, colors, category, price}
      }
      addOrUpdateItem.mutate(product, {
        onSuccess: ()=>{
          setAddedCart(true)
        }
      });
    }
  }
,[uid, addOrUpdateItem, id, image, title, price, description, selectedColor, selectedSize, category, colors, size, trend])

  const handleOption = useCallback((idx) =>{
    setSelectedColor(colors[idx]);
    setSelectedOptionIdx(idx)
  },[colors])

  const handleLogin = useCallback(()=>{
    login();
    setNotLoggedIn(false);
  },[login])

  const imgErrorHandling = useCallback((ev)=>{
    ev.target.src="/images/errorDefaultImg.jpeg";
  },[])

  useEffect(()=>{
    window.scrollTo({top:0 });
  })

  // next, before btn 핸들링
  const [ disableNextBtn, setDisableNextBtn ] = useState(false);
  const [ disablePreviousBtn, setDisablePreviousBtn ] = useState(true);
  const [ imageIndex, setImageIndex ] = useState(0);

  const showNextImage = useCallback(() => {
    setImageIndex(prevIndex => prevIndex + 1);
    if(imageIndex+1 >=1){
      setDisablePreviousBtn(false)
    }
    if(imageIndex+1 === image.product.length-1){
      setDisableNextBtn(true)
    }
  },[image.product.length, imageIndex]);

  const showPreviousImage = useCallback(() => {
    setImageIndex(prevIndex => prevIndex - 1);
    if(imageIndex-1 <= image.product.length-1){
      setDisableNextBtn(false)
    }
    if(imageIndex-1 === 0){
      setDisablePreviousBtn(true)
    }
  },[image.product.length, imageIndex])

  const handleExtraImage = useCallback((idx) => {
    setImageIndex(idx);
    if(idx > 0 && idx < image.product.length-1){
      setDisableNextBtn(false);
      setDisablePreviousBtn(false);
    }else if (idx === 0){
      setDisablePreviousBtn(true);
      setDisableNextBtn(false);
    }else if(idx === image.product.length-1){
      setDisableNextBtn(true);
      setDisablePreviousBtn(false)
    }
  },[image.product.length])

  const displayedImage = image.product[imageIndex];

  return (
    <section className='flex flex-col md:flex-row p-4 mt-32 justify-center'>
      {/* 왼쪽(제품 사진) 파트 */}
      <div className='w-full md:w-2/5 mr-3'>
        <div className='img-container relative'>
          <img className='w-full p-4 mx-auto rounded-md relative' onError={(ev)=>imgErrorHandling(ev)} src={displayedImage} alt="product pic"/>
          {!disableNextBtn && <GrNext className="absolute top-1/2 right-6 text-5xl p-2 text-white cursor-pointer w-12 h-12 hover:brightness-110 rounded-full bg-brand opacity-75" onClick={showNextImage}/>}
          {!disablePreviousBtn && <GrPrevious className='absolute top-1/2 left-6 text-5xl p-2 text-white cursor-pointer w-12 h-12 hover:brightness-110 rounded-full bg-brand opacity-75' onClick={showPreviousImage}/>}
        </div>
        <Slider cssStyle={'flex m-4 border h-40 z-0'} responsiveStyle={responsive} displayDots={true}>
            {image.product.map((item, idx)=>{
                return <img className='m-2 pr-4 h-full object-contain my-auto cursor-pointer' key={idx} onError={(ev)=>imgErrorHandling(ev)} src={item} alt="extra pic" onClick={()=>handleExtraImage(idx)} />
            })}
        </Slider>
      </div>

      {/* 오른쪽 파트 */}
      <div className='w-full basis-5/12 flex- flex-col p-4'>
        <h2 className='text-3xl font-bold py-2 '>{title}</h2>
        <div className='flex w-full justify-between items-center text-2xl font-bold py-2 border-b border-gray-400'>
          <p className=''>${price}</p>
          <p className='text-sm font-light '>{category[0]}</p>
        </div>
        {/* 트랜드 */}
        <p className='py-4 text-lg'>{description}</p>
        <div className='flex mb-2'>
          {trend.map(tag =>
            <p key={tag} className='w-auto px-3 py-1 flex items-center mr-2 rounded-lg bg-trendbtn text-sm text-trendbtnfont font-semibold'>{tag}</p>
          )}
        </div>
        <Option selectedColor={selectedColor} image={image} selectedOptionIdx={selectedOptionIdx} handleOption={handleOption}/>
        <Size size={size} handleSizeSelect={handleSizeSelect} selectedSize={selectedSize} handleClick={handleClick}/>    
      </div>

      { addedCart && <Popup child={
        <div className='w-full  h-full flex flex-col justify-center items-center '>
          <p className='w-5/6  text-center mx-auto text-lg -mb-3 text-black-400 mt-5'> <span className=' border-b-8 border-[#ffe7e2]'>"{title}" </span>has been added to your cart</p>
          <div className='w-5/6 mt-12 text-center mb-3'>
            <button className='w-full sm:w-auto h-auto p-3 mb-2 rounded-lg border border-gray-400 text-gray hover:brightness-110' onClick={()=>{setAddedCart(false)}}>Close</button> 
            <button className='w-full sm:w-auto h-auto p-3 rounded-lg md:ml-5  text-white bg-brand hover:brightness-110' onClick={()=>{navigate(`/carts`)}}>View Cart</button>
          </div>
        </div>
        }/>
      }
      {
        notLoggedIn &&  <Popup child={
          <div className='w-full h-full flex flex-col justify-center items-center'>
          <p className='w-5/6  text-center mx-auto text-lg -mb-3 text-black-400'>To add items to your cart, please <span className=' border-b-8 border-[#ffe7e2]'>login </span>.</p>
          <div className='w-5/6 mt-12 text-center '>
            <button className='w-full sm:w-auto h-auto p-3 rounded-lg border border-gray-400 text-gray hover:brightness-110' onClick={()=>{setNotLoggedIn(false)}}>Close</button> 
            <button className='w-full sm:w-auto h-auto p-3 mb-3 rounded-lg md:ml-5  text-white bg-brand hover:brightness-110' onClick={handleLogin} >Log In</button>
          </div>
        </div>
        }/>
      }
    </section>
  );
}