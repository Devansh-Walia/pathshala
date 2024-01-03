import { ReactNode } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'

interface TableProps {
  children: ReactNode
}

const TableRoot = ({ children }: TableProps) => {
  return (
    <ScrollView horizontal>
      <View style={styles.container}>{children}</View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
})

export default TableRoot
