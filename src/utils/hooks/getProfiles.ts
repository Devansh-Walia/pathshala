import { useQuery } from '@tanstack/react-query'
import { supabase } from '../supabase'
import { Teachers } from '../types'

export const getTeachersQK = 'GetTeachers'

const useGetTeachers = () => {
  const { data, ...rest } = useQuery<Teachers, Error>({
    queryKey: [getTeachersQK],
    queryFn: async () => {
      const response = await supabase.from('profiles').select('*').order('full_name')

      if (!response.data) {
        throw new Error('no teachers at the moment, Add one now!')
      }

      return response.data as Teachers
    },
  })

  return {
    teachers: data,
    ...rest,
  }
}

export default useGetTeachers
