import React from 'react'
import PropTypes from 'prop-types'
import Led from './Led'

export default function LedNibble({ values, color = 'red', colorOn = 'transparent', onToggle }) {
    const count = values.length

    if (count !== 4) {
        console.warn(`LedArray: expected 4 LEDs, got ${count}`)
        return null
    }

    return (
        <>
            {values.map((on, i) => (
                <Led
                    key={i}
                    on={on}
                    color={color}
                    colorOn={colorOn}
                    {...(onToggle ? { onClick: () => onToggle(i) } : {})}
                />
            ))}
        </>
    )
}

LedNibble.propTypes = {
    values: PropTypes.arrayOf(PropTypes.bool).isRequired,
    color: PropTypes.string,
    colorOn: PropTypes.string,
    onToggle: PropTypes.func
}
