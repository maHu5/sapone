import { useState, useEffect, useCallback, useRef } from 'react'

const DELAY = 1000 / 10 // 1 Hz Clock

export default function useClock({ hlt = false } = {}) {
    const [clock, setClock] = useState(false)
    const [isRunning, setIsRunning] = useState(false)
    const intervalRef = useRef(null)

    // main clock tick
    useEffect(() => {
        if (!isRunning) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
            return
        }

        intervalRef.current = setInterval(() => {
            setClock((prev) => !prev)
        }, DELAY / 2)

        return () => clearInterval(intervalRef.current)
    }, [isRunning])

    // single steps (only allowed when clock is not running)
    const singleStepDown = useCallback(() => {
        if (!isRunning) setClock(true)
    }, [isRunning])

    const singleStepUp = useCallback(() => {
        if (!isRunning) setClock(false)
    }, [isRunning])

    const toggleRunning = useCallback(() => {
        setIsRunning((prev) => !prev)
    }, [])

    return {
        clock: clock && !hlt, // pause clock signal when HLT is active
        singleStepDown,
        singleStepUp,
        isRunning,
        toggleRunning
    }
}
