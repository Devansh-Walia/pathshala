import Auth from 'src/components/auth'
import SplashScreen from 'src/components/spalshScreen'
import { useSession } from 'src/utils/hooks/session'
import AppStack from './AppStack'
import useMeQuery from 'src/utils/hooks/me'

const RootStack = () => {
  const { data: session, isLoading } = useSession()
  useMeQuery()

  return isLoading ? <SplashScreen /> : session && session.user ? <AppStack key={session.user.id} /> : <Auth />
}

export default RootStack
