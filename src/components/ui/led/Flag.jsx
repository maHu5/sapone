import React from 'react'
import PropTypes from 'prop-types'
import Led from './Led'
import './Flag.css'

function Flag({ on = false, labels = [], color }) {
    return (
        <div className="flag-column">
            <Led on={on} color={color} />
            {labels.map((label, i) => (
                <div className="flag-label" key={i}>
                    {label}
                </div>
            ))}
        </div>
    )
}

Flag.propTypes = {
    on: PropTypes.bool,
    labels: PropTypes.arrayOf(PropTypes.string)
}

// allow parent to override color
Flag.propTypes = {
    on: PropTypes.bool,
    labels: PropTypes.arrayOf(PropTypes.string),
    color: PropTypes.string
}

export default Flag
