import { StackScreenProps } from '@react-navigation/stack'
import { Text, View } from 'react-native'
import { TEACHER_STACK_KEYS } from 'src/utils/enums'
import { TeacherStackParamList } from 'src/utils/types'

type Props = StackScreenProps<TeacherStackParamList, TEACHER_STACK_KEYS.Teacher, TEACHER_STACK_KEYS.StackName>

const TeacherScreen = ({ route }: Props) => {
  const { id } = route.params
  return (
    <View>
      <Text>TeacherScreen - {id}</Text>
    </View>
  )
}

export default TeacherScreen
