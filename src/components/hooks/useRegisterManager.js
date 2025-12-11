import { useCallback, useEffect, useReducer, useRef } from 'react'
import { alu, boolArrayToInt, intToBoolArray } from './helper'

const MAX_TSTATE = 4 // z. B. T0–T8 wie beim SAP-1

const initialState = {
    BUS: { pins: Array(8).fill(false) },
    PC: { pins: Array(8).fill(false) },
    MAR: { pins: Array(8).fill(false) },
    RAM: { pins: Array(8).fill(false) },
    MEMORY: { pins: Array(16).fill(Array(8).fill(false)) },
    IR: { pins: Array(8).fill(false) },
    REGA: { pins: Array(8).fill(false), zeroFlag: true },
    REGB: { pins: Array(8).fill(false) },
    ALU: { pins: Array(8).fill(false), carryFlag: false },
    IO: { pins: Array(8).fill(false) },
    TSC: { pins: Array(8).fill(false) },
    FR: { pins: Array(2).fill(false) }
}

const actionOrder = [
    'hlt',
    'su',
    'ce',
    'ao',
    'bo',
    'co',
    'io',
    'oo',
    'ro',
    'so',
    'fi',
    'ai',
    'bi',
    'ii',
    'jmp',
    'mi',
    'oi',
    'ri'
]

function reducer(state, action) {
    if (action.type === 'incTSC') {
        const current = { ...state }
        const val = (boolArrayToInt(current['TSC'].pins) + 1) % (MAX_TSTATE + 1)
        current['TSC'] = { pins: intToBoolArray(val) }
        return current
    }

    if (action.type === 'change') {
        const current = { ...state }
        current['IO'] = { pins: [...action.pins] }

        return current
    }
    if (action.type === 'changeRam') {
        const current = { ...state }
        current['MEMORY'] = { pins: action.ram.map((y) => y.map((x) => x)) }
        current['RAM'] = { pins: [...current['MEMORY'].pins[boolArrayToInt(current['MAR'].pins)]] }
        return current
    }

    if (action.type === 'reset') {
        const current = { ...state }
        current['BUS'] = { pins: intToBoolArray(0) }
        current['PC'] = { pins: intToBoolArray(0) }
        current['TSC'] = { pins: intToBoolArray(0) }
        current['MAR'] = { pins: intToBoolArray(0) }
        current['IR'] = { pins: intToBoolArray(0) }
        current['REGA'] = { pins: intToBoolArray(0), zeroFlag: true }
        current['REGB'] = { pins: intToBoolArray(0) }
        current['ALU'] = { pins: intToBoolArray(0), carryFlag: false }
        current['IO'] = { pins: intToBoolArray(0) }
        current['RAM'] = { pins: [...current['MEMORY'].pins[boolArrayToInt(current['MAR'].pins)]] }
        current['FR'] = { pins: Array(2).fill(false) }

        return current
    }
    if (action.type === 'process') {
        const current = { ...state }
        const sortedActivePins = action.activePins.sort((a, b) => actionOrder.indexOf(a) - actionOrder.indexOf(b))
        let subtraction = false
        sortedActivePins.forEach((pin) => {
            switch (pin) {
                case 'ce':
                    current['PC'] = { pins: intToBoolArray((boolArrayToInt(current['PC'].pins) + 1) % 16) }
                    break
                case 'ao':
                    current['BUS'] = { pins: [...current['REGA'].pins] }
                    break
                case 'bo':
                    current['BUS'] = { pins: [...current['REGB'].pins] }
                    break
                case 'oo':
                    current['BUS'] = { pins: [...current['IO'].pins] }
                    break
                case 'io':
                    current['BUS'] = { pins: [false, false, false, false, ...current['IR'].pins.slice(-4)] }
                    break
                case 'co':
                    current['BUS'] = { pins: [...current['PC'].pins] }
                    break
                case 'ro':
                    current['BUS'] = { pins: [...current['MEMORY'].pins[boolArrayToInt(current['MAR'].pins)]] }
                    break
                case 'fi':
                    current['FR'] = { pins: [current['ALU'].carryFlag, current['REGA'].zeroFlag] }
                    break
                case 'ai':
                case 'bi':
                case 'su': {
                    if (pin == 'su') subtraction = true

                    if (pin == 'ai') {
                        current['REGA'] = {
                            pins: [...current['BUS'].pins],
                            zeroFlag: boolArrayToInt(current['BUS'].pins) == 0
                        }
                    }

                    if (pin == 'bi') {
                        current['REGB'] = { pins: [...current['BUS'].pins] }
                    }
                    const aBits = current['REGA'].pins
                    const bBits = current['REGB'].pins
                    const op = subtraction ? 'sub' : 'add'

                    const c = alu(aBits, bBits, op)
                    current['ALU'] = { pins: c.result, carryFlag: c.carry }
                    break
                }

                case 'so':
                    current['BUS'] = { pins: [...current['ALU'].pins] }
                    break
                case 'oi':
                    current['IO'] = { pins: [...current['BUS'].pins] }
                    break
                case 'ii':
                    current['IR'] = { pins: [...current['BUS'].pins] }
                    break
                case 'jmp':
                    current['PC'] = { pins: [false, false, false, false, ...current['BUS'].pins.slice(-4)] }
                    break
                case 'mi':
                    current['MAR'] = { pins: [false, false, false, false, ...current['BUS'].pins.slice(-4)] }
                    current['RAM'] = { pins: [...current['MEMORY'].pins[boolArrayToInt(current['MAR'].pins)]] }
                    break
                case 'ri':
                    {
                        const mem = [...current['MEMORY'].pins]
                        mem[boolArrayToInt(current['MAR'].pins)] = [...current['BUS'].pins]
                        current['MEMORY'] = { pins: mem }

                        current['RAM'] = { pins: [...current['MEMORY'].pins[boolArrayToInt(current['MAR'].pins)]] }
                    }
                    break
                default:
                    throw Error('Unknown action: ' + action.type + ':', pin)
            }
        })

        return current
    }
    throw Error('Unknown action: ' + action.type)
}

export default function useRegisterManager({ clock, tscEnabled, getActiveControlFlags, rst }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const prevClockRef = useRef(clock)

    useEffect(() => {
        const prevClock = prevClockRef.current
        if (rst) {
            dispatch({
                type: 'reset'
            })
            prevClockRef.current = clock
            return
        }
        const clockChanged = prevClock !== clock
        if (!clockChanged) return

        if (clock) {
            // Rising Edge → Verarbeitung
            dispatch({
                type: 'process',
                activePins: getActiveControlFlags()
            })
        } else if (tscEnabled) {
            // Falling Edge → TSC-Inkrement
            dispatch({ type: 'incTSC' })
        }
        prevClockRef.current = clock
    }, [clock, tscEnabled, rst, getActiveControlFlags])

    const changeIO = useCallback((pins) => {
        dispatch({ type: 'change', pins })
    }, [])

    const changeRam = useCallback((ram) => {
        dispatch({ type: 'changeRam', ram })
    }, [])

    return { state, dispatch, changeIO, changeRam }
}
