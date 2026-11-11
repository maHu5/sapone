import React, { createContext, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'

// Default color palette for modules / LED groups
export const DefaultColors = {
    bus: '#493e1b',
    'bus-on': '#ffe902',
    'register-a': '#300000',
    'register-a-on': '#ff0204',
    'register-a-flag': '#492e1b',
    'register-a-flag-on': '#ffe902',
    'register-b': '#300000',
    'register-b-on': '#f70821',
    alu: '#300000',
    'alu-on': '#f70821',
    'alu-carry': '#493e0b',
    'alu-carry-on': '#ffe902',
    flags: '#0b1d07',
    'flags-on': '#08ec61',
    'input-output': '#300000',
    'input-output-on': '#ff0204',
    signal: '#001B38',
    'signal-on': '#0077FF',
    'program-counter': '#493e0b',
    'program-counter-on': '#ffe902',
    'memory-address-register': '#493e0b',
    'memory-address-register-on': '#ffe902',

    ram: '#300000',
    'ram-on': '#ff0204',

    'instruction-register-instruction': '#001B38',
    'instruction-register-instruction-on': '#0077FF',
    'instruction-register-address': '#493e0b',
    'instruction-register-address-on': '#ffe902',

    'control-unit-phase': '#300000', // semantic phase indicator (e.g. fetch/execute)
    'control-unit-phase-on': '#ff0204', // semantic phase indicator (e.g. fetch/execute)
    'control-unit-t-cycle': '#0b1d07', // T-cycle indicator (e.g. T1/T2)
    'control-unit-t-cycle-on': '#08ec61', // T-cycle indicator (e.g. T1/T2)

    clock: '#001B38',
    'clock-on': '#0077FF',

    disabled: '#555'
}

// React context so components can override or extend colors
export const ColorsContext = createContext(DefaultColors)

// Provider: pass `colors` object to override defaults
export function ColorsProvider({ children, colors = {} }) {
    const merged = useMemo(() => ({ ...DefaultColors, ...colors }), [colors])
    return <ColorsContext.Provider value={merged}>{children}</ColorsContext.Provider>
}

ColorsProvider.propTypes = {
    children: PropTypes.node.isRequired,
    colors: PropTypes.objectOf(PropTypes.string)
}

// Hook: get colors map
export function useColors() {
    return useContext(ColorsContext)
}

// Convenience hook: get single color by key
export function useColor(key) {
    const colors = useColors()
    if (!key) return '#cccccc'
    return colors[key] || '#cccccc'
}

export default DefaultColors
