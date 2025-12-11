import React from 'react'
import PropTypes from 'prop-types'
import { TbPlus, TbPlusMinus } from 'react-icons/tb'
import './PlusMinusButton.css'

export default function PlusMinusButton({ active, onToggle, size = 20 }) {
    return (
        <div className="plus-minus-wrapper">
            <div className={`plus-button ${active ? 'inactive' : 'active'}`} onClick={() => onToggle(false)}>
                <TbPlus size={size} />
            </div>
            <div className={`minus-button ${active ? 'active' : 'inactive'}`} onClick={() => onToggle(true)}>
                <TbPlusMinus size={size} />
            </div>
        </div>
    )
}

PlusMinusButton.propTypes = {
    active: PropTypes.bool.isRequired, // false = + aktiv, true = +- aktiv
    onToggle: PropTypes.func.isRequired,
    size: PropTypes.number
}
