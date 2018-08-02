import React from 'react'
// import PropTypes from 'prop-types'
import Row from './Row'

export default function TableHeader (props) {
  const {
    columns,
    fixed,
    prefixCls,
    saveRef,
    type,
    rows,
    style
  } = props

  return (
    <div ref={saveRef(`${type}HeaderRow`)} className={`${prefixCls}-${type}-thead ${prefixCls}-thead`}>
      {
        <Row
          isHeaderRow={true}
          fixed={fixed}
          columns={columns}
          rows={rows}
          prefixCls={prefixCls}
          indent={0}
          type={type}
          style={style}
      />
      }
    </div>
  )
}