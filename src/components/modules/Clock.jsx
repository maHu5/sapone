import React from 'react'
import PropTypes from 'prop-types'
import Led from '../ui/led/Led'
import { useColor } from '../ui/Colors'

import Button from '../ui/buttons/Button'

import Slot from '../ui/slot/Slot'
import SlotRow from '../ui/slot/SlotRow'
import SlotGroup from '../ui/slot/SlotGroup'
import ToggleButton from '../ui/buttons/ToggleButton'

function Clock({ clock, clockButtonDown, clockButtonUp, isRunning, toggleRunning }) {
    const color = useColor('clock')
    return (
        <Slot title="Clock" className="clock" gap>
            <SlotRow>
                <SlotGroup>
                    <Led on={clock} color={color} />
                </SlotGroup>
                <SlotGroup>
                    <Button label="step" onMouseDown={clockButtonDown} onMouseUp={clockButtonUp} />
                </SlotGroup>
                <SlotGroup>
                    <ToggleButton onLabel={'stop'} offLabel={'run'} active={isRunning} onToggle={toggleRunning} />
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
