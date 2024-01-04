import Auth from 'src/components/auth'
import SplashScreen from 'src/components/shared/splashScreen'
import { useSession } from 'src/utils/hooks/session'
import AppStack from './AppStack'
import useMeQuery from 'src/utils/hooks/me'

const RootStack = () => {
  const { data: session, isLoading } = useSession()
  const { isLoading: isMeLoading } = useMeQuery()

  return isLoading || isMeLoading ? (
    <SplashScreen />
  ) : session && session.user ? (
    <AppStack key={session.user.id} />
  ) : (
    <Auth />
  )
}

export default RootStack
