import React from 'react'
import PropTypes from 'prop-types'
import { MdSkipNext } from 'react-icons/md'
import './Button.css' // nutzt die gleiche CSS wie deine Button-Komponente
import './StepButton.css' // nutzt die gleiche CSS wie deine Button-Komponente

function StepButton({
    onClick,
    onMouseDown,
    onMouseUp,
    variant = 'primary',
    className = '',
    size = 22,
    disabled = false,
    type = 'button'
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            className={`step-btn btn btn-${variant} ${className}`}
            disabled={disabled}
        >
            <MdSkipNext size={size} />
        </button>
    )
}

StepButton.propTypes = {
    onClick: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'outline']),
    className: PropTypes.string,
    size: PropTypes.number,
    disabled: PropTypes.bool,
    type: PropTypes.string
}

export default StepButton
