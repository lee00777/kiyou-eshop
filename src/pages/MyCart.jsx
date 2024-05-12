import React from 'react';
import CartItem from '../components/CartItem';
import PriceCard from '../components/PriceCard';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import Button from '../components/UI/Button';
import useCart from '../hooks/useCart';
import { LiaCartPlusSolid } from "react-icons/lia";
import { BsCartPlus } from "react-icons/bs";
import { RiLoaderLine } from "react-icons/ri";
const SHIPPING = 30;

export default function MyCart() {
  const { cartQuery: { isPending, data: products}} = useCart();

  if( isPending )return <div className='flex justify-center mt-60'><RiLoaderLine className="animate-loading w-20 h-20 mt-10 text-brand" /></div>

  const hasProducts = products && products.length >0;
  const totalPrice = products && products.reduce((prev,current) => prev + parseInt(current.price) * current.quantity, 0);

  return (
    <section className='p-8 flex flex-col body-wrapper bg-background'>
      <p className='text-2xl text-center font-bold pb-4 border-b border-gray-300'>My cart</p>
      { !hasProducts && 
        <div className='mt-32 h-96 flex flex-col items-center justify-center bg-white  w-4/6 mx-auto rounded-lg'>
          {/* <LiaCartPlusSolid className="text-2xl w-24 h-24 rounded-full bg-background text-gray-400 p-2 mb-8"/> */}
          <BsCartPlus className="text-gray-400 text-md w-24 h-24 bg-background rounded-lg p-4 mb-8"/>
          <p className="font-bold text-xl mb-4">Your cart is empty. </p> 
          <p className="">Find your style at <span className="text-brand">KIYOU! </span> </p>
        </div>}
      { hasProducts && <>
        <ul className='border-b border-gray-300 mb-8 p-4 px-8 mt-10'>
          {products && products.map((product)=>{
            return <CartItem key={product.id} product={product} />
          })}
        </ul>
        <div className='flex justify-between items-center mb-6 px-2 md:px-8 lg:px-16'>
          <PriceCard text="Product Price" price={totalPrice}/>
          <BsFillPlusCircleFill className='shrink-0'/>
          <PriceCard text="Delivery fee" price={SHIPPING}/>
          <FaEquals className='shrink-0'/>
          <PriceCard text="Total Price" price={SHIPPING + totalPrice}/>
        </div>
        <Button className="mx-5" text="Order"/>
      </>}
    </section>
  );
}

