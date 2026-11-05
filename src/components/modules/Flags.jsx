import React from 'react'
import PropTypes from 'prop-types'
import Slot from '../ui/slot/Slot'
import SlotRow from '../ui/slot/SlotRow'
import SlotGroup from '../ui/slot/SlotGroup'
import Led from '../ui/led/Led'
import { useColor } from '../ui/Colors'
function Flags({ pins }) {
    const color = useColor('flags')
    const colorOn = useColor('flags-on')

    return (
        <Slot title="Flags Register" className="flags">
            <SlotRow>
                <SlotGroup>
                    <Led on={pins[0]} color={color} colorOn={colorOn} />
                </SlotGroup>
                <div className="slot-header">
                    <h2>{"Carry Flag"}</h2>
                </div>
            </SlotRow>
            <SlotRow>
                <SlotGroup>
                    <Led on={pins[1]} color={color} colorOn={colorOn} />
                </SlotGroup>
                <div className="slot-header">
                    <h2>{"Zero Flag"}</h2>
                </div>
            </SlotRow>
        </Slot>
    )
}

Flags.propTypes = {
    pins: PropTypes.arrayOf(PropTypes.bool).isRequired
}

export default Flags
