import React from 'react'
import PropTypes from 'prop-types'
import { FaUndo } from 'react-icons/fa'
import './Button.css' // gleiche Styles wie Button & EditButton

function ResetButton({
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
            <FaUndo size={14} />
        </button>
    )
}

ResetButton.propTypes = {
    onClick: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'outline']),
    className: PropTypes.string,
    size: PropTypes.number,
    disabled: PropTypes.bool,
    type: PropTypes.string
}

export default ResetButton
