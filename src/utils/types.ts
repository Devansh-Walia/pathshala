import { USER_ROLES } from './constants'
import { ATTENDANCE_STACK_KEYS } from './enums'

export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date'

export type TextContentType =
  | 'none'
  | 'URL'
  | 'addressCity'
  | 'addressCityAndState'
  | 'addressState'
  | 'countryName'
  | 'creditCardNumber'
  | 'emailAddress'
  | 'familyName'
  | 'fullStreetAddress'
  | 'givenName'
  | 'jobTitle'
  | 'location'
  | 'middleName'
  | 'name'
  | 'namePrefix'
  | 'nameSuffix'
  | 'nickname'
  | 'organizationName'
  | 'postalCode'
  | 'streetAddressLine1'
  | 'streetAddressLine2'
  | 'sublocality'
  | 'telephoneNumber'
  | 'username'
  | 'password'
  | 'newPassword'
  | 'oneTimeCode'

export type ME = {
  avatar_url: string
  full_name: string
  id: string
  updated_at: string
  user_role: USER_ROLES
}

export type Kid = {
  class: string
  created_at: Date
  date_of_birth: Date
  id: string
  name: String
  updated_at: Date
}

export type kidsList = Kid[]

export type AttendanceStackParamList = {
  [ATTENDANCE_STACK_KEYS.Kids]: {}
  [ATTENDANCE_STACK_KEYS.Attendance]: {}
}

export enum BUCKET_PATH {
  HIGHLIGHTS = 'highlights',
  AVATARS = 'avatars',
}
