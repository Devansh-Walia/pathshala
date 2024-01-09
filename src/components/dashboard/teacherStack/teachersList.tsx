import { StackScreenProps } from '@react-navigation/stack'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { Cell, Row, Table } from 'src/components/shared/table'
import { COLOR_CONSTANTS } from 'src/utils/constants'
import { TEACHER_STACK_KEYS } from 'src/utils/enums'
import useGetTeachers from 'src/utils/hooks/getProfiles'
import { TeacherStackParamList } from 'src/utils/types'

type Props = StackScreenProps<TeacherStackParamList, TEACHER_STACK_KEYS.Teachers, TEACHER_STACK_KEYS.StackName>

const TeachersScreen = ({ navigation }: Props) => {
  const { teachers, isLoading, error } = useGetTeachers()

  if (error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error.message,
      position: 'bottom',
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.disclaimer}>
        You'll find a list of all of our teacher here, please use this page to only verify details of the Teachers and
        to move to their respective pages
      </Text>

      <Table>
        <Row>
          <Cell isHeader>Name</Cell>
          <Cell isHeader>Role</Cell>
        </Row>
        {isLoading ? (
          <ActivityIndicator style={styles.activity} />
        ) : (
          <>
            {teachers &&
              teachers.map((teacher) => {
                const { full_name, user_role, id } = teacher
                return (
                  <Row
                    key={id}
                    onPress={() => {
                      navigation.navigate(TEACHER_STACK_KEYS.Teacher, {
                        id,
                      })
                    }}
                  >
                    <Cell>{full_name}</Cell>
                    <Cell>{user_role}</Cell>
                  </Row>
                )
              })}
          </>
        )}
      </Table>
    </View>
  )
}

export default TeachersScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  disclaimer: {
    textAlign: 'center',
    color: COLOR_CONSTANTS.gray.medium,
    marginBottom: 20,
  },
  activity: {
    marginTop: 10,
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
})
