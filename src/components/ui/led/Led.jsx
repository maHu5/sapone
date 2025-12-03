import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Led.css'

function Led({ on = false, color = 'green', onClick, style = {} }) {
    return (
        <div
            className={classNames('led', { on, clickable: !!onClick })}
            style={{
                '--led-color': color,
                '--led-bg': on ? color : 'transparent',
                ...style
            }}
            onClick={onClick}
        />
    )
}

Led.propTypes = {
    on: PropTypes.bool,
    color: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object
}

export default Led
