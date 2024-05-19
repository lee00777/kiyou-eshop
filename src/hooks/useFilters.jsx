import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFilters } from '../api/firebase';


export default function useFilters(filter){
  const queryClient = useQueryClient();

  const filterQuery = useQuery({
    queryKey: ['filters', filter],
    queryFn: () => {
      return getFilters(filter)
    },
  })

  // const filterQuery = useMutation({
  //   mutationFn: (filter)=>{getFilters(filter)
  // },
  //   onSuccess: ()=> queryClient.invalidateQueries(['filters'])
  // });


  return { filterQuery };
}