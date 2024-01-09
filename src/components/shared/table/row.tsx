import { ReactNode } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'

interface RowProps {
  children: ReactNode
  onPress?: () => void
}

const Row = ({ children, onPress }: RowProps) => {
  if (onPress) {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.row}>{children}</View>
      </TouchableWithoutFeedback>
    )
  }
  return <View style={styles.row}>{children}</View>
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default Row
