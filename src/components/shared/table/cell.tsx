import { ReactNode } from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'

interface CellProps {
  children: ReactNode
  scrollable?: boolean
}

const Cell = ({ children, scrollable }: CellProps) => {
  return (
    <View style={styles.cell}>
      {scrollable ? (
        <ScrollView horizontal>
          <Text>{children}</Text>
        </ScrollView>
      ) : (
        <Text>{children}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    minWidth: 100,
    maxWidth: 100,
    padding: 10,
    borderWidth: 1,
    textAlign: 'center',
  },
})

export default Cell
