import React from 'react'
import PropTypes from 'prop-types'
import './Lightbox.css'

export default function Lightbox({ children, onClose }) {
    const handleBackgroundClick = (e) => {
        if (e.target.classList.contains('lightbox-overlay')) {
            onClose()
        }
    }

    return (
        <div className="lightbox-overlay" onClick={handleBackgroundClick}>
            <div className="lightbox-content">
                {children}
                <button className="lightbox-close" onClick={onClose}>
                    ✕
                </button>
            </div>
        </div>
    )
}

Lightbox.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func
}
