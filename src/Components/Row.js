import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames'

import Cell from './Cell'
import CellGroup from './CellGroup'
// import RenderCell from './RenderCell'

export default class Row extends Component {
  static propTypes = {
    rowData: PropTypes.object,
    prefixCls: PropTypes.string,
    columns: PropTypes.array,
    rows: PropTypes.array,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    index: PropTypes.number,
    rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    className: PropTypes.string,
    indent: PropTypes.number,
    indentSize: PropTypes.number,
    fixed: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    isAnyColumnsFixed: PropTypes.bool,
    visible: PropTypes.bool,
    isHeaderRow: PropTypes.bool,
    type: PropTypes.oneOf(['vertical', 'horizontal'])
  }

  static defaultProps = {
    visible: true,
    isHeaderRow: false,
    type: 'horizontal'
  }

  static contextTypes = {
    rowHeight: PropTypes.number
  }

  constructor (props) {
    super(props)
    this.shouldRender = this.props.visible
  }

  componentDidMount () {
    this._cellIndentSize = this.props.type === 'horizontal' 
      ? Math.ceil(this.row.clientHeight / this.context.rowHeight )
      : Math.ceil(this.row.clientWidth / 100 )
  }

  getCells (dataArr, cellIndentSize = this._cellIndentSize) {
    const {
      prefixCls,
      rowData,
      indent,
      indentSize,
      isHeaderRow,
      index: indexProps,
      rows,
      type
    } = this.props
    const cells = dataArr.map((column, index) => {
      if (column.children) {
        return (
          <CellGroup 
            type={type} 
            cellIndent={cellIndentSize} 
            isHeaderCell={isHeaderRow} 
            column={column}
            prefixCls={prefixCls}
            rowHeight={this.context.rowHeight}
          >
            {this.getCells(column.children, cellIndentSize - 1)}
          </CellGroup>
        )
      }
      return (
        <Cell
          prefixCls={prefixCls}
          rowData={rowData}
          indentSize={indentSize}
          indent={indent}
          index={indexProps}
          rows={rows}
          column={column}
          key={column.key || column.dataIndex}
          isHeaderCell={isHeaderRow}
          cellIndent={cellIndentSize}
          height={this.context.rowHeight}
          type={type}
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
      indent,
      indentSize,
      height,
      visible,
      className,
      style,
      isHeaderRow,
      type,
      rows,
      ...others
    } = this.props



    const cells = type === 'horizontal' ? this.getCells(columns) : this.getCells(rows)

    const rowClassName = classnames(className, [`${prefixCls}-row-level-${indent}`, `${prefixCls}-row`, `${prefixCls}-${type}-row`])
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