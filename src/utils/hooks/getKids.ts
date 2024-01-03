import { useQuery } from '@tanstack/react-query'
import { supabase } from '../supabase'

export const getKidsQK = 'GetKids'

const useGetKids = () => {
  const { data, ...rest } = useQuery({
    queryKey: [getKidsQK],
    queryFn: async () => {
      const response = await supabase.from('profiles').select('*').order('created_at')

      if (!response.data) {
        throw new Error('kids not found')
      }

      return response.data
    },
  })

  return {
    kids: data,
    ...rest,
  }
}

export default useGetKids
