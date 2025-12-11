import React from 'react'
import PropTypes from 'prop-types'
import { MdPlayArrow, MdStop } from 'react-icons/md'
import './ToggleButton.css' // nutzt das gleiche Styling wie ToggleButton
import './Button.css' // nutzt die gleiche CSS wie deine Button-Komponente
import './StartStopButton.css' // nutzt die gleiche CSS wie deine Button-Komponente

function StartStopButton({
    active,
    onToggle,
    className = '',
    size = 22,
    variant = 'primary',
    disabled = false,
    type = 'button'
}) {
    return (
        <button
            type={type}
            onClick={onToggle}
            className={`start-stop-btn btn btn-${variant} ${className}`}
            disabled={disabled}
        >
            {active ? <MdStop size={size} /> : <MdPlayArrow size={size} />}
        </button>
    )
}

StartStopButton.propTypes = {
    active: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    className: PropTypes.string,
    size: PropTypes.number,
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'outline']),
    disabled: PropTypes.bool,
    type: PropTypes.string
}

export default StartStopButton
