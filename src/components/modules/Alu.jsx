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
    const colorOn = useColor('alu-on')
    const colorCarry = useColor('alu-carry')
    const colorOnCarry = useColor('alu-carry-on')

    return (
        <Slot title="ALU" className="alu">
            <SlotRow>
                <SlotGroup>
                    <LedNibble values={pins.slice(0, 4)} color={color} colorOn={colorOn} />
                </SlotGroup>
                <SlotGroup>
                    <LedNibble values={pins.slice(4)} color={color} colorOn={colorOn} />
                </SlotGroup>
            </SlotRow>
            <SlotRow>
                <SlotGroup>
                    <Led on={carryFlag} color={colorCarry} colorOn={colorOnCarry} />
                </SlotGroup>
                <div className="slot-header">
                    <h2>{"Carry Flag"}</h2>
                </div>
            </SlotRow>
        </Slot>
    )
}

Alu.propTypes = {
    pins: PropTypes.arrayOf(PropTypes.bool).isRequired,
    carryFlag: PropTypes.bool
}

export default Alu
