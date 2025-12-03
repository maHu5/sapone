import React from 'react'
import PropTypes from 'prop-types'

import Led from '../ui/led/Led'
import { useColor } from '../ui/Colors'
import { boolArrayToInt } from '../hooks/helper'
import ToggleButton from '../ui/buttons/ToggleButton'
import Slot from '../ui/slot/Slot'
import SlotRow from '../ui/slot/SlotRow'
import SlotGroup from '../ui/slot/SlotGroup'

function ControlUnit({ pins, enabled, onClick }) {
    const colorPhase = useColor('control-unit-phase')
    const colorTCycle = useColor('control-unit-t-cycle')
    const colorOff = useColor('disabled')

    const color1 = enabled ? colorPhase : colorOff
    const color2 = enabled ? colorTCycle : colorOff

    const t = boolArrayToInt(pins)
    return (
        <Slot title="ControlUnit" className="control-unit">
            <SlotRow>
                <SlotGroup>
                    <Led on={pins[5]} color={color1} />
                    <Led on={pins[6]} color={color1} />
                    <Led on={pins[7]} color={color1} />
                </SlotGroup>
                <SlotGroup>
                    <Led on={t !== 0} color={color2} />
                    <Led on={t !== 1} color={color2} />
                    <Led on={t !== 2} color={color2} />
                    <Led on={t !== 3} color={color2} />
                    <Led on={t !== 4} color={color2} />
                </SlotGroup>
                <SlotGroup>
                    <ToggleButton onLabel={'on'} offLabel={'off'} active={enabled} onToggle={onClick} />
                </SlotGroup>
            </SlotRow>
        </Slot>
    )
}

ControlUnit.propTypes = {
    pins: PropTypes.arrayOf(PropTypes.bool).isRequired,
    enabled: PropTypes.bool,
    onClick: PropTypes.func
}

export default ControlUnit
