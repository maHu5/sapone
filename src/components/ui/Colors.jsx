import React, { createContext, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'

// Default color palette for modules / LED groups
export const DefaultColors = {
    bus: '#f70821',
    'register-a': '#f70821',
    'register-a-flag': '#1d3ac2',
    'register-b': '#f70821',
    alu: '#f70821',
    'alu-carry': '#1d3ac2',
    flags: '#237e06',
    'input-output': '#f70821',
    'program-counter': '#237e06',
    'memory-address-register': '#ffb300',
    ram: '#f70821',
    'instruction-register-instruction': '#1d3ac2',
    'instruction-register-address': '#ffb300',
    'control-unit-phase': '#f70821', // semantic phase indicator (e.g. fetch/execute)
    'control-unit-t-cycle': '#237e06', // T-cycle indicator (e.g. T1/T2)
    clock: '#1d3ac2',
    signal: '#1d3ac2',
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
