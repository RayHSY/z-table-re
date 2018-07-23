import React from 'react'
import PropTypes from 'prop-types'

export default function ColGroup (props) {
  const {columns} = props
  return (
    <colgroup>
      {
        columns.map(column => {
          const styles = {
            minWidth: column.width 
          }
          return <col className="z-table-col" style={styles} width={column.width || 200} />
        })
      }
    </colgroup>
  )
}