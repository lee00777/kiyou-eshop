import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { getProducts } from '../api/firebase';
import ProductCard from './ProductCard';
import useProducts from '../hooks/useProducts';
import { RiLoaderLine } from "react-icons/ri";

export default function Products({category}) {
  const { productsQuery: { isPending, error, data:products}} = useProducts();
  return (
    <>
      {isPending && <div className='flex justify-center mt-60'><RiLoaderLine className="animate-loading w-20 h-20 mt-10 text-brand" /></div>}
      { error && <p>{error}</p>}
      <ul className=' max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-12 mt-24 my-28'>
        {}
        {category.length === 0 && products && products.map(product => <ProductCard key={product.id} product={product}/>)}
        {category.length >=1 && products && products
          .filter(item => item.category.includes(category))
          .map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
      </ul>
    </>
  );
}

