import React, { StrictMode } from 'react'

import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useRegisterManager from './useRegisterManager'
import { boolArrayToInt, intToBoolArray } from './helper'

const dummyCntl = () => []

const mockCntl1 = vi.fn(() => [])
const mockCntl2 = vi.fn(() => [])

describe('useRegisterManager', () => {
    it('should return a default value', () => {
        const { result } = renderHook(() =>
            useRegisterManager({
                clock: false,
                controlFlags: [],
                getActiveControlFlags: dummyCntl,
                rst: false
            })
        )
        const { state, dispatch } = result.current
        expect(state['BUS'].pins).toStrictEqual([false, false, false, false, false, false, false, false])

        act(() => {
            dispatch({
                type: 'process',
                activePins: []
            })
        })
        expect(state['BUS'].pins).toStrictEqual([false, false, false, false, false, false, false, false])
    })

    it('should be pure', () => {
        // Sample wit two parametes
        //const { result } = renderHook(
        //      ({ clock, cntl }) => useRegisterManager(clock, cntl),
        //      {
        //          initialProps:
        //              { clock: false, cntl: dummyCntl },
        //          wrapper:
        //              ({ children }) => <StrictMode>{children}</StrictMode>,
        //      }
        //)

        const { result } = renderHook(({ param }) => useRegisterManager(param), {
            initialProps: {
                param: {
                    clock: false,
                    controlFlags: [],
                    getActiveControlFlags: dummyCntl,
                    rst: false
                }
            },
            wrapper: ({ children }) => <StrictMode>{children}</StrictMode>
        })
        expect(boolArrayToInt(result.current.state['PC'].pins)).toBe(0)
        expect(result.current.state['PC'].pins).toStrictEqual([false, false, false, false, false, false, false, false])

        act(() => {
            result.current.dispatch({
                type: 'process',
                activePins: ['ce']
            })
        })
        expect(boolArrayToInt(result.current.state['PC'].pins)).toBe(1)
        expect(result.current.state['PC'].pins).toStrictEqual([false, false, false, false, false, false, false, true])
    })

    it('should update with clock', () => {
        const { result, rerender } = renderHook(({ param }) => useRegisterManager(param), {
            initialProps: {
                param: {
                    clock: false,
                    controlFlags: [],
                    getActiveControlFlags: mockCntl1,
                    rst: false
                }
            }
        })
        expect(result.current.state['BUS'].pins).toStrictEqual([false, false, false, false, false, false, false, false])
        expect(mockCntl1).not.toHaveBeenCalled()

        rerender({ param: { clock: true, getActiveControlFlags: mockCntl1 } })
        expect(mockCntl1).toHaveBeenCalledTimes(1)

        rerender({ param: { clock: true, getActiveControlFlags: mockCntl2 } })
        expect(mockCntl2).toHaveBeenCalledTimes(0)
        rerender({ param: { clock: false, getActiveControlFlags: mockCntl2 } })
        expect(mockCntl2).toHaveBeenCalledTimes(0)
        rerender({ param: { clock: true, getActiveControlFlags: mockCntl2 } })
        expect(mockCntl2).toHaveBeenCalledTimes(1)
    })

    it('should change IO Register', () => {
        const { result } = renderHook(() =>
            useRegisterManager({
                clock: false,
                controlFlags: [],
                getActiveControlFlags: dummyCntl,
                rst: false
            })
        )
        act(() => {
            result.current.dispatch({
                type: 'change',
                pins: [true, false, false, false, false, false, false, false]
            })
        })
        expect(result.current.state['IO'].pins).toStrictEqual([true, false, false, false, false, false, false, false])
    })

    it('should increment PC', () => {
        const { result } = renderHook(() =>
            useRegisterManager({
                clock: false,
                controlFlags: [],
                getActiveControlFlags: dummyCntl,
                rst: false
            })
        )
        expect(boolArrayToInt(result.current.state['PC'].pins)).toBe(0)

        act(() => {
            result.current.dispatch({
                type: 'process',
                activePins: ['ce']
            })
        })
        expect(boolArrayToInt(result.current.state['PC'].pins)).toBe(1)
        expect(result.current.state['PC'].pins).toStrictEqual([false, false, false, false, false, false, false, true])
    })

    it('should increment and overflow PC', () => {
        const { result } = renderHook(() =>
            useRegisterManager({
                clock: false,
                controlFlags: [],
                getActiveControlFlags: dummyCntl,
                rst: false
            })
        )
        act(() => {
            result.current.dispatch({
                type: 'change',
                pins: [false, false, false, false, true, true, true, true]
            })
        })
        act(() => {
            result.current.dispatch({
                type: 'process',
                activePins: ['oo', 'jmp']
            })
        })
        act(() => {
            result.current.dispatch({
                type: 'process',
                activePins: ['ce']
            })
        })
        expect(result.current.state['PC'].pins).toStrictEqual([false, false, false, false, false, false, false, false])
    })

    it('should jump', () => {
        const { result } = renderHook(() =>
            useRegisterManager({
                clock: false,
                controlFlags: [],
                getActiveControlFlags: dummyCntl,
                rst: false
            })
        )
        act(() => {
            result.current.dispatch({
                type: 'change',
                pins: [true, false, false, false, true, true, true, true]
            })
        })
        expect(result.current.state['IO'].pins).toStrictEqual([true, false, false, false, true, true, true, true])

        act(() => {
            result.current.dispatch({
                type: 'process',
                activePins: ['oo', 'jmp']
            })
        })
        expect(result.current.state['BUS'].pins).toStrictEqual([true, false, false, false, true, true, true, true])
        expect(result.current.state['PC'].pins).toStrictEqual([false, false, false, false, true, true, true, true])
    })

    it('should set all register', () => {
        const { result } = renderHook(() =>
            useRegisterManager({
                clock: false,
                controlFlags: [],
                getActiveControlFlags: dummyCntl,
                rst: false
            })
        )
        act(() => {
            result.current.dispatch({
                type: 'change',
                pins: [true, false, true, false, false, true, false, true]
            })
        })
        expect(result.current.state['IO'].pins).toStrictEqual([true, false, true, false, false, true, false, true])

        act(() => {
            result.current.dispatch({
                type: 'process',
                activePins: ['oo', 'ai', 'bi', 'ii', 'mi', 'jmp']
            })
        })
        expect(result.current.state['BUS'].pins).toStrictEqual([true, false, true, false, false, true, false, true])
        expect(result.current.state['REGA'].pins).toStrictEqual([true, false, true, false, false, true, false, true])
        expect(result.current.state['REGB'].pins).toStrictEqual([true, false, true, false, false, true, false, true])
        expect(result.current.state['IR'].pins).toStrictEqual([true, false, true, false, false, true, false, true])
        expect(result.current.state['MAR'].pins).toStrictEqual([false, false, false, false, false, true, false, true])
        expect(result.current.state['PC'].pins).toStrictEqual([false, false, false, false, false, true, false, true])
    })

    it('should get low nibble from ir', () => {
        const { result } = renderHook(() =>
            useRegisterManager({
                clock: false,
                controlFlags: [],
                getActiveControlFlags: dummyCntl,
                rst: false
            })
        )
        act(() => {
            result.current.dispatch({
                type: 'change',
                pins: [true, false, false, false, true, true, true, true]
            })
        })
        act(() => {
            result.current.dispatch({
                type: 'process',
                activePins: ['oo', 'ii']
            })
        })
        act(() => {
            result.current.dispatch({
                type: 'process',
                activePins: ['io']
            })
        })
        expect(result.current.state['BUS'].pins).toStrictEqual([false, false, false, false, true, true, true, true])
    })

    it('should add values', () => {
        const { result } = renderHook(() =>
            useRegisterManager({
                clock: false,
                controlFlags: [],
                getActiveControlFlags: dummyCntl,
                rst: false
            })
        )
        act(() => {
            result.current.dispatch({
                type: 'change',
                pins: intToBoolArray(1)
            })
        })

        act(() => {
            result.current.dispatch({
                type: 'process',
                activePins: ['oo', 'ai', 'bi']
            })
        })
        expect(boolArrayToInt(result.current.state['BUS'].pins)).toBe(1)

        act(() => {
            result.current.dispatch({
                type: 'process',
                activePins: ['so']
            })
        })
        expect(boolArrayToInt(result.current.state['BUS'].pins)).toBe(2)
    })

    it('should subtract values', () => {
        const { result } = renderHook(() =>
            useRegisterManager({
                clock: false,
                controlFlags: [],
                getActiveControlFlags: dummyCntl,
                rst: false
            })
        )
        act(() => {
            result.current.dispatch({
                type: 'change',
                pins: intToBoolArray(1)
            })
        })

        act(() => {
            result.current.dispatch({
                type: 'process',
                activePins: ['oo', 'ai', 'bi']
            })
        })
        expect(boolArrayToInt(result.current.state['BUS'].pins)).toBe(1)

        act(() => {
            result.current.dispatch({
                type: 'process',
                activePins: ['su', 'so']
            })
        })
        expect(boolArrayToInt(result.current.state['BUS'].pins)).toBe(0)
    })

    it('should set data to MEMORY', () => {
        const { result } = renderHook(() =>
            useRegisterManager({
                clock: false,
                controlFlags: [],
                getActiveControlFlags: dummyCntl,
                rst: false
            })
        )
        act(() => {
            result.current.dispatch({
                type: 'change',
                pins: [true, false, false, false, true, true, true, true]
            })
        })
        act(() => {
            result.current.dispatch({
                type: 'process',
                activePins: ['oo', 'mi']
            })
        })
        act(() => {
            result.current.dispatch({
                type: 'change',
                pins: [true, true, false, false, true, true, false, false]
            })
        })
        act(() => {
            result.current.dispatch({
                type: 'process',
                activePins: ['oo', 'ri']
            })
        })
        expect(result.current.state['MEMORY'].pins[15]).toStrictEqual([
            true,
            true,
            false,
            false,
            true,
            true,
            false,
            false
        ])
    })

    it('should check t0 and t1 phase', () => {
        const { result, rerender } = renderHook(({ param }) => useRegisterManager(param), {
            initialProps: {
                param: {
                    clock: false,
                    controlFlags: [],
                    getActiveControlFlags: vi.fn(() => []),
                    rst: false
                }
            }
        })

        const getActiveControlFlagsT0 = vi.fn(() => ['mi', 'ce', 'co'])
        rerender({
            param: {
                clock: true,
                controlFlags: ['mi', 'ce', 'co'],
                getActiveControlFlags: getActiveControlFlagsT0,
                rst: false
            }
        })
        expect(boolArrayToInt(result.current.state['PC'].pins)).toBe(1)
        expect(boolArrayToInt(result.current.state['BUS'].pins)).toBe(1)
        expect(boolArrayToInt(result.current.state['MAR'].pins)).toBe(1)

        /*
        rerender({ param: { clock: false, controlFlags:  [], getActiveControlFlags:vi.fn(() => []), rst: false } })

        const getActiveControlFlagsT1=vi.fn(() => ['ro', 'ii', 'ce'])
        rerender({ param: { clock: true, controlFlags:  ['ro', 'ii', 'ce'], getActiveControlFlags:getActiveControlFlagsT1, rst: false } })
        expect(boolArrayToInt(result.current.state['PC'].pins)).toBe(1)
        expect(boolArrayToInt(result.current.state['BUS'].pins)).toBe(1)
        expect(boolArrayToInt(result.current.state['MAR'].pins)).toBe(0)
*/
    })
})
