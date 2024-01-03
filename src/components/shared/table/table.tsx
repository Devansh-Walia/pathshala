import { ReactNode } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'

interface TableProps {
  children: ReactNode
}

const Table = ({ children }: TableProps) => {
  return (
    <ScrollView horizontal>
      <View style={styles.container}>{children}</View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
})

export default Table
