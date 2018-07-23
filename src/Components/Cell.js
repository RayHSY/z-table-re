import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

export default class Cell extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    index: PropTypes.number,
    indent: PropTypes.number,
    indentSize: PropTypes.number,
    column: PropTypes.object,
    isHeaderCell: PropTypes.bool,
    cellIntent: PropTypes.number,
    height: PropTypes.number
  }

  static defaultProps = {
    isHeaderCell: false,
    cellIntentSize: 1,
    height: 50
  }

  constructor (props) {
    super(props)
  }

  render () {
    const {
      index,
      column,
      rowData,
      isHeaderCell,
      prefixCls,
      cellIndent,
      height,
      ...others
    } = this.props

    let styles = {
      width: column.width || 100,
      textAlign: column.align || 'inherit',
      height: isHeaderCell ? cellIndent * height : height,
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