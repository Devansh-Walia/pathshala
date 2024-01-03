import { useQuery } from '@tanstack/react-query'
import { supabase } from '../supabase'
import { kidsList } from '../types'

export const getKidsQK = 'GetKids'

const useGetKids = () => {
  const { data, ...rest } = useQuery<kidsList, Error>({
    queryKey: [getKidsQK],
    queryFn: async () => {
      const response = await supabase.from('kids').select('*').order('created_at')

      if (!response.data) {
        throw new Error('kids not found')
      }

      return response.data as kidsList
    },
  })

  return {
    kids: data,
    ...rest,
  }
}

export default useGetKids
