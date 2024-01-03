import React, { ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'

interface RowProps {
  children: ReactNode
}

const Row: React.FC<RowProps> = ({ children }) => {
  return <View style={styles.row}>{children}</View>
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
})

export default Row
