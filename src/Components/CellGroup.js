import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

function getChildrenLength (children) {
  let len = 0
  children.map(child => {
    if (child.props.children) {
      len += getChildrenLength(child.props.children)
    } else {
      len += 1
    }
  })
  return len
}

export default function CellGroup ({
  children,
  prefixCls,
  column,
  isHeaderCell,
  rowHeight,
  type
}) {

  const styles = {
    textAlign: column.align
  }

  const headerStyle = {
    height: type === 'vertical' ? rowHeight * getChildrenLength(children) : rowHeight
  }

  return (
    <div className={`${prefixCls}-${type}-cell-group`} style={styles}>
      {isHeaderCell ? <div style={headerStyle} className="cell-group-header">{column.title}</div> : null}
      <div className="cell-group-container">
        {children}
      </div>
    </div>
  )
}

// class CellGroup extends Component {
//   constructor (props) {
//     super(props)
//   }

//   render () {
//     return 
//   }
// }