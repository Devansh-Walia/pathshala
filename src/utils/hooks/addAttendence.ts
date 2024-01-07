import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import { supabase } from '../supabase'
import { AttendanceFormValues } from '../schema/attendaceForm'

const useAddAttendance = (options?: UseMutationOptions<string | undefined, Error, AttendanceFormValues, unknown>) => {
  return useMutation({
    mutationFn: async (values: AttendanceFormValues) => {
      const { data, error } = await supabase.from('attendance').insert([values]).select()

      if (error) {
        throw error
      }

      return 'Data updated successfully'
    },
    ...options,
  })
}

export default useAddAttendance
