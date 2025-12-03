import React from 'react'
import PropTypes from 'prop-types'
import './Button.css'

function Button({
    label,
    onClick,
    onMouseDown,
    onMouseUp,
    className = '',
    variant = 'primary',
    disabled = false,
    type = 'button'
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            className={`btn btn-${variant} ${className}`}
            disabled={disabled}
        >
            {label}
        </button>
    )
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    className: PropTypes.string,
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'outline']),
    disabled: PropTypes.bool,
    type: PropTypes.string
}

export default Button
