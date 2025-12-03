import React from 'react'
import PropTypes from 'prop-types'
import './ToggleButton.css'

function ToggleButton({ active, onLabel, offLabel, onToggle, className = '' }) {
    const longestLabel = onLabel.length > offLabel.length ? onLabel : offLabel

    return (
        <div className={`toggle-button-wrapper ${className}`}>
            {/* Invisible element that defines the width */}
            <span className="toggle-button-ghost">{longestLabel}</span>

            <button onClick={onToggle} className={`toggle-button ${active ? 'active' : ''}`}>
                {active ? onLabel : offLabel}
            </button>
        </div>
    )
}

ToggleButton.propTypes = {
    active: PropTypes.bool.isRequired,
    onLabel: PropTypes.string.isRequired,
    offLabel: PropTypes.string.isRequired,
    onToggle: PropTypes.func.isRequired,
    className: PropTypes.string
}

export default ToggleButton
