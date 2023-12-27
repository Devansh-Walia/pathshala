import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Account from '../components/account'

type Props = {}

const Tab = createBottomTabNavigator()

const AppStack = (props: Props) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  )
}

export default AppStack
