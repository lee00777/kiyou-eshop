import React from 'react';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';
import useCart from '../hooks/useCart';
import {useNavigate} from "react-router-dom"

const ICON_CLASS="transition-all cursor-pointer hover:text-brand hover:scale-105 mx-1"

export default function CartItem({product, product: {id, image, title, option, quantity, price, original}}) {
  const { addOrUpdateItem, removeItem } = useCart();
  const handleMinus = () =>{
    if(quantity<2)return;
    addOrUpdateItem.mutate({
      ...product,
      quantity: quantity -1
    })
  }
  const handlePlus = () => addOrUpdateItem.mutate({...product,quantity: quantity +1 })
  const handleDelete = () =>removeItem.mutate(id);
  const navigate = useNavigate();

  return (
    <li key={id}  className='flex flex-col md:flex-row cursor-pointer justify-between my-4 items-center p-10 border rounded-lg bg-white border-gray-200 shadow-lg '>
      <img className="w-24 md:w-48 rounded-lg " src={image.product[0]} alt={title} onClick={()=>{navigate(`/products/${id}`, {state:{product:original}})}} />
      <div className='flex-1 flex justify-between ml-4'>
        {/* <div className='flex basis-4/5 justify-between items-center text-sm md:text-base '> */}
        <div className='mt-5 md:mt-0 md:flex basis-4/5 justify-between items-center text-sm md:text-base' onClick={()=>{navigate(`/products/${id}`, {state:{product:original}})}} >
          <div className='basis-1/3'>
            <p className='text md lg:text-lg text-brand font-bold'>{title}</p>
            <p className='text-md '>{product.description}</p>
            <p className='border-b border-gray-400 my-2 w-full md:invisible'></p>
          </div>
          <div className='text-left md:text-center basis-1/3 text-sm md:text-base '>
            {/* <h3 className='hidden md:block mb-2 text-sm md:text-base'>Options </h3> */}
            <p className='text-md'><b>Size:</b> {option.selectedSize}</p>
            <p className='text-md'><b>Color:</b> {option.selectedColor}</p>
            <p className='border-b border-gray-400 my-2 w-full md:invisible'></p>
          </div>
          <div className='basis-1/3 text-left md:text-center'>
            <p className='text-sm md:text-lg'>${price}</p>
          </div>
        </div>
        
        <div className='ml-5 md:ml-0 text-sm md:text-xl lg:text-2xl flex items-center'>
          <AiOutlineMinusSquare className={ICON_CLASS} onClick={handleMinus} />
          <span>{quantity}</span>
          <AiOutlinePlusSquare className={ICON_CLASS} onClick={handlePlus}/>
          <RiDeleteBin5Fill className={ICON_CLASS} onClick={handleDelete} />
        </div>
      </div>
    </li>
  );
}

