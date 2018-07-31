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
    className: PropTypes.string
  }

  static defaultProps = {
    showHeader: true,
    prefixCls: 'z-table'
  }

  static childContextTypes = {
    saveRef: PropTypes.func,
    rowHeight: PropTypes.number
  }

  constructor (props) {
    super(props)

    this.state = {
      data: this.props.data,
      columns: this.props.columns,
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
      rowHeight: this.props.rowHeight || 50
    }
  }

  initData () {
    const {data, columns} = this.props
    this._lastScrollTop = null
    this._lastScrollLeft = null
    this._scrollLeftModel = 0

    this._averHeight = Math.ceil(this.tableBody.clientHeight / data.length)
    this._rowsInWindow = Math.ceil(this.refs.scrollbarBody.getClientHeight() / this._averHeight)
    this._rowsInTop = this._rowsInWindow * 2
    this._rowsInBottom = this._rowsInWindow
    this._maxH = this._averHeight * this._rowsInWindow

    this._averWidth = Math.ceil(this.tableBody.scrollWidth / columns.length)
    this._columnsInWindow = Math.ceil(this.refs.scrollbarBody.getClientWidth() / this._averWidth)
    this._columnsInLeft = this._columnsInWindow * 2
    this._columnsInRight = this._columnsInWindow
    this._maxW = this._averWidth * this._columnsInWindow

    this.handleScrollY()
    this.handleScrollX()

    if (this.tableBody.scrollWidth === this.tableBody.clientWidth) {
      this._width = this.getTableWidth(columns)
    }
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

  resetPreviewList (PARAMS, from, to) {
    let data = PARAMS === 'data' ? this.props.data : this.props.columns
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
        {columns} = this.props

      // 同步移动
    if (scrollLeft !== this._scrollLeftModel) {
      if (target === this.horizontalScrollbarHeader) {
        this.refs.scrollbarBody.scrollLeft(scrollLeft)
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
          paddingLeft: from * this._averWidth,
          paddingRight: this._averWidth * (columns.length - to)
        })

        this.resetPreviewList('columns', from, to)
    } else {
      return
    }
  }

  handleScrollY = e => {
    const scrollTop = e ? e.currentTarget.scrollTop : 0,
          {data} = this.props
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
    const {columns, showHeader, prefixCls, className, rows} = this.props
    const {data, paddingBottom, paddingTop, paddingRight, paddingLeft }  = this.state
    const bodyStyles = {
      paddingTop,
      paddingBottom,
      paddingRight,
      paddingLeft
    }

    const tableStyles = {
      width: this._width
    }

    const classStr = classnames(prefixCls, className)

    const verticalScrollStyle = {
      marginTop: this.horizontalScrollbarHeader && this.horizontalScrollbarHeader.clientHeight + 28
    }
    return (
      <div className={classStr}>
        <div className={`${prefixCls}-left`} style={verticalScrollStyle}>
          {/* 表格左边栏头部 */}
          <div className="scroll-outer">
            <div onScroll={this.handleScrollX} className="scroll-inner" ref={this.saveRef('verticalScrollbarHeader')}>
              <TableHeader rows={rows}  prefixCls={prefixCls} type='vertical' saveRef={this.saveRef} />
            </div>
          </div>
        </div>
        <div className={`${prefixCls}-right`} style={tableStyles}>
          {/* 表格头部 */}
          <div className="scroll-outer">
            <div onScroll={this.handleScrollX} className="scroll-inner" ref={this.saveRef('horizontalScrollbarHeader')}>
              <TableHeader columns={columns}  prefixCls={prefixCls} type='horizontal' saveRef={this.saveRef} />
            </div>
          </div>
          {/* 表格主体 */}
          <ScrollBar ref="scrollbarBody" autoHeight onScroll={this.handleScroll}>
            <BaseTable 
              nodeName='tableBody' 
              prefixCls={prefixCls}
              data={data} 
              columns={this.state.columns}
              style={bodyStyles}
              rows={rows}
            />
          </ScrollBar>
        </div>
      </div>
    )
  }
}

export default Table