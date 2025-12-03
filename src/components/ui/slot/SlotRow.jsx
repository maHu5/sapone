import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './SlotRow.css'

function SlotRow({ children }) {
    return <div className={classNames('slot-row')}>{children}</div>
}

SlotRow.propTypes = {
    children: PropTypes.node.isRequired
}

export default SlotRow
