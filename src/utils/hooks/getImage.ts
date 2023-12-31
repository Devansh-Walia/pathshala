import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import { supabase } from '../supabase'
import { BUCKET_PATH } from '../types'

const useGetImageBlob = (
  options?: UseMutationOptions<string | ArrayBuffer | undefined, Error, { path: string; from?: BUCKET_PATH }, unknown>,
) => {
  return useMutation({
    mutationFn: async ({ path, from = BUCKET_PATH.HIGHLIGHTS }: { path: string; from?: BUCKET_PATH }) => {
      if (path) {
        const { data, error } = await supabase.storage.from(from).download(path)

        if (error) {
          throw error
        }

        return new Promise<string | ArrayBuffer>((resolve, reject) => {
          const fr = new FileReader()
          fr.onload = () => resolve(fr.result)
          fr.onerror = () => reject(fr.error)
          fr.readAsDataURL(data)
        })
      }
    },
    ...options,
  })
}

export default useGetImageBlob
