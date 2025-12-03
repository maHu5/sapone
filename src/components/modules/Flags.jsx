import React from 'react'
import PropTypes from 'prop-types'
import Slot from '../ui/slot/Slot'
import SlotRow from '../ui/slot/SlotRow'
import SlotGroup from '../ui/slot/SlotGroup'
import Flag from '../ui/led/Flag'
import { useColor } from '../ui/Colors'
function Flags({ pins }) {
    const color = useColor('flags')
    return (
        <Slot title="Flags Register" className="flags">
            <SlotRow>
                <SlotGroup>
                    <Flag on={pins[0]} labels={['C', 'F']} color={color} />
                </SlotGroup>
                <SlotGroup>
                    <Flag on={pins[1]} labels={['Z', 'F']} color={color} />
                </SlotGroup>
            </SlotRow>
        </Slot>
    )
}

Flags.propTypes = {
    pins: PropTypes.arrayOf(PropTypes.bool).isRequired
}

export default Flags
