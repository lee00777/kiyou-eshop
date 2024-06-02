import { React, memo } from 'react';
import Products from '../components/Products';

export default memo(function AllProducts({category}) {
  return (
      <Products category={category}/>
    );
  }
)

