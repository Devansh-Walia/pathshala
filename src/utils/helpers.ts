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
