import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames'

import Cell from './Cell'
import CellGroup from './CellGroup'

export default class Row extends Component {
  static propTypes = {
    rowData: PropTypes.object,
    prefixCls: PropTypes.string,
    columns: PropTypes.array,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    index: PropTypes.number,
    rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    className: PropTypes.string,
    indent: PropTypes.number,
    indentSize: PropTypes.number,
    // store: PropTypes.object.isRequired,
    fixed: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    isAnyColumnsFixed: PropTypes.bool,
    visible: PropTypes.bool,
    isHeaderRow: PropTypes.bool,
  }

  static defaultProps = {
    visible: true,
    isHeaderRow: false
  }

  static contextTypes = {
    rowHeight: PropTypes.number
  }

  constructor (props) {
    super(props)
    this.shouldRender = this.props.visible
  }

  componentDidMount () {
    this._cellIndentSize = Math.floor(this.row.clientHeight / this.context.rowHeight )
    console.log(this._cellIndentSize)
  }

  getCells (columns, cellIndentSize = this._cellIndentSize) {
    const {
      prefixCls,
      rowData,
      indent,
      indentSize,
      isHeaderRow,
    } = this.props

    console.log('indentSize: ' + cellIndentSize)

    const cells = columns.map((column, index) => {
      if (column.children) {
        return <CellGroup cellIndent={1} isHeaderCell={isHeaderRow} column={column} prefixCls={prefixCls}>{this.getCells(column.children, cellIndentSize - 1)}</CellGroup>
      }
      return (
        <Cell
          prefixCls={prefixCls}
          rowData={rowData}
          indentSize={indentSize}
          indent={indent}
          index={index}
          column={column}
          key={column.key || column.dataIndex}
          isHeaderCell={isHeaderRow}
          cellIndent={cellIndentSize}
          height={this.context.rowHeight}
        />
      )
    })

    return cells
  }

  rowRef = (ref) => {
    this.row = ref
  }

  render () {
    if (!this.shouldRender) {
      return null
    }

    const {
      prefixCls,
      columns,
      rowData,
      // index,
      indent,
      indentSize,
      height,
      visible,
      className,
      style,
      isHeaderRow,
      ...others
    } = this.props

    const cells = this.getCells(columns)

    const rowClassName = classnames(className, [`${prefixCls}-row-level-${indent}`, `${prefixCls}-row`])
    const styles = {
      ...style
    }

    styles.height = height
    if (!visible) {
      styles.display = 'none'
    }

    return (
      <div
        className={rowClassName}
        {...others}
        style={styles}
        ref={this.rowRef}
      >
        {cells}
      </div>
    )
  }
}