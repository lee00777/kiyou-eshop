import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCart, addOrUpdateToCart, removeFromCart } from '../api/firebase';
import { useAuthContext } from '../contexts/AuthContext';

export default function useCart(){
  const {uid} = useAuthContext();
  const queryClient = useQueryClient();
  const cartQuery = useQuery({
    queryKey: ['carts', uid || ''],
    queryFn: () => {
      return getCart(uid)
    },
    // default로 캐슁은 5분이고, garbage collection time도 5분이고, staleTime은 즉시 이루어짐.
    // 즉, 5분내에 똑같은 key에서 요청이 들어오면 일단 돌려주고 background에서 refetch함
    // 로그인이 되어있어야만 useQuery실행해라
    enabled: !!uid
  })
  
  // 내가 지금 하는 행동(보통 get빼고, push, delete, post 등) 으로 인해 key가 바뀌여서 새롭게 fetch가 일어나야 할 경우, useMutation을 쓴다.
  const addOrUpdateItem = useMutation({
    mutationFn: (product)=>{addOrUpdateToCart(uid, product)
  },
    onSuccess: ()=> queryClient.invalidateQueries(['carts', uid])
  });

  const removeItem = useMutation({
    mutationFn: (id)=>{
      removeFromCart(uid,id)
    },
    onSuccess: () =>  queryClient.invalidateQueries(['carts', uid])
  });

  return { cartQuery, addOrUpdateItem, removeItem };
}