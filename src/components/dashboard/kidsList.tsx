import { ActivityIndicator, Button, Platform, StyleSheet, Text, View } from 'react-native'
import useGetKids from 'src/utils/hooks/getKids'
import { Table, Cell, Row } from '../shared/table'
import { COLOR_CONSTANTS } from 'src/utils/constants'

type Props = {}

const KidsScreen = (props: Props) => {
  const { kids, isLoading, error } = useGetKids()

  return (
    <View style={styles.container}>
      {Platform.OS === 'android' ? <Text style={styles.heading}>Kids Screen</Text> : null}
      <Text style={styles.disclaimer}>
        You'll find a list of all of our kids here, please use this page to only verify details of the students and mark
        your attendance
      </Text>

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
})
