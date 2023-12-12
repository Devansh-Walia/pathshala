import AsyncStorage from '@react-native-async-storage/async-storage'
import { InputType, TextContentType } from './types'

export const getContentType = (type: InputType | undefined): TextContentType => {
  switch (type) {
    case 'text':
      return 'none'
    case 'password':
      return 'password'
    case 'email':
      return 'emailAddress'
    case 'number':
      return 'none'
    case 'tel':
      return 'telephoneNumber'
    case 'url':
      return 'URL'
    case 'search':
      return 'none'
    case 'date':
      return 'none'
    default:
      return 'none'
  }
}

export const getFromAsyncStorage = async (key: string) => {
  const value = await AsyncStorage.getItem(key)
  if (value !== null) {
    return value
  }
}

export const setToAsyncStorage = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value)
}
