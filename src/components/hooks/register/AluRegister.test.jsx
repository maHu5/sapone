import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useRegisterManager from '../useRegisterManager'
import { boolArrayToInt, intToBoolArray, alu } from '../helper'

const dummyCntl = () => []

describe('AluRegister', () => {
    it('should add 10 with 10', () => {
        const { result } = renderHook(() =>
            useRegisterManager({
                clock: false,
                controlFlags: [],
                getActiveControlFlags: dummyCntl,
                rst: false
            })
        )
        const num10 = intToBoolArray(10)

        act(() => {
            result.current.dispatch({
                type: 'change',
                pins: num10
            })
        })
        act(() => {
            result.current.dispatch({
                type: 'process',
                activePins: ['oo', 'ai', 'bi']
            })
        })
        const aNum = boolArrayToInt(result.current.state['REGA'].pins)
        const bNum = boolArrayToInt(result.current.state['REGB'].pins)
        const cNum = boolArrayToInt(result.current.state['ALU'].pins)
        expect(aNum).toEqual(10)
        expect(bNum).toEqual(10)
        expect(cNum).toEqual(20)
        expect(result.current.state['ALU'].carryFlag).toBeFalsy()
    })

    it('should add 250 with 10 with overflow', () => {
        const { result } = renderHook(() =>
            useRegisterManager({
                clock: false,
                controlFlags: [],
                getActiveControlFlags: dummyCntl,
                rst: false
            })
        )
        const num250 = intToBoolArray(250)
        const num10 = intToBoolArray(10)

        act(() => {
            result.current.dispatch({
                type: 'change',
                pins: num250
            })
        })
        act(() => {
            result.current.dispatch({
                type: 'process',
                activePins: ['oo', 'ai']
            })
        })
        act(() => {
            result.current.dispatch({
                type: 'change',
                pins: num10
            })
        })
        act(() => {
            result.current.dispatch({
                type: 'process',
                activePins: ['oo', 'bi']
            })
        })
        const aNum = boolArrayToInt(result.current.state['REGA'].pins)
        const bNum = boolArrayToInt(result.current.state['REGB'].pins)
        const cNum = boolArrayToInt(result.current.state['ALU'].pins)

        expect(aNum).toEqual(250)
        expect(bNum).toEqual(10)
        expect(cNum).toEqual(4)
        expect(result.current.state['ALU'].carryFlag).toBeTruthy()
    })

    it('should test alu add with carry', () => {
        const num250 = intToBoolArray(250)
        const num10 = intToBoolArray(10)
        const c = alu(num250, num10, 'add')
        const cNum = boolArrayToInt(c.result)
        expect(cNum).toEqual(4) //250+10-256
        expect(c.carry).toBeTruthy()
    })

    it('should test alu add 250 + -10', () => {
        const num250 = intToBoolArray(250)
        const numMinus10 = intToBoolArray(-10, 8, true)
        const c = alu(num250, numMinus10, 'add')
        const cNum = boolArrayToInt(c.result)
        expect(cNum).toEqual(240)
        expect(c.carry).toBeTruthy()
    })

    it('should test alu sub 250 with 10', () => {
        const num250 = intToBoolArray(250)
        const num10 = intToBoolArray(10)

        const c = alu(num250, num10, 'sub')

        const cNum = boolArrayToInt(c.result)
        expect(cNum).toEqual(240)
        expect(c.carry).toBeFalsy()
    })

    it('should test alu adding 10 with 10,  sub, add, sub', () => {
        const { result } = renderHook(() =>
            useRegisterManager({
                clock: false,
                controlFlags: [],
                getActiveControlFlags: dummyCntl,
                rst: false
            })
        )
        const num10 = intToBoolArray(10)

        act(() => {
            result.current.dispatch({
                type: 'change',
                pins: num10
            })
        })
        act(() => {
            result.current.dispatch({
                type: 'process',
                activePins: ['oo', 'ai', 'bi']
            })
        })
        let aNum = boolArrayToInt(result.current.state['REGA'].pins)
        let bNum = boolArrayToInt(result.current.state['REGB'].pins)
        let cNum = boolArrayToInt(result.current.state['ALU'].pins)
        expect(aNum).toEqual(10)
        expect(bNum).toEqual(10)
        expect(cNum).toEqual(20)
        expect(result.current.state['ALU'].carryFlag).toBeFalsy()

        act(() => {
            result.current.dispatch({
                type: 'subtraction',
                on: true
            })
        })

        aNum = boolArrayToInt(result.current.state['REGA'].pins)
        bNum = boolArrayToInt(result.current.state['REGB'].pins)
        cNum = boolArrayToInt(result.current.state['ALU'].pins)
        expect(aNum).toEqual(10)
        expect(bNum).toEqual(10)
        expect(cNum).toEqual(0)
        expect(result.current.state['ALU'].carryFlag).toBeFalsy()

        act(() => {
            result.current.dispatch({
                type: 'subtraction',
                on: false
            })
        })

        aNum = boolArrayToInt(result.current.state['REGA'].pins)
        bNum = boolArrayToInt(result.current.state['REGB'].pins)
        cNum = boolArrayToInt(result.current.state['ALU'].pins)
        expect(aNum).toEqual(10)
        expect(bNum).toEqual(10)
        expect(cNum).toEqual(20)
        expect(result.current.state['ALU'].carryFlag).toBeFalsy()
    })
})
