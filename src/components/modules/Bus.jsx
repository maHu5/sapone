import React from 'react'
import PropTypes from 'prop-types'

import Slot from '../ui/slot/Slot'
import SlotRow from '../ui/slot/SlotRow'
import SlotGroup from '../ui/slot/SlotGroup'
import LedNibble from '../ui/led/LedNibble'
import { useColor } from '../ui/Colors'

function Bus({ pins = [false, false, false, false, false, false, false, false] }) {
    const color = useColor('bus')

    return (
        <Slot title="Bus" className="bus">
            <SlotRow>
                <SlotGroup>
                    <LedNibble values={pins.slice(0, 4)} color={color} />
                </SlotGroup>
                <SlotGroup>
                    <LedNibble values={pins.slice(4)} color={color} />
                </SlotGroup>
            </SlotRow>
        </Slot>
    )
}

Bus.propTypes = {
    pins: PropTypes.arrayOf(PropTypes.bool).isRequired
}

export default Bus
