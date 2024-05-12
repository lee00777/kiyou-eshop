import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts as fetchProducts, addNewProduct } from '../api/firebase';

export default function useProducts(){
  const queryClient = useQueryClient();

  const productsQuery = useQuery({ // productsQuery
    queryKey: ['products'],
    queryFn: () => {
      return fetchProducts()
    },
    // staleTime: 1000 * 60
  })

  // const addProduct = useMutation((product,url)=>{addNewProduct(product,url)},{
  //   onSuccess: () => queryClient.invalidateQueries(['products'])
  // }) 

  // const addProduct = useMutation(
  //   ({ product, url }) => addNewProduct(product, url),
  //   {
  //     onSuccess: () => queryClient.invalidateQueries(['products']),
  //   }
  // );

  const addProduct = useMutation({
    mutationFn: ({product, urls}) => {
      addNewProduct(product,urls)
    },
    onSuccess: ()=> queryClient.invalidateQueries({queryKey:['products']})
    // onSuccess: ()=> queryClient.invalidateQueries({queryKey:'products'})
  }) 


  return {productsQuery , addProduct }
}