import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useCart from '../hooks/useCart';
import Carousel from 'react-multi-carousel';
import { GrNext, GrPrevious } from "react-icons/gr";
import {useNavigate} from "react-router-dom"
import Popup from '../components/Popup';
import { useAuthContext } from '../contexts/AuthContext';
import { useEffect } from 'react';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

export default function ProductDetail() {
  const { uid, user } = useAuthContext();
  const { login} = useAuthContext();
  const navigate = useNavigate();
  const { addOrUpdateItem } = useCart();
  const {state:{
    product:{id, image,title,description, size, trend, colors, category, price}
  }} = useLocation();
  const [ selectedSize, setSelectedSize ] = useState(size && size[0]);
  const [ selectedColor, setSelectedColor] = useState(colors && colors[0]);
  const [ selectedOptionIdx, setSelectedOptionIdx ] = useState(0);
  const [ addedCart, setAddedCart ] = useState(false);
  const [ notLoggedIn, setNotLoggedIn ] = useState(false);
  const handleSizeSelect = (ev)=>{
    setSelectedSize(ev.target.value);
  }
  const handleClick = () =>{

    if(uid=== null){
      setNotLoggedIn(true);

    }else{
      // 장바구니에 추가하기
      const product ={
        id, image, title, price, description, option: {selectedSize, selectedColor}, quantity:1
      }
      addOrUpdateItem.mutate(product, {
        onSuccess: ()=>{
          setAddedCart(true)
        }
      });
    }
  }

  const handleOption = (idx) =>{
    setSelectedColor(colors[idx]);
    setSelectedOptionIdx(idx)
  }

  // next, before btn 핸들링
  const [ disableNextBtn, setDisableNextBtn ] = useState(false);
  const [ disablePreviousBtn, setDisablePreviousBtn ] = useState(true);
  const [ imageIndex, setImageIndex ] = useState(0);
  const showNextImage = () => {
    setImageIndex(prevIndex => prevIndex + 1);
    if(imageIndex+1 >=1){
      setDisablePreviousBtn(false)
    }
    if(imageIndex+1 === image.product.length-1){
      setDisableNextBtn(true)
    }
  };
  const showPreviousImage = () => {
    setImageIndex(prevIndex => prevIndex - 1);
    if(imageIndex-1 <= image.product.length-1){
      setDisableNextBtn(false)
    }
    if(imageIndex-1 === 0){
      setDisablePreviousBtn(true)
    }
  }
  const handleExtraImage = (idx) => {
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
  }
  const displayedImage = image.product[imageIndex];

  const errorHandling = (ev)=>{
    ev.target.src="/images/test.jpeg";
  }

  useEffect(()=>{
    if(uid){
      setNotLoggedIn(false);
    }else{
      setNotLoggedIn(true)
    }
  },[uid])

  return (
    <>
      <section className='flex flex-col md:flex-row p-4 mt-32 justify-center'>
        {/* image들 (왼쪽) */}
        <div className='w-full md:w-2/5 mr-3'>
          <div className='img-container relative'>
            <img className='w-full p-4 mx-auto rounded-md relative' onError={(ev)=>errorHandling(ev)}  src={displayedImage} alt="product pic"/>
            {
              !disableNextBtn && <GrNext className="absolute top-1/2 right-6 text-5xl p-2 text-white cursor-pointer w-12 h-12 hover:brightness-110 rounded-full bg-brand opacity-75" onClick={showNextImage}/>
            }
            {
              !disablePreviousBtn && <GrPrevious className='absolute top-1/2 left-6 text-5xl p-2 text-white cursor-pointer w-12 h-12 hover:brightness-110 rounded-full bg-brand opacity-75' onClick={showPreviousImage}/>
            }
          </div>
          <Carousel 
              className='flex m-4 border h-40'
              swipeable={true}
              centerMode
              draggable={false}
              responsive={responsive}
              arrows
              customTransition="all 0.5s linear"
              transitionDuration={500}
              rewind={false}
              rewindWithAnimation={false}
              shouldResetAutoplay
              >
              {image.product.map((item, idx)=>{
                  return <img className='m-2 pr-4 h-full object-contain my-auto' key={idx} onError={(ev)=>errorHandling(ev)} src={item} alt="extra pic" onClick={()=>handleExtraImage(idx)} />
              })}
          </Carousel>
        </div>
        {/* 오른쪽 사항 */}
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
          {/* 옵션 */}
          <div className='mt-10'>
            <p className="text-brand font-bold">Options:
              <span className='text-black ml-3 font-normal'>{selectedColor}</span>
            </p>
            <div className='w-full mt-5 flex ml-5 justify-start flex-wrap'>
              {image && image.options.map((option, idx)=> <img className={`w-20 mr-2 cursor-pointer ${selectedOptionIdx === idx? "border-4 border-brand" : ""}`} key={idx} src={option} alt="color option" onClick={(ev)=>{handleOption(idx,ev)}}/>)}
            </div>
          </div>
          {/* 사이즈 */}
          <div className='flex items-center mt-5'>
            <label className="text-brand font-bold" htmlFor='select'>Size:</label>
            <select className='p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none' id="select" onChange={handleSizeSelect} value={selectedSize}>
              { size && size.map((option, index)=> <option key={index}>{option}</option>)}
            </select>
          </div>
          <div className="text-center h-8 flex items-center justify-center mt-5 bg-button y-2 px-4 text-white rounded-sm hover:brightness-110" onClick={handleClick}>
            <button className="cursor-pointer">ADD TO CART</button>
          </div>


          { addedCart && <Popup child={
            <div className='w-full h-full flex flex-col justify-center items-center '>
              <p className='w-5/6 text-center mx-auto text-lg -mb-3 text-black-400 mt-5'> <span className=' border-b-8 border-[#ffe7e2]'>"{title}" </span>has been added to your cart</p>

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
              <button className='w-full sm:w-auto h-auto p-3 mb-3 rounded-lg md:ml-5  text-white bg-brand hover:brightness-110' onClick={login} >Log In</button>
            </div>
          </div>
            }/>
        }

          
        </div>
      </section>
    </>
  );
}
