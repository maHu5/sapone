import React from 'react'
import PropTypes from 'prop-types'

import Slot from '../ui/slot/Slot'
import SlotRow from '../ui/slot/SlotRow'
import SlotGroup from '../ui/slot/SlotGroup'
import LedNibble from '../ui/led/LedNibble'
import { useColor } from '../ui/Colors'
import Led from '../ui/led/Led'
import PushButton from '../ui/buttons/PushButton'

function Alu({ pins, carryFlag, leftControl, rightControl, isSubMode, toggleSubMode }) {
    const color = useColor('alu')
    const colorOn = useColor('alu-on')
    const colorCarry = useColor('alu-carry')
    const colorOnCarry = useColor('alu-carry-on')

    return (
        <Slot title="ALU" className="alu" leftControl={leftControl} rightControl={rightControl}>
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
                    <h2>{'Carry Flag'}</h2>
                </div>
            </SlotRow>
            <SlotRow>
                <SlotGroup>
                    <PushButton
                        styles={{ buttonLabel: { fontSize: '12px' } }}
                        name={'Sub'}
                        on={isSubMode}
                        onClick={toggleSubMode}
                    />
                </SlotGroup>
            </SlotRow>
        </Slot>
    )
}

Alu.propTypes = {
    pins: PropTypes.arrayOf(PropTypes.bool).isRequired,
    leftControl: PropTypes.node,
    rightControl: PropTypes.node,
    carryFlag: PropTypes.bool
}

export default Alu
