import React from 'react'
import PropTypes from 'prop-types'
import Slot from '../ui/slot/Slot'
import SlotRow from '../ui/slot/SlotRow'
import SlotGroup from '../ui/slot/SlotGroup'
import LedNibble from '../ui/led/LedNibble'
import { useColor } from '../ui/Colors'

function ProgramCounter({ pins }) {
    const color = useColor('program-counter')
    return (
        <Slot title="Program Counter" className="program-counter">
            <SlotRow>
                <SlotGroup>
                    <LedNibble values={pins.slice(-4)} color={color} />
                </SlotGroup>
            </SlotRow>
        </Slot>
    )
}

ProgramCounter.propTypes = {
    pins: PropTypes.arrayOf(PropTypes.bool).isRequired
}

export default ProgramCounter
