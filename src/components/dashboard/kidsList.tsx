import { ActivityIndicator, Platform, StyleSheet, Text, View } from 'react-native'
import useGetKids from 'src/utils/hooks/getKids'
import { Table, Cell, Row } from '../shared/table'

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
          <Cell isHeader>Header 1</Cell>
          <Cell isHeader>Header 2</Cell>
          <Cell isHeader>Header 3</Cell>
          <Cell isHeader>Header 4</Cell>
        </Row>
        {isLoading ? (
          <ActivityIndicator style={styles.activity} />
        ) : (
          <>
            <Row>
              <Cell>Row 1 Col 1</Cell>
              <Cell>Row 1 Col 2</Cell>
              <Cell>Row 1 Col 3</Cell>
              <Cell>Row 1 Col 4</Cell>
            </Row>
            <Row>
              <Cell>Row 2 Col 1</Cell>
              <Cell>Row 2 Col 2Long Content</Cell>
              <Cell>Row 2 Col 3</Cell>
              <Cell>Row 2 Col 4</Cell>
            </Row>
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
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  disclaimer: {
    textAlign: 'center',
    color: '#666',
  },
  activity: {
    marginTop: 10,
  },
})
