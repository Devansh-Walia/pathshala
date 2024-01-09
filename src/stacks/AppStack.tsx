import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SplashScreen from 'src/components/shared/splashScreen'
import { USER_ROLES } from 'src/utils/constants'
import useMeQuery from 'src/utils/hooks/me'
import Account from '../components/account'
import AttendanceStack from './AttendanceStack'
import { ATTENDANCE_STACK_KEYS } from 'src/utils/enums'
import TeacherStack from './TeacherStack'

type Props = {}

const Tab = createBottomTabNavigator()

const AppStack = (props: Props) => {
  const { me, isLoading } = useMeQuery()
  const isAdmin = me?.user_role === USER_ROLES.ADMIN

  return isLoading ? (
    <SplashScreen />
  ) : (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name={ATTENDANCE_STACK_KEYS.StackName}
        component={AttendanceStack}
      />
      {isAdmin ? (
        <Tab.Screen
          options={{
            headerShown: false,
          }}
          name="Teachers List"
          component={TeacherStack}
        />
      ) : null}
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  )
}

export default AppStack
