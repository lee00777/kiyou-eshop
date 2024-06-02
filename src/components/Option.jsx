import { React, memo } from 'react';

export default memo(function Option({selectedColor, image, selectedOptionIdx, handleOption}) {
  return (
    <div className='mt-10'>
      <p className="text-brand font-bold">Options:
        <span className='text-black ml-3 font-normal'>{selectedColor}</span>
      </p>
      <div className='w-full mt-5 flex ml-5 justify-start flex-wrap'>
        {image && image.options.map((option, idx)=> <img className={`w-20 mr-2 cursor-pointer ${selectedOptionIdx === idx? "border-4 border-brand" : ""}`} key={idx} src={option} alt="color option" onClick={(ev)=>{handleOption(idx,ev)}}/>)}
      </div>
    </div>
    );
  }
)

