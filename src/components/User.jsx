import React from 'react';

export default function User({ user: { photoURL, displayName } }) {
  return (
    // shrink-0는 이미지들이 뭉게지지 않도록 만들어주는 역할
    <div className='flex items-center shrink-0'>
      <img
        className='w-10 h-10 rounded-full mr-2'
        src={photoURL}
        alt={displayName}
      />
      <span className='hidden md:block'>{displayName}</span>
    </div>
  );
}
