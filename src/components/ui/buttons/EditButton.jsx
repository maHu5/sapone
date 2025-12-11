import React from 'react'
import PropTypes from 'prop-types'
import { FaPen } from 'react-icons/fa'
import './Button.css' // nutzt die gleiche CSS wie deine Button-Komponente

function EditButton({ onClick, variant = 'primary', className = '', size = 14, disabled = false, type = 'button' }) {
    return (
        <button type={type} onClick={onClick} className={`btn btn-${variant} ${className}`} disabled={disabled}>
            <FaPen size={size} />
        </button>
    )
}

EditButton.propTypes = {
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'outline']),
    className: PropTypes.string,
    size: PropTypes.number,
    disabled: PropTypes.bool,
    type: PropTypes.string
}

export default EditButton
