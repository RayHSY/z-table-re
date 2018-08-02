import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import CellGroup from './CellGroup'

export default class Cell extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    index: PropTypes.number,
    indent: PropTypes.number,
    indentSize: PropTypes.number,
    column: PropTypes.object,
    isHeaderCell: PropTypes.bool,
    cellIntent: PropTypes.number,
    height: PropTypes.number,
    type: PropTypes.string,
    width: PropTypes.number,
    rows: PropTypes.array
  }

  static defaultProps = {
    isHeaderCell: false,
    cellIndent: 1,
    height: 50,
    width: 100
  }

  constructor (props) {
    super(props)
  }

  render () {
    const {
      index,
      column,
      rows,
      rowData,
      isHeaderCell,
      prefixCls,
      cellIndent,
      height,
      type,
      width,
      ...others
    } = this.props

    let styles = {
      width: type === 'vertical' && isHeaderCell ? cellIndent * width : column.width || 100,
      textAlign: column.align || 'inherit',
      height: type === 'horizontal' && isHeaderCell ? cellIndent * height : height,
    }

    const { dataIndex, render, className = '' } = column

    let text

    if (isHeaderCell) {
      text = column.title
    } else if (typeof dataIndex === 'number') {
      text = _.get(rowData, dataIndex)
    } else if (!dataIndex || dataIndex.length === 0) {
      text = rowData
    } else {
      text = _.get(rowData, dataIndex)
    }

    if (render && !isHeaderCell) {
      text = render(text, rowData, index)
    }

    return (
      <div style={styles} className={`${prefixCls}-cell`} {...others}>
        <div style={styles} className={`${prefixCls}-cell-inner`}>
          {text}
        </div>
      </div>
    )
  }
}