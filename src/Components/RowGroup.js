import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

export default function RowGroup ({
  children,
  prefixCls,
  column,
}) {

  return (
    <div className={`${prefixCls}-row-group`}>
      <div className="row-group-container">
        {children}
      </div>
    </div>
  )
}