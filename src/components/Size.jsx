import { React, memo } from 'react';

export default memo(function Size({size, handleClick, selectedSize, handleSizeSelect}) {
  return (
      <>
        <div className='flex items-center mt-5'>
          <label className="text-brand font-bold" htmlFor='select'>Size:</label>
          <select className='p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none' id="select" onChange={handleSizeSelect} value={selectedSize}>
            { size && size.map((option, index)=> <option key={index}>{option}</option>)}
          </select>
        </div>
        <div className="text-center h-8 flex items-center justify-center mt-5 bg-button y-2 px-4 text-white rounded-sm hover:brightness-110" onClick={handleClick}>
          <button className="cursor-pointer">ADD TO CART</button>
        </div>
      </>
    );
  }
)

