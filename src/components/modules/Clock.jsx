import React from 'react'
import PropTypes from 'prop-types'
import Led from '../ui/led/Led'
import { useColor } from '../ui/Colors'

import Slot from '../ui/slot/Slot'
import SlotRow from '../ui/slot/SlotRow'
import SlotGroup from '../ui/slot/SlotGroup'
import ToggleButton from '../ui/buttons/ToggleButton'
import StepButton from '../ui/buttons/StepButton'
import StartStopButton from '../ui/buttons/StartStopButton'

function Clock({ clock, clockButtonDown, clockButtonUp, isRunning, toggleRunning }) {
    const color = useColor('clock')
    return (
        <Slot title="Clock" className="clock" gap>
            <SlotRow>
                <SlotGroup>
                    <Led on={clock} color={color} />
                </SlotGroup>
                <SlotGroup>
                    <StepButton onMouseDown={clockButtonDown} onMouseUp={clockButtonUp} />
                </SlotGroup>
                <SlotGroup>
                    <StartStopButton active={isRunning} onToggle={toggleRunning} />
                </SlotGroup>
            </SlotRow>
        </Slot>
    )
}

Clock.propTypes = {
    clock: PropTypes.bool.isRequired,
    clockButtonDown: PropTypes.func.isRequired,
    clockButtonUp: PropTypes.func.isRequired,
    isRunning: PropTypes.bool.isRequired,
    toggleRunning: PropTypes.func.isRequired
}

export default Clock
