import { createStackNavigator } from '@react-navigation/stack'
import { KidsScreen } from 'src/components/dashboard'
import AttendanceForm from 'src/components/dashboard/attendanceForm'
import { AttendanceStackParamList } from 'src/utils/types'

const Stack = createStackNavigator<AttendanceStackParamList>()

const AttendanceStack = () => {
  return (
    <Stack.Navigator initialRouteName="Kids">
      <Stack.Screen name="Kids" component={KidsScreen} />
      <Stack.Screen name="Attendance" component={AttendanceForm} />
    </Stack.Navigator>
  )
}

export default AttendanceStack
