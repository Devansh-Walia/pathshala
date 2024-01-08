import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import { supabase } from '../supabase'
import { ME } from '../types'
import { UserSchemaValues } from 'src/components/account'

interface UserUpdateValues extends UserSchemaValues {
  updated_at: Date
}

const useUpdateProfile = (options?: UseMutationOptions<ME, Error, { id: string; values: {} }>) => {
  return useMutation({
    mutationFn: async (props: { id: string; values: UserUpdateValues }) => {
      const { data, error } = await supabase
        .from('profiles')
        .update({ ...props.values })
        .eq('id', props.id)
        .select()
        .single()

      if (error) {
        throw new Error('Something went wrong while updating your profile.')
      }
      console.log(data, 'in success')

      return data as ME
    },
    ...options,
  })
}

export default useUpdateProfile
