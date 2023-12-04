import { REACT_APP_SUPABASE_ANON_KEY, REACT_APP_SUPABASE_URL } from '@env'

export const appConfig = {
  supabase: {
    url: REACT_APP_SUPABASE_URL,
    anonKey: REACT_APP_SUPABASE_ANON_KEY,
  },
}
