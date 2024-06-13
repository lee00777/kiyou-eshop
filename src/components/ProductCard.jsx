import { React, memo }  from 'react';
import { useNavigate } from "react-router-dom"
import { HiOutlineShoppingBag } from "react-icons/hi2";
import colorMatch from '../utils/color';

export default memo(function ProductCard({product, product: {id, image, title, category, price, }}) {
  const navigate = useNavigate();
  return (
    <li onClick={()=>{navigate(`/products/${id}`, {state:{product}})}} key={id} className='rounded-lg h-fit shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105'>
      <img className="w-full" src={image.product[0]} alt={title}/>
        <div className='mt-2 px-2 text-lg flex justify-between items-center border-b border-gray-300 pb-2 '>
            <h3 className='truncate'>{title}</h3>
            <p className='font-bold'>{`$${price}`}</p>
        </div>
        <div className=''>
          <div className='flex mt-3 ml-1 mb-2'>
            {product.trend.map(tag =>
              <p key={tag} className='w-auto  px-2 flex items-center mr-2 rounded-lg bg-brand text-sm text-white '>{tag}</p>
            )}
          </div>
          <div className='flex ml-2'>
            {product.colors.map(color=>colorMatch(color))}
          </div>
          <div className='flex justify-between'>
            <p className='mb-2 px-2 text-gray-600'>{category[0]}</p>
            <HiOutlineShoppingBag className='mr-2 text-2xl text-brand'/>
          </div>
        </div>
    </li>
  );
}
)

