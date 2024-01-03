import React, { ReactNode } from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { COLOR_CONSTANTS } from 'src/utils/constants'

interface CellProps {
  children: ReactNode
  isHeader?: boolean
}

const Cell = ({ children, isHeader = false }: CellProps) => {
  const scrollable = typeof children === 'string' && children.length > 20

  return (
    <View style={[styles.cell, isHeader ? styles.headerContainer : null]}>
      {scrollable ? (
        <ScrollView horizontal>
          <Text style={[styles.text, isHeader ? styles.header : null]}>{children}</Text>
        </ScrollView>
      ) : (
        <Text style={[styles.text, isHeader ? styles.header : null]}>{children}</Text>
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
    borderWidth: 0.5,
    borderColor: COLOR_CONSTANTS.gray.light,
    position: 'relative',
    textAlign: 'center',
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerContainer: {
    backgroundColor: COLOR_CONSTANTS.beach.default,
    borderColor: COLOR_CONSTANTS.beach.default,
  },
  text: {
    textAlign: 'center',
  },
})

export default Cell
