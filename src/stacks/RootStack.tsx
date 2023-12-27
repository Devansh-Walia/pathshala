import Account from 'src/components/account'
import Auth from 'src/components/auth'
import { useSession } from 'src/utils/hooks/session'
import SplashScreen from 'src/components/spalshScreen'
import AppStack from './AppStack'

const RootStack = () => {
  const { data: session, isLoading } = useSession()

  return isLoading ? <SplashScreen /> : session && session.user ? <AppStack key={session.user.id} /> : <Auth />
}

export default RootStack
