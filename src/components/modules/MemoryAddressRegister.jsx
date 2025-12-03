import React from 'react'
import PropTypes from 'prop-types'
import Slot from '../ui/slot/Slot'
import SlotRow from '../ui/slot/SlotRow'
import SlotGroup from '../ui/slot/SlotGroup'
import LedNibble from '../ui/led/LedNibble'
import { useColor } from '../ui/Colors'

function MemoryAddressRegister({ pins }) {
    const color = useColor('memory-address-register')
    return (
        <Slot title="MemoryAddressRegister" className="memory-address-register">
            <SlotRow>
                <SlotGroup>
                    <LedNibble values={pins.slice(-4)} color={color} />
                </SlotGroup>
            </SlotRow>
        </Slot>
    )
}

MemoryAddressRegister.propTypes = {
    pins: PropTypes.arrayOf(PropTypes.bool).isRequired
}

export default MemoryAddressRegister
