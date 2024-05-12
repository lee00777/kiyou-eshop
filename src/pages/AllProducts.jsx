import React from 'react';
import Products from '../components/Products';

export default function AllProducts({category}) {
  return (
    <Products category={category}/>
  );
}

