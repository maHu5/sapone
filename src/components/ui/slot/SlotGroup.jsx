import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './SlotGroup.css'

function SlotGroup({ children }) {
    return <div className={classNames('slot-group')}>{children}</div>
}

SlotGroup.propTypes = {
    children: PropTypes.node.isRequired
}

export default SlotGroup
