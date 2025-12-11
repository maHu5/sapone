import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Slot.css'

function Slot({ title, component, children, className, gap }) {
    return (
        <div className={classNames('slot', className, { gap })}>
            <div className="slot-header">
                <h1>{title}</h1>
                {component && <div className="slot-right">{component}</div>}
            </div>
            {children}
        </div>
    )
}

Slot.propTypes = {
    title: PropTypes.string.isRequired,
    component: PropTypes.node,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    gap: PropTypes.bool
}

export default Slot

/*
 <IOSSwitch 
        initial={false}
        onChange={(val) => console.log("Switch:", val)}
      />
*/
