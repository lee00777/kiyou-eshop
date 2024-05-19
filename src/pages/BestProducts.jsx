import React from 'react';
import useProducts from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import { RiLoaderLine } from "react-icons/ri";
import { useEffect } from 'react';

export default function BestProducts() {
  const { productsQuery: { isPending, error, data:products}} = useProducts();

  useEffect(()=>{
    window.scrollTo({top:0 });
  })

  return (
    <>
      {isPending && <div className='flex justify-center mt-60'><RiLoaderLine className="animate-loading w-20 h-20 mt-10 text-brand" /></div>}
      { error && <p>{error}</p>}
      { !isPending && <h3 className='text-2xl mt-36 -mb-28 text-center'>BEST ITEM ❣️</h3>}
      <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-12 my-28 body-wrapper'>
        {products && products
          .filter(item => item.trend.includes("Best"))
          .map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
      </ul>
    </>
  );
}

