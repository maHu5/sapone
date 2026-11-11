import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './SlotGroup.css'

function SlotGroup({ children, style }) {
    return (
        <div className={classNames('slot-group')} style={style}>
            {children}
        </div>
    )
}

SlotGroup.propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object
}

export default SlotGroup
