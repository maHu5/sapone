import React from 'react'
import PropTypes from 'prop-types'
import './Signal.css'
import Led from './Led'

function splitThreeChars(str) {
    str = str.trim()

    if (str.length === 3) {
        return [str[0], str[1], str[2]]
    } else if (str.length === 2) {
        return ['\u00A0', str[0], str[1]]
    } else if (str.length === 1) {
        return ['\u00A0', '\u00A0', str[0]] // \u00A0 is &nbsp;
    } else {
        return ['\u00A0', '\u00A0', '\u00A0'] // optional: for empty string
    }
}

function Signal({ name, on, onClick, color = '#668ba4' }) {
    const [a, b, c] = splitThreeChars(name.toUpperCase())

    return (
        <div className="signal" onClick={onClick}>
            <div>{a}</div>
            <div>{b}</div>
            <div>{c}</div>
            <Led on={on} color={color} />
        </div>
    )
}

Signal.propTypes = {
    name: PropTypes.string.isRequired,
    on: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
    color: PropTypes.string
}

export default Signal
