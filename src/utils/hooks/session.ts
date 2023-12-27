import { useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../supabase'
import { useEffect } from 'react'

export const useSession = () => {
  const queryClient = useQueryClient()

  // Set up the query to fetch the session
  const { data: session, isLoading } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession()
      return data.session
    },
  })

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      // Update the session in the query cache when the auth state changes
      queryClient.setQueryData(['session'], session)
    })

    return () => {
      // Cleanup the listener when the component unmounts
      listener.subscription?.unsubscribe()
    }
  }, [queryClient])

  return { data: session, isLoading }
}