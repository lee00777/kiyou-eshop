import { useQuery } from '@tanstack/react-query';
import { getFilters } from '../api/firebase';


export default function useFilters(filter){
  const filterQuery = useQuery({
    queryKey: ['filters', filter],
    queryFn: () => {
      return getFilters(filter)
    },
  })

  return { filterQuery };
}