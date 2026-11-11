import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Led from '../led/Led'
import './Memory.css'

import BASE_MICROCODE from '../../hooks/BASE_MICROCODE'

export function BitAddress({ value }) {
    const bits = value.toString(2).padStart(4, '0').split('')
    return (
        <div className="bit-address">
            {bits.map((bit, i) => (
                <Led
                    color="#493e0b"
                    colorOn="#9f7902"
                    key={i}
                    on={bit === '1'}
                    styles={{ ledContainer: { margin: '0 0' } }}
                />
            ))}
        </div>
    )
}
BitAddress.propTypes = {
    value: PropTypes.number.isRequired // 0–15 address value
}

export function BitCode({ value, code }) {
    const address = '$' + value.toString(16).padStart(2, '0').toUpperCase()
    const myCode = code.slice(0, 4).map(Number).join('')
    const optCode = BASE_MICROCODE[myCode]
    const binary = code.slice(4, 8).map(Number).join('')
    let hex = '$' + parseInt(binary, 2).toString(16).toUpperCase().padStart(2, '0')

    const singleCMDs = ['NOP', 'OUT', 'HLT']
    if (singleCMDs.includes(optCode)) {
        hex = ''
    }
    if (optCode == 'LDI') {
        hex = '#' + hex
    }

    return (
        <div className="bit-code">
            <span className="address">{address}</span>
            <span className="opt-code">{optCode}</span>
            <span className="hex">{hex}</span>
        </div>
    )
}

BitCode.propTypes = {
    value: PropTypes.number.isRequired,
    code: PropTypes.arrayOf(PropTypes.bool).isRequired
}

export function BitData({ bits = [], onToggle }) {
    return (
        <div className="bit-data">
            {bits.map((bit, i) => (
                <Led key={i} on={!!bit} color="#300000" colorOn="#ff0204" onClick={() => onToggle(i)} />
            ))}
        </div>
    )
}

BitData.propTypes = {
    bits: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.bool, PropTypes.number])).isRequired,
    onToggle: PropTypes.func.isRequired // Callback on bit click
}

export function MemoryHeader() {
    return (
        <>
            <div className="memory-header-cell">Addr</div>
            <div className="memory-header-cell">Data</div>
            <div className="memory-header-cell"></div>
            <div className="memory-spacer" />
            <div className="memory-header-cell">Addr</div>
            <div className="memory-header-cell">Data</div>
            <div className="memory-header-cell"></div>
        </>
    )
}

export default function Memory({ ram = [], onToggle }) {
    if (ram == null) return null

    const ram1 = ram.slice(0, 8)
    const ram2 = ram.slice(8)

    return (
        <div className="memory-container">
            <div className="memory-grid">
                <MemoryHeader />
                {ram1.map((value, index) => (
                    <Fragment key={index}>
                        <BitAddress value={index} />
                        <BitData bits={ram1[index]} onToggle={(x) => onToggle(index, x)} />
                        <BitCode value={index} code={ram1[index]} />
                        <div className="memory-spacer" />
                        <BitAddress value={index + 8} />
                        <BitData bits={ram2[index]} onToggle={(x) => onToggle(index + 8, x)} />
                        <BitCode value={index + 8} code={ram2[index]} />
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

Memory.propTypes = {
    ram: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.bool, PropTypes.number]))).isRequired, // 2D-Array [ [bits...], [bits...] ]
    onToggle: PropTypes.func.isRequired // Callback for bit change
}
