import React, {Component} from 'react'
import PropTypes from 'prop-types'

import BaseTable from './BaseTable'
import TableHeader from './TableHeader'
import ScrollBar from 'react-custom-scrollbars'

import classnames from 'classnames'

import './styles/table.css'

class Table extends Component {
  static propTypes = {
    data: PropTypes.array,
    columns: PropTypes.array,
    showHeader: PropTypes.bool,
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    height: PropTypes.number,
    rowHeight: PropTypes.number,
  }

  static defaultProps = {
    showHeader: true,
    prefixCls: 'z-table',
    rowHeight: 50,
  }

  static childContextTypes = {
    saveRef: PropTypes.func,
    rowHeight: PropTypes.number,
    values: PropTypes.array
  }

  constructor (props) {
    super(props)

    // console.log(this.getTableColumns())
    let cols = this.getTableColumns()
    let rows = this.getTableRows()
    this.state = {
      data: this.props.data,
      columns: cols,
      scrollColumns: cols,
      rows: rows,
      scrollRows: rows,
      paddingTop: 0,
      paddingBottom:0
    }
  }

  componentDidMount () {
    this.initData()
  }

  getChildContext () {
    return {
      saveRef: this.saveRef,
      rowHeight: this.props.rowHeight || 50,
      values: this.props.values
    }
  }

  initData () {
    const {data} = this.props
    const {columns} = this.state
    this._lastScrollTop = null
    this._lastScrollLeft = null
    this._scrollLeftModel = 0
    this._scrollTopModel = 0

    this._averHeight = Math.ceil(this.tableBody.clientHeight / data.length)
    this._rowsInWindow = Math.ceil(this.scrollbarBody.clientHeight / this._averHeight)
    this._rowsInTop = this._rowsInWindow * 2
    this._rowsInBottom = this._rowsInWindow
    this._maxH = this._averHeight * this._rowsInWindow

    this._averWidth = Math.ceil(this.tableBody.scrollWidth / columns.length)
    this._columnsInWindow = Math.ceil(this.scrollbarBody.clientWidth / this._averWidth)
    this._columnsInLeft = this._columnsInWindow * 2
    this._columnsInRight = this._columnsInWindow
    this._maxW = this._averWidth * this._columnsInWindow

    this.handleScroll()

    if (this.tableBody.scrollWidth === this.tableBody.clientWidth) {
      this._width = this.getTableWidth(columns)
    }
  }

  getTableRows () {
    const {rows, data} = this.props

    let dataKeys = []

    rows.map(rowKey => {
      let keys = new Set()
      data.map(d => {
        if (d[rowKey]) {
          keys.add(d[rowKey])
        }
      })

      dataKeys.push(keys)
    })

    let children = null

    for (let i = dataKeys.length - 1; i > -1; i--) {
      let arr = Array.from(dataKeys[i]).map(key => {
        return {
          dataKey: rows[i],
          key: key,
          dataIndex: key,
          title: key,
          children
        }
      })
      children = arr
    }

    return children
  }

  getTableColumns () {
    const {cols, values, data} = this.props

    let dataKeys = []

    cols.map(columnKey => {
      let keys = new Set()
      data.map(d => {
        if (d[columnKey]) {
          keys.add(d[columnKey])
        }
      })

      dataKeys.push(keys)
    })

    dataKeys.push(values)

    let children = null

    for (let i = dataKeys.length - 1; i > -1; i--) {
      let arr = Array.from(dataKeys[i]).map(key => {
        return {
          dataKey: cols[i],
          key: key,
          dataIndex: key,
          title: key,
          children
        }
      })
      children = arr
    }

    return children
  }

  getTableWidth (columns) {
    return columns.reduce((total, column) => {
      if (column.children) {
        return total + this.getTableWidth(column.children)
      }
      let width = column.width ? column.width : 100
      return total + width
    }, 0)
  }

  getChildrenCount (rows) {
    let count = 0
    let r = rows.map(row => {
      if (row.children) {
        return this.getChildrenCount(row.children) + 1
      } else {
        return count + 1
      }
    })

    return Math.max(...r)
  }

  resetPreviewList (PARAMS, from, to) {
    let data
    switch (PARAMS) {
      case 'data': 
        data = this.props.data
        break
      case 'scrollColumns':
        data = this.state.columns
        break
      case 'scrollRows':
        data = this.state.rows
    }

    this.setState({
      [PARAMS]: data.slice(from, to)
    })
  }

  handleScroll = e => {
    this.handleScrollX(e)
    this.handleScrollY(e)
  }

  handleScrollX = e => {

    let target = e ? e.target : null,
        scrollLeft = e ? e.target.scrollLeft : 0,
        {columns} = this.state

      // 同步移动
    if (scrollLeft !== this._scrollLeftModel) {
      if (target === this.horizontalScrollbarHeader) {
        this.scrollbarBody.scrollLeft = scrollLeft
      } else {
        this.horizontalScrollbarHeader.scrollLeft = scrollLeft
      }
    }
    this._scrollLeftModel = scrollLeft

    if (this._lastScrollLeft === null || Math.abs(scrollLeft - this._lastScrollLeft) > this._maxW) {
      this._lastScrollLeft = scrollLeft


      let from = parseInt(scrollLeft / this._averWidth) - this._columnsInLeft
        if (from < 0) {
          from = 0
        }

        let to = from + this._columnsInLeft + this._columnsInRight + this._columnsInWindow
        if (to > columns.length) {
            to = columns.length
        }

        this.setState({
          // paddingLeft: from * this._averWidth,
          paddingRight: this._averWidth * (columns.length - to)
        })

        this.resetPreviewList('scrollColumns', from, to)
    } else {
      return
    }
  }

  handleScrollY = e => {
    const target = e ? e.target : null,
          scrollTop = e ? e.target.scrollTop : 0,
          {data} = this.props

    // 同步移动
    if (scrollTop !== this._scrollTopModel) {
      if (target === this.verticalScrollbarHeader) {
        this.scrollbarBody.scrollTop = scrollTop
      } else {
        this.verticalScrollbarHeader.scrollTop = scrollTop
      }
    }
    this._scrollTopModel = scrollTop

    // 无限加载
    if (this._lastScrollTop === null || Math.abs(scrollTop - this._lastScrollTop) > this._maxH) {
      this._lastScrollTop = scrollTop

      let from = parseInt(scrollTop / this._averHeight) - this._rowsInTop
        if (from < 0) {
          from = 0
        }

        let to = from + this._rowsInTop + this._rowsInBottom + this._rowsInWindow
        if (to > data.length) {
            to = data.length
        }

        this.setState({
          paddingTop: from * this._averHeight,
          paddingBottom: this._averHeight * (data.length - to)
        })

        this.resetPreviewList('data', from, to)
        this.resetPreviewList('scrollRows', from, to)
    } else {
      return
    }
  }
  saveRef = name => ref => {
    this[name] = ref
  }

  renderThumbVertical ({ style, ...props }) {
    const thumbStyle = {
      height: 0
    };
    return (
      <div
        style={{ ...style, ...thumbStyle }}
        {...props}
      />
    );
  }

  render () {
    const {showHeader, prefixCls, className, rowHeight} = this.props
    const {data, paddingBottom, paddingTop, scrollRows, paddingRight, scrollColumns } = this.state

    const bodyStyles = {
      paddingTop,
      paddingBottom,
      paddingRight,
      paddingLeft: 0
    }

    const tableStyles = {
      width: this._width
    }

    const classStr = classnames(prefixCls, className)

    const rowsChildrenCount = this.getChildrenCount(scrollRows) 

    const verticalScrollStyle = {
      // marginLeft: 100 * rowsChildrenCount,
      // width: this.tableBody && this.tableBody.clientWidth
    }

    const hScrollOuterStyles = {
      height: this.getChildrenCount(scrollColumns) * rowHeight,
      width: this.tableBody && this.tableBody.clientWidth - 2
    }

    const vScrollOuterStyles = {
      width: rowsChildrenCount * 100
    }

    const vScrollInnerStyles = {
      height: this.props.height || 200
    }

    return (
      <div className={classStr} style={{width: this.tableBody && this.tableBody.clientWidth + 100 * rowsChildrenCount}}>
        <div className={`${prefixCls}-top`} style={{height: this.getChildrenCount(scrollColumns) * rowHeight}}>
          {/* 表格头部 */}
          <div className="table-left" style={{width: rowsChildrenCount * 100, height: this.getChildrenCount(scrollColumns) * rowHeight}}></div>
          <div className="scroll-outer" style={hScrollOuterStyles}>
            <div onScroll={this.handleScrollX} className="scroll-inner" ref={this.saveRef('horizontalScrollbarHeader')}>
              <TableHeader columns={scrollColumns}  prefixCls={prefixCls} type='horizontal' saveRef={this.saveRef} />
            </div>
          </div>
        </div>
        <div className={`${prefixCls}-body`}>
          <div className={`${prefixCls}-left`}>
            {/* 表格左边栏头部 */}
            <div className="scroll-outer" style={vScrollOuterStyles}>
              <div style={vScrollInnerStyles} onScroll={this.handleScrollY} className="scroll-inner" ref={this.saveRef('verticalScrollbarHeader')}>
                <TableHeader rows={scrollRows} style={{paddingTop, paddingBottom}} prefixCls={prefixCls} type='vertical' saveRef={this.saveRef} />
              </div>
            </div>
          </div>
          {/* 表格主体 */}
          <div className={`${prefixCls}-body-container`} style={vScrollInnerStyles}>
            <div className="scroll-outer">
              <div style={vScrollInnerStyles} onScroll={this.handleScroll} className="scroll-inner" ref={this.saveRef('scrollbarBody')}>
                <BaseTable 
                  nodeName='tableBody' 
                  prefixCls={prefixCls}
                  data={data} 
                  columns={this.state.columns}
                  rows={scrollRows}
                  style={bodyStyles}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Table