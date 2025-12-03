import React from 'react'
import PropTypes from 'prop-types'

import Button from '../ui/buttons/Button'

import Slot from '../ui/slot/Slot'
import SlotRow from '../ui/slot/SlotRow'
import SlotGroup from '../ui/slot/SlotGroup'
import LedNibble from '../ui/led/LedNibble'
import { useColor } from '../ui/Colors'

function Ram({ pins, onClick }) {
    const color = useColor('ram')
    return (
        <Slot title="Ram" className="ram">
            <SlotRow>
                <SlotGroup>
                    <LedNibble values={pins.slice(0, 4)} color={color} />
                </SlotGroup>
                <SlotGroup>
                    <LedNibble values={pins.slice(4)} color={color} />
                </SlotGroup>
                <SlotGroup>
                    <Button label="edit" onClick={onClick} />
                </SlotGroup>
            </SlotRow>
        </Slot>
    )
}

Ram.propTypes = {
    pins: PropTypes.arrayOf(PropTypes.bool).isRequired,
    onClick: PropTypes.func
}

export default Ram
