import React from 'react'
import PropTypes from 'prop-types'
import Slot from '../ui/slot/Slot'
import SlotRow from '../ui/slot/SlotRow'
import SlotGroup from '../ui/slot/SlotGroup'
import LedNibble from '../ui/led/LedNibble'
import { useColor } from '../ui/Colors'

function MemoryAddressRegister({ pins, leftControl, rightControl }) {
    const color = useColor('memory-address-register')
    const colorOn = useColor('memory-address-register-on')
    return (
        <Slot
            title="Memory Address Register"
            className="memory-address-register"
            leftControl={leftControl}
            rightControl={rightControl}
        >
            <SlotRow>
                <SlotGroup>
                    <LedNibble values={pins.slice(-4)} color={color} colorOn={colorOn} />
                </SlotGroup>
            </SlotRow>
        </Slot>
    )
}

MemoryAddressRegister.propTypes = {
    pins: PropTypes.arrayOf(PropTypes.bool).isRequired,
    leftControl: PropTypes.node,
    rightControl: PropTypes.node
}

export default MemoryAddressRegister
