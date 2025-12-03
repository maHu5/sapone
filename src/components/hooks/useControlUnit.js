import { useEffect, useMemo, useRef } from 'react'
import MICROCODE from './MICROCODE'
import { getBinary } from './helper'

export default function useControlUnit({ tscEnabled, rst: resetPin, IR, FR, TSC, setControlFlags }) {
    const instruction = useMemo(() => getBinary(IR.slice(0, 4)), [IR])
    const flag = getBinary(FR)
    const cycleCounter = useMemo(() => getBinary(TSC.slice(-3)), [TSC])

    const prevCycleRef = useRef(cycleCounter)

    useEffect(() => {
        if (resetPin) {
            const q = tscEnabled ? MICROCODE[instruction + flag][0] : []
            setControlFlags(q)
            prevCycleRef.current = cycleCounter
            return
        }
        if (!tscEnabled) return

        if (prevCycleRef.current !== cycleCounter) {
            const t = parseInt(cycleCounter, 2)
            const q = MICROCODE[instruction + flag][t] ?? []
            setControlFlags(q)
            prevCycleRef.current = cycleCounter
        }
    }, [instruction, cycleCounter, resetPin, tscEnabled, setControlFlags])

    return {}
}
