import React from 'react'
import PropTypes from 'prop-types'
import Led from '../ui/led/Led'
import { useColor } from '../ui/Colors'

import Slot from '../ui/slot/Slot'
import SlotRow from '../ui/slot/SlotRow'
import SlotGroup from '../ui/slot/SlotGroup'

function Clock({ clock }) {
    const color = useColor('clock')
    const colorOn = useColor('clock-on')
    return (
        <Slot title="Clock" className="clock" gap>
            <SlotRow>
                <SlotGroup>
                    <Led on={clock} color={color} colorOn={colorOn} />
                </SlotGroup>
            </SlotRow>
        </Slot>
    )
}

Clock.propTypes = {
    clock: PropTypes.bool.isRequired
}

export default Clock
