import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames'

import Cell from './Cell'

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
    components: PropTypes.any,
    isAnyColumnsFixed: PropTypes.bool,
    visible: PropTypes.bool,
    isHeaderRow: PropTypes.bool,
  }

  static defaultProps = {
    visible: true,
    isHeaderRow: false
  }

  constructor (props) {
    super(props)
    this.shouldRender = this.props.visible
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
      components,
      className,
      style,
      isHeaderRow,
      ...others
    } = this.props

    const BodyRow = components.row
    const BodyCell = components.cell 

    const cells = columns.map((column, index) => {
      return (
        <Cell
          prefixCls={prefixCls}
          rowData={rowData}
          indentSize={indentSize}
          indent={indent}
          index={index}
          column={column}
          key={column.key || column.dataIndex}
          component={BodyCell}
          isHeaderCell={isHeaderRow}
        />
      )
    })

    const rowClassName = classnames(className, [`${prefixCls}-row-level-${indent}`, `${prefixCls}-row`])
    const styles = {
      ...style
    }

    styles.height = height
    if (!visible) {
      styles.display = 'none'
    }

    return (
      <BodyRow
        className={rowClassName}
        {...others}
        style={styles}
      >
        {cells}
      </BodyRow>
    )
  }
}