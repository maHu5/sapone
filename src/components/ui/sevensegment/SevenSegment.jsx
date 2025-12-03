import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './SevenSegment.css'

// Welche Segmente bei welchem Zeichen leuchten
const SEGMENT_MAP = {
    0: ['a', 'b', 'c', 'd', 'e', 'f'],
    1: ['b', 'c'],
    2: ['a', 'b', 'g', 'e', 'd'],
    3: ['a', 'b', 'c', 'd', 'g'],
    4: ['f', 'g', 'b', 'c'],
    5: ['a', 'f', 'g', 'c', 'd'],
    6: ['a', 'f', 'e', 'd', 'c', 'g'],
    7: ['a', 'b', 'c'],
    8: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    9: ['a', 'b', 'c', 'd', 'f', 'g'],
    A: ['a', 'b', 'c', 'e', 'f', 'g'],
    B: ['c', 'd', 'e', 'f', 'g'],
    C: ['a', 'f', 'e', 'd'],
    D: ['b', 'c', 'd', 'e', 'g'],
    E: ['a', 'f', 'g', 'e', 'd'],
    F: ['a', 'f', 'g', 'e'],
    '-': ['g'] // ← Minuszeichen = nur mittleres Segment
}

function SevenSegment({ value = 0, color = 'red', size = 28, style = {} }) {
    const char = String(value).toUpperCase()
    const segmentsOn = SEGMENT_MAP[char] || []

    return (
        <div
            className="seven-segment"
            style={{
                '--segment-color': color,
                '--segment-size': `${size}px`,
                ...style
            }}
        >
            {['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((seg) => (
                <div key={seg} className={classNames('segment', seg, { on: segmentsOn.includes(seg) })} />
            ))}
        </div>
    )
}

SevenSegment.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    color: PropTypes.string,
    size: PropTypes.number,
    style: PropTypes.object
}

export default SevenSegment
