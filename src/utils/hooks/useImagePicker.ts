import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query'
import { Alert } from 'react-native'
import DocumentPicker, { DocumentPickerResponse, isCancel, isInProgress, types } from 'react-native-document-picker'

const useImagePicker = (
  options?: UseMutationOptions<DocumentPickerResponse | undefined, Error, void, unknown>,
): UseMutationResult<DocumentPickerResponse | undefined, Error, void, unknown> => {
  return useMutation({
    mutationFn: async () => {
      try {
        const file = await DocumentPicker.pickSingle({
          presentationStyle: 'fullScreen',
          copyTo: 'cachesDirectory',
          type: types.images,
          mode: 'open',
        })

        return file
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
}

export default useImagePicker
