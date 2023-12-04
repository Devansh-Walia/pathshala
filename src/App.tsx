import { Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import 'react-native-url-polyfill/auto'
import { supabase } from './lib/supabase'
import Account from './components/account'
import Auth from './components/auth'
import SplashScreen from './components/spalshScreen'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })

    return () => {
      setLoading(false)
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <SplashScreen />
      ) : session && session.user ? (
        <Account key={session.user.id} session={session} />
      ) : (
        <Auth />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
})
