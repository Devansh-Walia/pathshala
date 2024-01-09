import { ReactNode } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

interface RowProps {
  children: ReactNode
  onPress?: () => void
}

const Row = ({ children, onPress }: RowProps) => {
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.row}>{children}</View>
      </TouchableOpacity>
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
