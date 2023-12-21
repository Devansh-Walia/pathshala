import { supabase } from 'src/utils/supabase'

export const login = async ({ email, password }: { email: string; password: string }) => {
  return supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })
}

export const signup = ({ email, name, password }: { email: string; name: string; password: string }) => {
  return supabase.auth.signUp({
    options: {
      data: {
        name: name,
      },
    },
    email: email,
    password: password,
  })
}
