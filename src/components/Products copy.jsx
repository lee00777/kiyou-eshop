import React, { Suspense, useEffect, useState, useRef, memo } from 'react';
import ProductCard from './ProductCard';
import useProducts from '../hooks/useProducts';
import useFilters from '../hooks/useFilters';
import { useCallback } from 'react';

const CardComponent = React.lazy(() => import('./ProductCard'));

export default memo(function Products({category}) {
  const { productsQuery: { error, data:products}} = useProducts();
  // 필터 관련 
  const { filterQuery:{ isPending:filterIsPending, error:isFilterError, data : filters } } = useFilters(category); // 필터링 할 목록들 가져오기
  const [ clickedFilter , setClickedFilter ] = useState('All');
  const [ filterFlag, setFilterFlag ] = useState(false);
  const [ priceFilter, setPriceFilter ] = useState();
  const [ filteredProducts, setFilteredProducts ] = useState();

  useEffect(()=>{
    if(products){
      setFilteredProducts(products)
    }
  },[products])


  //아이템 fetching 관련
  // const [ fetchError, setFetchError ] = useState();  
  // const [ isLoading, setIsLoading ] = useState(false);
  // lazy loading 관련
  // const [ lastKey, setLastKey ] = useState(1)
  // const [ items, setItems ] = useState([]);
  // const observerRef = useRef();

  const handleFilterSelection = useCallback((filter)=>{
    setClickedFilter(filter);
    setFilterFlag(true);
  },[])

  const handlePriceRangeFilter = useCallback((ev)=>{
    setPriceFilter(ev.target.value);
    setFilterFlag(true)
  },[])

  useEffect(()=>{
    setClickedFilter('All');
    window.scrollTo({top:0 });
    // setLastKey(1);
    // setItems([]);
  },[category])

  // const handleInfiniteScroll = useCallback(async () => {
  //   try{
  //     if(error){ throw new Error(error) }
  //     if(products){
  //         // 진정한 의미의 infinite scroll로 나중에 바꾸기 (지금은 데이터 가져와서 거기서 그냥 슬라이스 하는 것임)
  //       let max = products.length /10;
  //       let startKey ;
  //       if(lastKey>max){
  //         return;
  //       }
  //       if(lastKey === 1){
  //         startKey = 0;
  //       }else{
  //         if(lastKey === 2){
  //           startKey = 10;
  //         }else if(lastKey === 3){
  //           startKey=30;
  //         }else if(lastKey === 4){
  //           startKey=40;
  //         }else if(lastKey===5){
  //           startKey=50;
  //         }
  //       }
  //       let slicedData  = products.slice( startKey , 10 * lastKey);

  //       if(slicedData){
  //         setItems(prev => [...prev, ...slicedData ]);
  //         setLastKey(prev => prev+1)
  //       }
  //       console.log('어이어이:', lastKey, items)
  //     }
  //   }catch(err){
  //     setFetchError(err);
  //     console.error('Error fetching items:', err)
  //   }
  //   setIsLoading(false)
  // },[error, products, lastKey, items])


  // useEffect(()=>{
  //   observerRef.current = new IntersectionObserver((entries) => {
  //     const firstEntry = entries[0];
  //     if (firstEntry.isIntersecting && !isLoading) {
  //       handleInfiniteScroll();
  //     }
  //   }, { threshold: 0.3 });

  //   observerRef.current.observe(document.getElementById('sentinel'))

  //   return () => {
  //     if (observerRef.current) {
  //       observerRef.current.disconnect();
  //     }
  //   };
  // },[lastKey, isLoading, handleInfiniteScroll])

  return (
    <>
      { !filterIsPending && <h3 className='text-2xl mt-36 text-center'>{category}</h3>}
      <div  id="sentinel"  className='body-wrapper mx-auto flex flex-row justify-evenly'>
      {/* [0] 필터 리스트들 보여주기(예: long, short...) */}
      {/* {category && category.length >=1 && 
        <div className='mt-36 text-center'>
          { isFilterError && <p>{isFilterError}</p>}
          { !filterIsPending && <h3 className='text-2xl'>{category}</h3>}
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
      } */}


      {/* 필터링리스트  */}
      {category && category.length >=1 && 
        <div className='mt-4 text-left '>
        { isFilterError && <p>{isFilterError}</p>}
        <h4 className='text-sm text-bg-description'>Filters</h4>
        <div>
          <p className='text-sm font-bold py-5'>Category</p>
          <ul className='grid w-1/5 -ml-2'>
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

        <div>
          <p className='text-sm font-bold py-5'>Price</p>
          <ul>
            <input type="radio" name="pricerange"  value="25" onChange={handlePriceRangeFilter}/>  
            <label htmlFor="pricerange" className=''>Under $25</label>
          </ul>
        </div>
        </div>
      }



      {/*  제품 아이템들 보여주기 */}      
      { error && <p>{error}</p>}
      <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 p-16 h-auto w-4/5 '>
        {/* [1] landing home 페이지에서 모든 제품들 다 보여주기  */}
        { category.length === 0 && products && products.map(product => <ProductCard key={product.id} product={product}/>)}
        {/* [2-1] Pants, Skirts 등 카테고리로 들어가서 all로 먼저 보여주기  */}
        {/* { category && category.length >= 1 && products && (
            clickedFilter === 'All' ?
            products
                .filter(item => item.category.includes(category))
                .map(item => (
                  <ProductCard key={item.id} product={item}/>
                ))
            :
            // [2-2] FILTER적용!! long, short 등 필터링 클릭하면 필터링 해서 보여주기
              filterFlag &&
              (() => {
                let filteredProducts = products
                  .filter(item => item.category.includes(category))
                  .filter(item => item.category.includes(clickedFilter))
                  .filter(item => item.price<priceFilter
                  );
                if (filteredProducts.length === 0) {
                  // return  <p className='col-start-2 col-span-2 mt-10 text-center text-lg text-description'>🚫 No items match the selected filter </p>
                  return  <p className='col-start-1 col-span-4 -ml-28 mt-10 text-center w-100 text-lg text-description'>🚫 No items match the selected filter </p>
                } else {
                  return filteredProducts.map(item => (
                    <ProductCard key={item.id} product={item}/>
                  ));
                }
              })()
          )
        } */}


          {/* [2-1] Pants, Skirts 등 카테고리로 들어가서 all로 먼저 보여주기  */}
          { category && category.length >= 1 && filteredProducts
          
          
          
          
          // (
          //   clickedFilter === 'All' ?
          //   products
          //       .filter(item => item.category.includes(category))
          //       .map(item => (
          //         <ProductCard key={item.id} product={item}/>
          //       ))
          //   :
          //   // [2-2] FILTER적용!! long, short 등 필터링 클릭하면 필터링 해서 보여주기
          //     filterFlag &&
          //     (() => {
          //       let filteredProducts = products
          //         .filter(item => item.category.includes(category))
          //         .filter(item => item.category.includes(clickedFilter))
          //         .filter(item => item.price<priceFilter
          //         );
          //       if (filteredProducts.length === 0) {
          //         // return  <p className='col-start-2 col-span-2 mt-10 text-center text-lg text-description'>🚫 No items match the selected filter </p>
          //         return  <p className='col-start-1 col-span-4 -ml-28 mt-10 text-center w-100 text-lg text-description'>🚫 No items match the selected filter </p>
          //       } else {
          //         return filteredProducts.map(item => (
          //           <ProductCard key={item.id} product={item}/>
          //         ));
          //       }
          //     })()
          // )
        }

      </ul>
    </div>
    </>
  );
}
)

