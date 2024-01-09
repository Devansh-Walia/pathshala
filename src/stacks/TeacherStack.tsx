import { createStackNavigator } from '@react-navigation/stack'
import TeacherScreen from 'src/components/dashboard/teacherStack/teacher'
import TeachersScreen from 'src/components/dashboard/teacherStack/teachersList'
import { TEACHER_STACK_KEYS } from 'src/utils/enums'
import { TeacherStackParamList } from 'src/utils/types'

const Stack = createStackNavigator<TeacherStackParamList>()

const TeacherStack = () => {
  return (
    <Stack.Navigator initialRouteName={TEACHER_STACK_KEYS.Teachers}>
      <Stack.Screen name={TEACHER_STACK_KEYS.Teachers} component={TeachersScreen} />
      <Stack.Screen name={TEACHER_STACK_KEYS.Teacher} component={TeacherScreen} />
    </Stack.Navigator>
  )
}

export default TeacherStack
