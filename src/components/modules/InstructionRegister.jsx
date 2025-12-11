import React from 'react'
import PropTypes from 'prop-types'

import Slot from '../ui/slot/Slot'
import SlotRow from '../ui/slot/SlotRow'
import SlotGroup from '../ui/slot/SlotGroup'
import LedNibble from '../ui/led/LedNibble'
import { useColor } from '../ui/Colors'

import { getBinary } from '../hooks/helper'
import BASE_MICROCODE from '../hooks/BASE_MICROCODE'

function InstructionRegister({ pins }) {
    const instruction = getBinary(pins.slice(0, 4))
    const address = getBinary(pins.slice(4))
    const instructionColor = useColor('instruction-register-instruction')
    const addressColor = useColor('instruction-register-address')
    return (
        <Slot title="InstructionRegister" className="instruction-register">
            <SlotRow>
                <SlotGroup>
                    <LedNibble values={pins.slice(0, 4)} color={instructionColor} />
                </SlotGroup>
                <SlotGroup>
                    <LedNibble values={pins.slice(0, 4)} color={addressColor} />
                </SlotGroup>
            </SlotRow>
            <SlotRow>
                <SlotGroup>
                    <span>{BASE_MICROCODE[instruction] + ': ' + address}</span>
                </SlotGroup>
            </SlotRow>
        </Slot>
    )
}

InstructionRegister.propTypes = {
    pins: PropTypes.arrayOf(PropTypes.bool).isRequired
}

export default InstructionRegister
