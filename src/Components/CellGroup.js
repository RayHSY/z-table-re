import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

export default function CellGroup ({
  children,
  prefixCls,
  column,
  isHeaderCell,
  cellIndent
}) {

  console.log(column)

  const styles = {
    textAlign: column.align
  }

  return (
    <div className={`${prefixCls}-cell-group`} style={styles}>
      {isHeaderCell ? <div className="cell-group-header">{column.title}</div> : null}
      <div className="cell-group-container">
        {children}
      </div>
    </div>
  )
}