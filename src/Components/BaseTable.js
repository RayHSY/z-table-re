import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Row from './Row'
import RowGroup from './RowGroup'

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

  renderRows = (rowArr, renderData) => {
    const { 
      // getRowKey, 
      fixed, 
      isAnyColumnsFixed, 
      columns,
      prefixCls,
    } = this.props

    return rowArr.map((rowItem, index) => {
      let filterData = renderData.filter(data => {
        return data[rowItem.dataKey] === rowItem.dataIndex
      })

      if (rowItem.children) {
        return (
          <RowGroup prefixCls={prefixCls}>
            {this.renderRows(rowItem.children, filterData)}
          </RowGroup>
        )
      } else if (filterData.length === 0) {
        return (
          <Row
            // className={className}
            fixed={fixed}
            // indent={indent}
            rowData={{}}
            index={index}
            prefixCls={prefixCls}
            columns={columns}
            rowKey={index}
            isAnyColumnsFixed={isAnyColumnsFixed}
            rows={rowArr}
            key={index}
          />
        )
      } else {
        return (
          <Row
            // className={className}
            fixed={fixed}
            // indent={indent}
            rowData={filterData}
            index={index}
            prefixCls={prefixCls}
            columns={columns}
            rowKey={index}
            isAnyColumnsFixed={isAnyColumnsFixed}
            rows={rowArr}
            key={index}
          />
      )
        // return filterData.map((rowData, index) => {
        //   return (
        //     <Row
        //       // className={className}
        //       fixed={fixed}
        //       // indent={indent}
        //       rowData={rowData}
        //       index={index}
        //       prefixCls={prefixCls}
        //       columns={columns}
        //       rowKey={index}
        //       isAnyColumnsFixed={isAnyColumnsFixed}
        //       rows={rowArr}
        //       key={index}
        //     />
        //   )
        // })
      }
    })
  }

  render () {
    const { 
      className, 
      hasHeader, 
      hasBody, 
      fixed, 
      style, 
      data,
      rows,
      prefixCls
    } = this.props
    const styles = {...style}

    // console.log(this.renderRows(rows))

    let body;
    if (hasBody) {
      body = <div className={`${prefixCls}-tbody`}>{this.renderRows(rows, data)}</div>
    }

    const classStr = classnames(`${prefixCls}-wrapper`, className)

    return (
      <div ref={this.context.saveRef(this.props.nodeName)} className={classStr} style={styles} key="table">
        {body}
      </div>
    )

  }
}

export default BaseTable