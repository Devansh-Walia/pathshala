import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { KidsScreen, TeachersScreen } from 'src/components/dashboard'
import SplashScreen from 'src/components/spalshScreen'
import { USER_ROLES } from 'src/utils/constants'
import useMeQuery from 'src/utils/hooks/me'
import Account from '../components/account'

type Props = {}

const Tab = createBottomTabNavigator()

const AppStack = (props: Props) => {
  const { me, isLoading } = useMeQuery()
  const isAdmin = me?.user_role === USER_ROLES.ADMIN

  return isLoading ? (
    <SplashScreen />
  ) : (
    <Tab.Navigator>
      <Tab.Screen name="Kids List" component={KidsScreen} />
      {isAdmin ? <Tab.Screen name="Teachers List" component={TeachersScreen} /> : null}
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  )
}

export default AppStack
