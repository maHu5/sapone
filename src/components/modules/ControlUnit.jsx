import React from 'react'
import PropTypes from 'prop-types'

import Led from '../ui/led/Led'
import { useColor } from '../ui/Colors'
import { boolArrayToInt } from '../hooks/helper'
import PushButton from '../ui/buttons/PushButton'

import Slot from '../ui/slot/Slot'
import SlotRow from '../ui/slot/SlotRow'
import SlotGroup from '../ui/slot/SlotGroup'

function ControlUnit({ pins, enabled, onClick }) {
    const colorPhase = useColor('control-unit-phase')
    const colorPhaseOn = useColor('control-unit-phase-on')
    const colorTCycle = useColor('control-unit-t-cycle')
    const colorTCycleOn = useColor('control-unit-t-cycle-on')

    const colorOff = useColor('disabled')

    const color1 = enabled ? colorPhase : colorOff
    const color2 = enabled ? colorTCycle : colorOff
    const color1On = enabled ? colorPhaseOn : colorOff
    const color2On = enabled ? colorTCycleOn : colorOff

    const t = boolArrayToInt(pins)

    return (
        <Slot title="Control Unit" className="control-unit">
            <SlotRow>
                <SlotGroup>
                    <Led on={enabled && pins[5]} color={color1} colorOn={color1On} />
                    <Led on={enabled && pins[6]} color={color1} colorOn={color1On} />
                    <Led on={enabled && pins[7]} color={color1} colorOn={color1On} />
                </SlotGroup>
                <SlotGroup>
                    <Led on={enabled && !(t !== 0)} color={color2} colorOn={color2On} />
                    <Led on={enabled && !(t !== 1)} color={color2} colorOn={color2On} />
                    <Led on={enabled && !(t !== 2)} color={color2} colorOn={color2On} />
                    <Led on={enabled && !(t !== 3)} color={color2} colorOn={color2On} />
                    <Led on={enabled && !(t !== 4)} color={color2} colorOn={color2On} />
                </SlotGroup>
                <SlotGroup>
                    <span style={{ fontSize: '.7rem', fontWeight: '400' }}>T&nbsp;{t + 1}</span>
                </SlotGroup>
            </SlotRow>
            <SlotRow>
                <SlotGroup>
                    <PushButton
                        styles={{ buttonLabel: { fontSize: '12px' } }}
                        name={'Enabled'}
                        on={enabled}
                        onClick={onClick}
                    />
                </SlotGroup>
            </SlotRow>
        </Slot>
    )
}

ControlUnit.propTypes = {
    pins: PropTypes.arrayOf(PropTypes.bool).isRequired,
    enabled: PropTypes.bool,
    onClick: PropTypes.func
}

export default ControlUnit
