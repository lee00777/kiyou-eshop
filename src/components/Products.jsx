import React, { useEffect, useState, memo } from 'react';
import ProductCard from './ProductCard';
import useProducts from '../hooks/useProducts';
import useFilters from '../hooks/useFilters';
import { useCallback } from 'react';
import Filter from './Filter';

export default memo(function Products({category}) {
  const { productsQuery: { error, data:products}} = useProducts();
  const { filterQuery:{ isPending:filterIsPending, error:isFilterError, data : filters } } = useFilters(category); 
  const [ filteredProducts, setFilteredProducts ] = useState();
  const [ filteredItems, setFilteredItems ] = useState();
  const [ priceRangeSelected, setPriceRangeSelected ] = useState();
  const [ clickedFilter , setClickedFilter ] = useState('All');
  const [ priceFilter, setPriceFilter ] = useState({start:0, end:10000});

  // product -> 품목별 filteredProducts -> 필터링별 filteredItems 사용

  useEffect(()=>{
    if(products){
      if(category&&category.length >=1){
        // 품목별 (dress, skirt, pants...)
        setFilteredProducts(products.filter(item=>item.category.includes(category)))
      }
      else{
        // initial home page용
        setFilteredProducts(products.filter(item =>item.trend.includes('Best')).slice(0,8))
      }
    }
  },[products, category])

  useEffect(()=>{
    if(filteredProducts){
      setFilteredItems(filteredProducts)
    }
  },[filteredProducts])

  const handleFilterSelection = (selectedCategory)=>{
    setClickedFilter(selectedCategory);
  }

  useEffect(()=>{
    if(filteredItems){
      if(clickedFilter==='All'){
        setFilteredItems(filteredProducts.filter(item=>item.price>=priceFilter.start && item.price<=priceFilter.end))
      }
      else{
        setFilteredItems(filteredProducts.filter(item=>item.price>=priceFilter.start && item.price <=priceFilter.end).filter(item=>item.category.includes(clickedFilter)))
      }
    }
  },[priceFilter, clickedFilter])

  const handlePriceRangeFilter = useCallback((ev)=>{
    setPriceRangeSelected(ev.target.name)
    const [start, end] = ev.target.value.split('-');
    setPriceFilter({ start: parseInt(start), end: parseInt(end) });
  },[])

  const clearPriceFilter = useCallback(() =>{
    setPriceFilter({start:0, end:10000});
    setPriceRangeSelected(false);
  },[])

  useEffect(()=>{
    setClickedFilter('All');
    setPriceFilter({start:0, end:10000});
    setPriceRangeSelected(false);
    window.scrollTo({top:0 });
  },[category])

  return (
    <>
      { !filterIsPending && <h3 className='text-2xl mt-40 text-center'>{category}</h3>}
      <div id="sentinel"  className='body-wrapper mx-auto flex flex-row justify-evenly px-4'>
        {category && category.length >=1 && 
          <div className='mt-4 text-left pl-8 md:pl-4'>
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
            <Filter priceRangeSelected={priceRangeSelected} handlePriceRangeFilter={handlePriceRangeFilter} clearPriceFilter={clearPriceFilter}/>
          </div>
        }   
        { error && <p>{error}</p>}
        <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 p-16 h-auto w-4/5 '>
          { filteredItems && filteredItems.map(product => <ProductCard key={product.id} product={product}/>) }
          { filteredItems && filteredItems.length === 0 && <p className='text-sm max-w-full col-start-1 col-span-3 md:col-start-1 md:col-span-4 mt-20 md:-ml-10 text-center w-100 md:text-lg text-description'> <span className="mr-2">🚫</span> No items match the selected filter </p> }
        </ul>
      </div>
    </>
  );
}
)

