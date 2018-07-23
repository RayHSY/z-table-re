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
    component: PropTypes.any,
    isHeaderCell: PropTypes.bool
  }

  static defaultProps = {
    isHeaderCell: false,
    component: 'td',
  }

  constructor (props) {
    super(props)
  }

  render () {
    const {
      index,
      column,
      component: BodyCell,
      rowData,
      isHeaderCell,
      prefixCls,
      ...others
    } = this.props

    let styles = {}

    const { dataIndex, render, className = '' } = column

    if (column.align) {
      styles.textAlign = column.align
    }

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
      <BodyCell style={styles} className={`${prefixCls}-cell`} {...others}>
        {text}
      </BodyCell>
    )
  }
}