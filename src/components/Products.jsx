import React, { Suspense } from 'react';
import ProductCard from './ProductCard';
import useProducts from '../hooks/useProducts';
import { RiLoaderLine } from "react-icons/ri";
import useFilters from '../hooks/useFilters';
import { useState } from 'react';
import { useEffect } from 'react';
const CardComponent = React.lazy(() => import('./ProductCard'));



export default function Products({category}) {
  const { productsQuery: { isPending, error, data:products}} = useProducts();
  const { filterQuery:{ data : filters } } = useFilters(category);

  const [ clickedFilter , setClickedFilter ] = useState('All');
  const [ filterFlag, setFilterFlag ] = useState(false);

  const handleFilterSelection = (filter)=>{
    setClickedFilter(filter)
    setFilterFlag(true);
  }
  useEffect(()=>{
    setClickedFilter('All')
  },[category])

  useEffect(()=>{
    window.scrollTo({top:0 });
  })
  
  return (
    <div className='body-wrapper max-w-screen-2xl mx-auto'>
      {isPending && <div className='flex justify-center mt-60'><RiLoaderLine className="animate-loading w-20 h-20 mt-10 text-brand" /></div>}
      { error && <p>{error}</p>}

      {/* 필터링 */}
      {category && category.length >=1 && 
        <div className='mt-36 text-center'>
          { !isPending && <h3 className='text-2xl'>{category}</h3>}
          <ul className='flex gap-3 justify-center pt-10'>
            {filters && (
              <>
                <li className={`cursor-pointer px-5 py-2 text-sm rounded-lg ${clickedFilter === 'All' ? "bg-brand text-white" : ""}`} onClick={() => handleFilterSelection('All')} >All</li>
                {filters.map(filter =>
                  <li className={`cursor-pointer px-5 py-2 text-sm rounded-lg ${clickedFilter === filter ? "bg-brand text-white" : ""}`} onClick={() => handleFilterSelection(filter)}>{filter}</li>
                )}
              </>
            )}
          </ul>
        </div>
      }

      <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 p-16 mt-4 my-12  h-auto'>
        {/* 맨 처음 페이지에 모든 제품들 다 보여주기  */}
        { category.length === 0 && products && products.map(product => <ProductCard key={product.id} product={product}/>)}
        {/* skirts, dresses, pants처럼 특정카테고리 클릭하면 보여주기 */}
        {/* { category && category.length >= 1 && products && (
          clickedFilter === 'All' ?
            products
              .filter(item => item.category.includes(category))
              .map(item => (
                <ProductCard key={item.id} product={item} />
              ))
          :
            filterFlag &&
            (() => {
              let filteredProducts = products
                .filter(item => item.category.includes(category))
                .filter(item => item.category.includes(clickedFilter));
              if (filteredProducts.length === 0) {
                return  <p className='col-start-2 col-span-2 mt-10 text-center text-lg text-description'>🚫 No items match the selected filter </p>
              } else {
                return filteredProducts.map(item => (
                  <ProductCard key={item.id} product={item} />
                ));
              }
            })()
          )
        } */}

        { category && category.length >= 1 && products && (
            clickedFilter === 'All' ?
              products
                .filter(item => item.category.includes(category))
                .map(item => (
                  <Suspense fallback={<div>Loading...</div>}>
                    <CardComponent key={item.id} product={item} />
                  </Suspense>
                ))
            :
              filterFlag &&
              (() => {
                let filteredProducts = products
                  .filter(item => item.category.includes(category))
                  .filter(item => item.category.includes(clickedFilter));
                if (filteredProducts.length === 0) {
                  return  <p className='col-start-2 col-span-2 mt-10 text-center text-lg text-description'>🚫 No items match the selected filter </p>
                } else {
                  return filteredProducts.map(item => (
                    <Suspense fallback={<div>Loading...</div>}>
                      <CardComponent key={item.id} product={item} />
                    </Suspense>
                  ));
                }
              })()
          )
        }
      </ul>
    </div>
  );
}

