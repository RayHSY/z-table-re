import React from 'react'
// import PropTypes from 'prop-types'
import Row from './Row'

export default function Header (props) {
  const {
    columns,
    fixed,
    prefixCls,
    saveRef
  } = props

  return (
    <div ref={saveRef('headerRow')} className={`${prefixCls}-thead`}>
      {
        <Row
          isHeaderRow={true}
          fixed={fixed}
          columns={columns}
          prefixCls={prefixCls}
          indent={0}
      />
      }
    </div>
  )
}