import React, {Component} from 'react'
import PropTypes from 'prop-types'

import BaseTable from './BaseTable'
import ScrollBar from 'react-custom-scrollbars'

import classnames from 'classnames'

import './styles/table.css'

class Table extends Component {
  static propTypes = {
    data: PropTypes.array,
    columns: PropTypes.array,
    showHeader: PropTypes.bool,
    components: PropTypes.object,
    prefixCls: PropTypes.string,
    className: PropTypes.string
  }

  static defaultProps = {
    showHeader: true,
    components: {
      table: {
        thead: {
          row: 'div',
          cell: 'div',
          wrapper: 'div'
        },
        tbody: {
          row: 'div',
          cell: 'div',
          wrapper: 'div'
        },
        wrapper: 'div'
      }
    },
    prefixCls: 'z-table'
  }

  static childContextTypes = {
    saveRef: PropTypes.func,
    table: PropTypes.object,
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
      table: this.props.components.table
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

    console.log(this)

    this.handleScrollY()
    this.handleScrollX()
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

    let target = e ? e.currentTarget.childNodes[0] : null,
        scrollLeft = e ? e.currentTarget.scrollLeft : 0,
        {columns} = this.props

      // 同步移动
    if (scrollLeft !== this._scrollLeftModel) {
      if (target === this.tableHeader) {
        this.refs.scrollbarBody.scrollLeft(scrollLeft)
      } else {
        this.scrollbarHeader.scrollLeft = scrollLeft
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

        console.log(to)

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
    const {components, columns, showHeader, prefixCls, className} = this.props
    const {data, paddingBottom, paddingTop, paddingRight, paddingLeft }  = this.state
    const bodyStyles = {
      paddingTop,
      paddingBottom,
      paddingRight,
      paddingLeft
    }

    const classStr = classnames(prefixCls, className)
    return (
      <div className={classStr}>
        {/* <ScrollBar renderThumbVertical={this.renderThumbVertical} ref="scrollbarHeader" autoHeight onScroll={this.handleScrollX}>
          <BaseTable 
            hasBody={false} 
            nodeName='tableHeader' 
            prefixCls={prefixCls}
            hasHeader={showHeader} 
            components={components} 
            data={data} 
            columns={columns}
            className={`${prefixCls}-header`}
          />
        </ScrollBar> */}
        <div className="scroll-outer">
          <div onScroll={this.handleScrollX} className="scroll-inner" ref={this.saveRef('scrollbarHeader')}>
            <BaseTable 
              hasBody={false} 
              nodeName='tableHeader' 
              prefixCls={prefixCls}
              hasHeader={showHeader} 
              components={components} 
              data={data} 
              columns={columns}
              className={`${prefixCls}-header`}
            />
          </div>
        </div>
        <ScrollBar ref="scrollbarBody" autoHeight onScroll={this.handleScroll}>
          <BaseTable 
            nodeName='tableBody' 
            prefixCls={prefixCls}
            components={components} 
            data={data} 
            columns={this.state.columns}
            style={bodyStyles}
          />
        </ScrollBar>
      </div>
    )
  }
}

export default Table