import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import Memory from '../ui/ram/Memory'

import './RamMonitor.css'
import Button from '../ui/buttons/Button'

function RamMonitor({ ram: initialRam, onSave, onCancel, opened }) {
    const [ram, setRam] = useState(null)
    useEffect(() => {
        if (opened) {
            setRam(initialRam.map((b) => [...b]))
        }
    }, [opened, initialRam])

    const onToggle = (y, x) => {
        setRam((prev) => {
            const newRam = [...prev]
            newRam[y] = [...prev[y]]
            newRam[y][x] = !prev[y][x]
            return newRam
        })
    }

    return (
        <div className={classNames('ram-monitor')}>
            <div className="ram-monitor-header">
                <h2>RAM Monitor</h2>
            </div>

            <div className="ram-monitor-content">
                <Memory ram={ram} onToggle={onToggle} />
            </div>

            <div className="ram-monitor-footer">
                <Button label="save" onClick={() => onSave(ram)} />
                <Button label="cancel" onClick={onCancel} />
            </div>
        </div>
    )
}

RamMonitor.propTypes = {
    ram: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)).isRequired,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    opened: PropTypes.bool
}

export default RamMonitor
