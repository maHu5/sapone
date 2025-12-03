import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import SevenSegment from './SevenSegment'
import './SevenSegmentDisplay.css'

/**
 * Converts an 8-bit binary string ("11111111") to a number or two's complement number.
 */
function parseBinaryString(binStr, signed = false) {
    const cleanStr = binStr.replace(/[^01]/g, '').padStart(8, '0').slice(-8)
    let value = parseInt(cleanStr, 2)
    if (signed && cleanStr[0] === '1') {
        // Zweierkomplement
        value -= 1 << 8
    }
    return value
}

/**
 * 7-segment display with sign position + three digits
 * value: "10101010"
 * signed: false → 0..255, true → -128..127
 */
function SevenSegmentDisplay({
    value = '00000000',
    signed = false,
    color = 'red',
    size = 60,
    spacing = 8,
    align = 'right',
    style = {}
}) {
    const decimalValue = useMemo(() => parseBinaryString(value, signed), [value, signed])

    // Sign and absolute value formatting
    const { signChar, digits } = useMemo(() => {
        const signChar = decimalValue < 0 ? '-' : ' '
        const absStr = String(Math.abs(decimalValue)).padStart(3, '0')
        return { signChar, digits: absStr }
    }, [decimalValue])

    const displayString = signChar + digits // 4 characters total

    const justify = align === 'left' ? 'flex-start' : align === 'center' ? 'center' : 'flex-end'

    return (
        <div
            className="seven-segment-display"
            style={{
                '--spacing': `${spacing}px`,
                justifyContent: justify,
                ...style
            }}
        >
            {displayString.split('').map((char, i) => (
                <SevenSegment key={i} value={char === ' ' ? '' : char} color={color} size={size} />
            ))}
        </div>
    )
}

SevenSegmentDisplay.propTypes = {
    value: PropTypes.string, // e.g. "11111111"
    signed: PropTypes.bool, // true → two's complement
    color: PropTypes.string,
    size: PropTypes.number,
    spacing: PropTypes.number,
    align: PropTypes.oneOf(['left', 'center', 'right']),
    style: PropTypes.object
}

export default SevenSegmentDisplay
