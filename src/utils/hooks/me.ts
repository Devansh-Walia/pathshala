import { useEffect, useState } from 'react'
import { useSession } from './session'
import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { supabase } from '../supabase'
import { ME } from '../types'

const useMeQuery = (options?: UseQueryOptions) => {
  const [userId, setUserId] = useState<string | null>(null)
  const { data } = useSession()

  const { data: me, ...rest } = useQuery<ME, Error>({
    queryKey: ['me', userId],
    queryFn: async () => {
      if (userId) {
        const response = await supabase
          .from('profiles') // Ensuring the query returns data of type ME.
          .select('*')
          .eq('id', userId)
          .single()

        if (!response.data) {
          throw new Error('User not found')
        }

        return response.data as ME
      }
      throw new Error('User ID is not set')
    },
    enabled: userId !== '', // Changed to check for an empty string instead of null.
  })

  useEffect(() => {
    if (data) {
      setUserId(data.user.id)
    }
  }, [data])

  return { me, ...rest }
}

export default useMeQuery
