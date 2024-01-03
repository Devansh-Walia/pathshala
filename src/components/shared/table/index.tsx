import React from 'react'
import TableRoot from './table'
import Row from './Row'
import Cell from './Cell'

const Table = () => {
  return (
    <TableRoot>
      <Row>
        <Cell>Header 1</Cell>
        <Cell>Header 2</Cell>
        <Cell>Header 3</Cell>
        <Cell>Header 4</Cell>
      </Row>
      <Row>
        <Cell>Row 1 Col 1</Cell>
        <Cell>Row 1 Col 2</Cell>
        <Cell>Row 1 Col 3</Cell>
        <Cell>Row 1 Col 4</Cell>
      </Row>
      <Row>
        <Cell>Row 2 Col 1</Cell>
        <Cell scrollable>Row 2 Col 2 Long Content</Cell>
        <Cell>Row 2 Col 3</Cell>
        <Cell>Row 2 Col 4</Cell>
      </Row>
    </TableRoot>
  )
}

export default Table
