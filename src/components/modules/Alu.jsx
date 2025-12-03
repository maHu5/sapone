import React from 'react'
import PropTypes from 'prop-types'

import Slot from '../ui/slot/Slot'
import SlotRow from '../ui/slot/SlotRow'
import SlotGroup from '../ui/slot/SlotGroup'
import LedNibble from '../ui/led/LedNibble'
import { useColor } from '../ui/Colors'
import Led from '../ui/led/Led'

function Alu({ pins, carryFlag }) {
    const color = useColor('alu')
    const colorCarry = useColor('alu-carry')

    return (
        <Slot title="ALU" className="alu">
            <SlotRow>
                <SlotGroup>
                    <LedNibble values={pins.slice(0, 4)} color={color} />
                </SlotGroup>
                <SlotGroup>
                    <LedNibble values={pins.slice(4)} color={color} />
                </SlotGroup>
                <SlotGroup>
                    <Led on={carryFlag} color={colorCarry} />
                </SlotGroup>
            </SlotRow>
        </Slot>
    )
}

Alu.propTypes = {
    pins: PropTypes.arrayOf(PropTypes.bool).isRequired,
    carryFlag: PropTypes.bool
}

export default Alu
