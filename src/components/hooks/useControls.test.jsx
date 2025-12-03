import { describe, it, expect } from 'vitest'

import { renderHook, act } from '@testing-library/react'
import useControls from './useControls'

describe('useControls', () => {
    it('should return a default value', () => {
        const { result } = renderHook(() => useControls())

        act(() => {
            result.current.setHlt(true)
            result.current.setOo(true)
        })
        expect(result.current.hlt).toBeTruthy()
        expect(result.current.oo).toBeTruthy()
        expect(result.current.getActiveControlFlags()).toHaveLength(2)
        expect(result.current.getActiveControlFlags()).toEqual(['hlt', 'oo'])

        act(() => {
            result.current.clearControlFlags()
        })

        expect(result.current.hlt).toBeFalsy()
        expect(result.current.oo).toBeFalsy()
        expect(result.current.getActiveControlFlags()).toHaveLength(0)

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
})
