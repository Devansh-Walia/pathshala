import React, { ReactNode } from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'

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
    borderColor: '#ddd',
    position: 'relative',
    textAlign: 'center',
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerContainer: {
    backgroundColor: '#79979980',
    borderColor: '#79979980',
  },
  text: {
    textAlign: 'center',
  },
})

export default Cell
