import React from 'react';

export default function Popup({child}) {
  console.log('불렸어요', child)
  return (
    <div className='w-screen h-screen fixed top-0 left-0 popup'>
      <div className='inset-0 w-full h-full bg-black opacity-90'></div>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white min-w-2/5 w-2/5 h-2/5 min-h-2/5 rounded-lg'>
        {/* <p className='w-full  h-full flex justify-center items-center'> */}
          {child}
        {/* </p> */}
      </div>
    </div>
  );
}

