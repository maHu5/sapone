import React from 'react'
import PropTypes from 'prop-types'
import Slot from '../ui/slot/Slot'
import SlotRow from '../ui/slot/SlotRow'
import SlotGroup from '../ui/slot/SlotGroup'
import LedNibble from '../ui/led/LedNibble'
import { useColor } from '../ui/Colors'
import PushButton from '../ui/buttons/PushButton'

function ProgramCounter({ pins, counterEnabled, onCounterEnabled, leftControl, rightControl }) {
    const color = useColor('program-counter')
    const colorOn = useColor('program-counter-on')
    return (
        <Slot title="Program Counter" className="program-counter" leftControl={leftControl} rightControl={rightControl}>
            <SlotRow>
                <SlotGroup>
                    <LedNibble values={pins.slice(-4)} color={color} colorOn={colorOn} />
                </SlotGroup>
            </SlotRow>
            <SlotRow>
                <SlotGroup>
                    <PushButton
                        styles={{ buttonLabel: { fontSize: '12px' } }}
                        name={'Counter Enabled'}
                        on={counterEnabled}
                        onClick={onCounterEnabled}
                    />
                </SlotGroup>
            </SlotRow>
        </Slot>
    )
}

ProgramCounter.propTypes = {
    pins: PropTypes.arrayOf(PropTypes.bool).isRequired,
    counterEnabled: PropTypes.bool,
    onCounterEnabled: PropTypes.func,
    leftControl: PropTypes.node,
    rightControl: PropTypes.node
}

export default ProgramCounter
