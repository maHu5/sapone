import React from 'react'
import PropTypes from 'prop-types'
import { FaCircle } from 'react-icons/fa'
import './Switch.css'

export default function IOSSwitch({ active, onToggle }) {
    return (
        <div className={`ios-switch ${active ? 'on' : 'off'}`} onClick={onToggle}>
            <FaCircle className="switch-icon" />
        </div>
    )
}

IOSSwitch.propTypes = {
    active: PropTypes.bool,
    onToggle: PropTypes.func
}
