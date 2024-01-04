import { createStackNavigator } from '@react-navigation/stack'
import { KidsScreen } from 'src/components/dashboard'
import AttendanceForm from 'src/components/dashboard/attendanceForm'
import { ATTENDANCE_STACK_KEYS } from 'src/utils/enums'
import { AttendanceStackParamList } from 'src/utils/types'

const Stack = createStackNavigator<AttendanceStackParamList>()

const AttendanceStack = () => {
  return (
    <Stack.Navigator initialRouteName={ATTENDANCE_STACK_KEYS.Kids}>
      <Stack.Screen name={ATTENDANCE_STACK_KEYS.Kids} component={KidsScreen} />
      <Stack.Screen name={ATTENDANCE_STACK_KEYS.Attendance} component={AttendanceForm} />
    </Stack.Navigator>
  )
}

export default AttendanceStack
