import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query'
import { Alert } from 'react-native'
import { DocumentPickerResponse, isCancel, isInProgress } from 'react-native-document-picker'
import { supabase } from '../supabase'
import { BUCKET_PATH } from '../types'

interface props {
  to: BUCKET_PATH
}

const useUpload = (
  props?: props,
  options?: UseMutationOptions<string | undefined, Error, DocumentPickerResponse | undefined, unknown>,
): UseMutationResult<string | undefined, Error, DocumentPickerResponse | undefined, unknown> => {
  const fromDirectory = props?.to || BUCKET_PATH.HIGHLIGHTS
  const mutation = useMutation({
    mutationFn: async (file: DocumentPickerResponse | undefined) => {
      try {
        if (file) {
          const photo = {
            uri: file.fileCopyUri,
            type: file.type,
            name: file.name,
          }

          const formData = new FormData()
          formData.append('file', photo)

          const fileExt = file.name ? file.name.split('.').pop() : 'jpg'
          const filePath = `${Math.random()}.${fileExt}`
          const { data, error } = await supabase.storage.from(fromDirectory).upload(filePath, formData)

          if (error) {
            throw new Error(error.message)
          }

          return data?.path || ''
        }
      } catch (error) {
        if (isCancel(error)) {
          console.warn('cancelled')
          // User cancelled the picker, exit any dialogs or menus and move on
        } else if (isInProgress(error)) {
          console.warn('multiple pickers were opened, only the last will be considered')
        } else if (error instanceof Error) {
          Alert.alert(error.message)
        } else {
          throw error
        }
      }
    },
    ...options,
  })

  return mutation
}

export default useUpload
