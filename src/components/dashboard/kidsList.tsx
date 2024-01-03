import { ActivityIndicator, Text, View } from 'react-native'
import useGetKids from 'src/utils/hooks/getKids'
import Table from '../shared/table'

type Props = {}

const KidsScreen = (props: Props) => {
  const { kids, isLoading, error } = useGetKids()
  console.log(kids)

  return <View>{isLoading ? <ActivityIndicator /> : <Table />}</View>
}

export default KidsScreen
