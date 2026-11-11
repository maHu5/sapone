import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Slot.css'

function Slot({ title, leftControl, rightControl, children, className, gap }) {
    return (
        <div className={classNames('slot', className, { gap })}>
            {leftControl}
            <div className="slot-main">
                <div className="slot-header">
                    <h1>{title}</h1>
                </div>
                {children}
            </div>
            {rightControl}
        </div>
    )
}

Slot.propTypes = {
    title: PropTypes.string.isRequired,
    slotRightComponent: PropTypes.node,
    leftControl: PropTypes.node,
    rightControl: PropTypes.node,
    component: PropTypes.node,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    gap: PropTypes.bool
}

export default Slot
