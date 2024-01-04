import { ActivityIndicator, Platform, StyleSheet, Text, View } from 'react-native'
import useGetKids from 'src/utils/hooks/getKids'
import { Table, Cell, Row } from '../shared/table'
import { COLOR_CONSTANTS } from 'src/utils/constants'
import Toast from 'react-native-toast-message'
import Button from '../shared/button'
import { StackScreenProps } from '@react-navigation/stack'
import { AttendanceStackParamList } from 'src/utils/types'
import { ATTENDANCE_STACK_KEYS } from 'src/utils/enums'

type Props = StackScreenProps<AttendanceStackParamList, ATTENDANCE_STACK_KEYS.Kids, 'AttendanceStack'>

const KidsScreen = ({ navigation }: Props) => {
  const { kids, isLoading, error } = useGetKids()

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
      {Platform.OS === 'android' ? <Text style={styles.heading}>Kids Screen</Text> : null}
      <Text style={styles.disclaimer}>
        You'll find a list of all of our kids here, please use this page to only verify details of the students and mark
        your attendance
      </Text>

      <View style={styles.buttonWrapper}>
        <Button
          label="Fill today's attendance"
          onClick={() => {
            navigation.navigate({
              key: ATTENDANCE_STACK_KEYS.StackName,
              name: ATTENDANCE_STACK_KEYS.Attendance,
            })
          }}
        />
      </View>

      <Table>
        <Row>
          <Cell isHeader>Name</Cell>
          <Cell isHeader>Class</Cell>
          <Cell isHeader>Age</Cell>
        </Row>
        {isLoading ? (
          <ActivityIndicator style={styles.activity} />
        ) : (
          <>
            {kids &&
              kids.map((kid) => {
                const { class: kidsClass, id, date_of_birth, name } = kid
                const age = new Date().getFullYear() - new Date(date_of_birth).getFullYear()
                return (
                  <Row key={id}>
                    <Cell>{name}</Cell>
                    <Cell>{kidsClass}</Cell>
                    <Cell>{age}</Cell>
                  </Row>
                )
              })}
          </>
        )}
      </Table>
    </View>
  )
}

export default KidsScreen

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
