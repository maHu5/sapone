import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useControls from './useControls'

describe('useControls', () => {
    it('should use htl and io Out', () => {
        const { result } = renderHook(() => useControls())

        expect(result.current.cue).toBe(true)
        expect(result.current.rst).toBe(false)

        act(() => {
            result.current.setCmd('hlt', true)
            result.current.setCmd('oo', true)
        })

        expect(result.current.controlFlags.hlt).toBe(true)
        expect(result.current.controlFlags.oo).toBe(true)
        expect(result.current.getActiveControlFlags()).toHaveLength(2)
        expect(result.current.getActiveControlFlags()).toEqual(['hlt', 'oo'])

        act(() => {
            result.current.clearControlFlags()
        })

        expect(result.current.controlFlags.hlt).toBe(false)
        expect(result.current.controlFlags.oo).toBe(false)
        expect(result.current.getActiveControlFlags()).toHaveLength(0)
    })

    it('should set all control flags', () => {
        const { result } = renderHook(() => useControls())
        act(() => {
            result.current.setControlFlags([
                'hlt',
                'mi',
                'ri',
                'ro',
                'ii',
                'io',
                'ai',
                'ao',
                'bi',
                'bo',
                'so',
                'su',
                'oi',
                'oo',
                'ce',
                'co',
                'jmp'
            ])
        })

        expect(result.current.getActiveControlFlags()).toHaveLength(17)
    })

    it('should set ControlUnit flag', () => {
        const { result } = renderHook(() => useControls())
        expect(result.current.cue).toBe(true)
        act(() => {
            result.current.setCue(false)
        })

        expect(result.current.cue).toBe(false)

        act(() => {
            result.current.setCue(true)
        })
        expect(result.current.cue).toBe(true)
    })
})
