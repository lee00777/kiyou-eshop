import  Button from '../components/UI/Button'
import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useCart from '../hooks/useCart';
import Carousel from 'react-multi-carousel';
import { GrNext, GrPrevious } from "react-icons/gr";
import { FcRemoveImage } from "react-icons/fc";

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
  const [ success, setSuccess] = useState();
  const { addOrUpdateItem } = useCart();
  const {state:{
    product:{id, image,title,description, size, trend, colors, category, price}
  }} = useLocation();
  const [ selectedSize, setSelectedSize ] = useState(size && size[0]);
  const [ selectedColor, setSelectedColor] = useState(colors && colors[0]);
  const handleSizeSelect = (ev)=>{
    setSelectedSize(ev.target.value);
  }
  const handleClick = () =>{
    // 장바구니에 추가하기
    const product ={
      id, image, title, price, description, option: {selectedSize, selectedColor}, quantity:1
    }
    addOrUpdateItem.mutate(product, {
      onSuccess: ()=>{
        setSuccess('Added to Cart');
        setTimeout(()=> setSuccess(null), 3000)
      }
    });
  }

  const handleOption = (idx) =>{
    setSelectedColor(colors[idx]);
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
                  return <img className='m-2 pr-4 h-full object-contain my-auto' onError={(ev)=>errorHandling(ev)} src={item} alt="extra pic" onClick={()=>handleExtraImage(idx)} />
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
              <p className='w-auto px-3 py-1 flex items-center mr-2 rounded-lg bg-trendbtn text-sm text-trendbtnfont font-semibold'>{tag}</p>
            )}
          </div>
          {/* 옵션 */}
          <div className='mt-10'>
            <p className="text-brand font-bold">Options:
              <span className='text-black ml-3 font-normal'>{selectedColor}</span>
            </p>
            <div className='w-full mt-5 flex ml-5 justify-start flex-wrap'>
              {image && image.options.map((option, idx)=> <img className="w-20 mr-2 cursor-pointer" src={option} alt="color option" onClick={()=>{handleOption(idx)}}/>)}
            </div>
          </div>
          {/* 사이즈 */}
          <div className='flex items-center mt-5'>
            <label className="text-brand font-bold" htmlFor='select'>Size:</label>
            <select className='p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none' id="select" onChange={handleSizeSelect} value={selectedSize}>
              { size && size.map((option, index)=> <option key={index}>{option}</option>)}
            </select>
          </div>
          { success && 
            <div className='w-full bg-green-700'>
              <p className='text-lg text-white text-center mb-3'>✅ {success}</p>
            </div>
          }
          <div className="text-center mt-3 h-8 flex items-center justify-center mt-5 bg-button y-2 px-4 text-white rounded-sm hover:brightness-110" onClick={handleClick}>
            <button className="cursor-pointer">ADD TO CART</button>
          </div>

        </div>
      </section>
    </>
  );
}
