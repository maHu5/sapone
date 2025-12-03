import { useCallback, useMemo, useState } from 'react'

export const CONTROL_NAMES = [
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
    'jmp',
    'fi'
]

export default function useControls() {
    const [cue, setCue] = useState(true)
    const [rst, setRst] = useState(false)

    // Initialisiere alle Kontrollflags in einem Objekt
    const [controlFlags, setControlFlagsState] = useState(
        CONTROL_NAMES.reduce((acc, key) => ({ ...acc, [key]: false }), {})
    )

    // Einzelnes Flag setzen
    const setCmd = useCallback((cmd, value) => {
        setControlFlagsState((prev) => ({ ...prev, [cmd]: value }))
    }, [])

    const toggleCmd = useCallback((cmd) => {
        setControlFlagsState((prev) => ({ ...prev, [cmd]: !prev[cmd] }))
    }, [])

    // Alle Flags zurücksetzen
    const clearControlFlags = useCallback(() => {
        setControlFlagsState((prev) => Object.fromEntries(Object.keys(prev).map((key) => [key, false])))
    }, [])

    // Aktive Flags abrufen
    const getActiveControlFlags = useCallback(() => {
        return (
            Object.entries(controlFlags)
                // eslint-disable-next-line no-unused-vars
                .filter(([_, value]) => value)
                .map(([key]) => key)
        )
    }, [controlFlags])

    // Mehrere Flags aktivieren
    const setControlFlags = useCallback(
        (controls) => {
            clearControlFlags()
            setControlFlagsState((prev) => ({
                ...prev,
                ...controls.reduce((acc, key) => ({ ...acc, [key]: true }), {})
            }))
        },
        [clearControlFlags]
    )

    // Memoisierte Ausgabe aller relevanten Daten
    return useMemo(
        () => ({
            cue,
            setCue,
            rst,
            setRst,
            controlFlags,
            setCmd,
            toggleCmd,
            clearControlFlags,
            setControlFlags,
            getActiveControlFlags
        }),
        [cue, rst, controlFlags, setCmd, clearControlFlags, setControlFlags, getActiveControlFlags]
    )
}
