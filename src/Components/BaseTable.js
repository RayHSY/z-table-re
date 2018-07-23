import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ColGroup from './ColGroup'
import Header from './Header'
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
    table: PropTypes.object
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
          components={this.context.table.tbody}
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
    const {wrapper: TableWrapper, thead, tbody} = this.context.table

    const columns = this.getColumns()

    let body;
    if (hasBody) {
      const {wrapper: TbodyWrapper} = tbody
      body = <TbodyWrapper className={`${prefixCls}-tbody`}>{this.renderRows(data, 0)}</TbodyWrapper>
    }

    const classStr = classnames(`${prefixCls}-wrapper`, className)

    return (
      <TableWrapper ref={this.context.saveRef(this.props.nodeName)} className={classStr} style={styles} key="table">
        <ColGroup columns={columns} />
        {hasHeader && <Header components={thead} prefixCls={prefixCls} columns={columns} fixed={fixed}/>}
        {body}
      </TableWrapper>
    )

  }
}

export default BaseTable