import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Slot.css'

function Slot({ title, children, className, gap }) {
    return (
        <div className={classNames('slot', className, { gap })}>
            <h1>{title}</h1>
            {children}
        </div>
    )
}

Slot.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string.isRequired,
    gap: PropTypes.bool
}

export default Slot
