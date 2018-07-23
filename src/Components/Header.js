import React from 'react'
// import PropTypes from 'prop-types'
import Row from './Row'

export default function Header (props) {
  const {
    columns,
    fixed,
    prefixCls,
    components
  } = props

  const {wrapper: TheadWrapper} = components

  return (
    <TheadWrapper className={`${prefixCls}-thead`}>
      {
        <Row
          isHeaderRow={true}
          fixed={fixed}
          columns={columns}
          prefixCls={prefixCls}
          indent={0}
          components={components}
      />
      }
    </TheadWrapper>
  )
}