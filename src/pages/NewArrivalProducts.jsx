import React from 'react';
import useProducts from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import { RiLoaderLine } from "react-icons/ri";

export default function NewArrivalProducts() {
  const { productsQuery: { isPending, error, data:products}} = useProducts();

  return (
    <>
      {isPending && <div className='flex justify-center mt-60'><RiLoaderLine className="animate-loading w-20 h-20 mt-10 text-brand" /></div>}
      { error && <p>{error}</p>}
      <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-12 mt-24 my-28 body-wrapper'>
        {products && products
          .filter(item => item.trend.includes("New"))
          .map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
      </ul>
    </>
  );
}
