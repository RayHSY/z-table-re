import React, {Component} from 'react'
import PropTypes from 'prop-types'
import HeaderRow from './HeaderRow'
import Row from './Row'

import classnames from 'classnames'

class BaseTable extends Component {
  static propTypes = {
    fixed: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    columns: PropTypes.array.isRequired,
    tableClassName: PropTypes.string,
    hasHead: PropTypes.bool,
    hasBody: PropTypes.bool,
    getRowKey: PropTypes.func,
    isAnyColumnsFixed: PropTypes.bool,
    data: PropTypes.array,
    prefixCls: PropTypes.string
  }

  static defaultProps = {
    hasBody: true,
    hasHead: false
  }

  static contextTypes = {
    saveRef: PropTypes.func,
  }

  constructor (props) {
    super(props)
  }

  getColumns () {
    return this.props.columns
  }

  renderRows = (renderData, indent) => {
    const { 
      // getRowKey, 
      fixed, 
      isAnyColumnsFixed, 
      columns,
      prefixCls,
    } = this.props

    const rows = []

    renderData.map((rowData, index) => {
      // const key = getRowKey(rowData, index)

      const row = (
        <Row
          // className={className}
          fixed={fixed}
          indent={indent}
          rowData={rowData}
          index={index}
          prefixCls={prefixCls}
          columns={columns}
          rowKey={index}
          isAnyColumnsFixed={isAnyColumnsFixed}
        />
      )

      rows.push(row)
    })
    return rows
  }

  render () {
    const { 
      className, 
      hasHeader, 
      hasBody, 
      fixed, 
      style, 
      data,
      prefixCls
    } = this.props
    const styles = {...style}

    const columns = this.getColumns()

    let body;
    if (hasBody) {
      body = <div className={`${prefixCls}-tbody`}>{this.renderRows(data, 0)}</div>
    }

    const classStr = classnames(`${prefixCls}-wrapper`, className)

    return (
      <div ref={this.context.saveRef(this.props.nodeName)} className={classStr} style={styles} key="table">
        {hasHeader && <HeaderRow saveRef={this.context.saveRef} prefixCls={prefixCls} columns={columns} fixed={fixed}/>}
        {body}
      </div>
    )

  }
}

export default BaseTable