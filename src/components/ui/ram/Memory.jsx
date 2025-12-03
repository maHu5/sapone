import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Led from '../led/Led'
import './Memory.css'

export function BitAddress({ value }) {
    const bits = value.toString(2).padStart(4, '0').split('')
    return (
        <div className="bit-address">
            {bits.map((bit, i) => (
                <Led color="#f1b963" key={i} on={bit === '1'} />
            ))}
        </div>
    )
}

BitAddress.propTypes = {
    value: PropTypes.number.isRequired // 0–15 address value
}

export function BitData({ bits = [], onToggle }) {
    return (
        <div className="bit-data">
            {bits.map((bit, i) => (
                <Led key={i} on={!!bit} onClick={() => onToggle(i)} />
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
            <div className="memory-spacer" />
            <div className="memory-header-cell">Addr</div>
            <div className="memory-header-cell">Data</div>
        </>
    )
}

// Header hat keine Props → kein PropTypes nötig

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
                        <div className="memory-spacer" />
                        <BitAddress value={index + 8} />
                        <BitData bits={ram2[index]} onToggle={(x) => onToggle(index + 8, x)} />
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
