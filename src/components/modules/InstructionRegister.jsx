import React from 'react'
import PropTypes from 'prop-types'

import Slot from '../ui/slot/Slot'
import SlotRow from '../ui/slot/SlotRow'
import SlotGroup from '../ui/slot/SlotGroup'
import LedNibble from '../ui/led/LedNibble'
import { useColor } from '../ui/Colors'

import { getBinary } from '../hooks/helper'
import BASE_MICROCODE from '../hooks/BASE_MICROCODE'

function InstructionRegister({ pins, leftControl, rightControl }) {
    const instruction = getBinary(pins.slice(0, 4))
    const address = getBinary(pins.slice(4))

    const instructionColor = useColor('instruction-register-instruction')
    const instructionColorOn = useColor('instruction-register-instruction-on')
    const addressColor = useColor('instruction-register-address')
    const addressColorOn = useColor('instruction-register-address-on')

    return (
        <Slot
            title="Instruction Register"
            className="instruction-register"
            leftControl={leftControl}
            rightControl={rightControl}
        >
            <SlotRow>
                <SlotGroup>
                    <LedNibble values={pins.slice(0, 4)} color={instructionColor} colorOn={instructionColorOn} />
                </SlotGroup>
                <SlotGroup>
                    <LedNibble values={pins.slice(4)} color={addressColor} colorOn={addressColorOn} />
                </SlotGroup>
            </SlotRow>
            <SlotRow>
                <SlotGroup>
                    <span style={{ fontSize: '.7rem', fontWeight: '400' }}>
                        {BASE_MICROCODE[instruction] + ': ' + address}
                    </span>
                </SlotGroup>
            </SlotRow>
        </Slot>
    )
}

InstructionRegister.propTypes = {
    pins: PropTypes.arrayOf(PropTypes.bool).isRequired,
    leftControl: PropTypes.node,
    rightControl: PropTypes.node
}

export default InstructionRegister
