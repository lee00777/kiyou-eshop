import React from 'react';

export default function Filter({priceRangeSelected,handlePriceRangeFilter,clearPriceFilter }) {
  return (
    <div>
      <p className='text-sm font-bold py-5'>Price</p>
      <ul className='grid gap-3'>
        <li className='flex'>
          <input type="radio" className='mr-2' name="under25" value="0-25" checked={priceRangeSelected === 'under25'? true:false} onChange={handlePriceRangeFilter}/>  
          <label htmlFor="under25" className='text-sm'>Under $25</label>
        </li>
        <li className='flex'>
          <input type="radio" className='mr-2' name="25to50" value="25-50" checked={priceRangeSelected === '25to50'? true:false}  onChange={handlePriceRangeFilter}/>  
          <label htmlFor="25to50" className='text-sm'>$25 to $50</label>
        </li>
        <li className='flex'>
          <input type="radio" className='mr-2' name="50to100" value="50-100" checked={priceRangeSelected === '50to100'? true:false}  onChange={handlePriceRangeFilter}/>  
          <label htmlFor="50to100" className='text-sm'>$50 to $100</label>
        </li>
        <li className='flex'>
          <input type="radio" className='mr-2' name="100above" value="100-10000" checked={priceRangeSelected === '100above'? true:false}  onChange={handlePriceRangeFilter}/>  
          <label htmlFor="100above" className='text-sm'>$100 and above</label>
        </li>
      </ul>
      <button className='text-sm mt-3 text-clearBtn' onClick={clearPriceFilter}>Clear All</button>
    </div>
  );
}

