import React from 'react'
import PropTypes from 'prop-types'
import Signal from '../ui/led/Signal'
import { useColor } from '../ui/Colors'
import Slot from '../ui/slot/Slot'
import SlotRow from '../ui/slot/SlotRow'
import SlotGroup from '../ui/slot/SlotGroup'

import { CONTROL_NAMES } from '../hooks/useControls'

function ControlSignals({ cntl }) {
    const color = useColor('signal')
    return (
        <Slot title="Control Signals" className="control-signals">
            <SlotRow>
                <SlotGroup>
                    {CONTROL_NAMES.map((key) => (
                        <Signal
                            key={key}
                            name={key}
                            color={color}
                            on={cntl.controlFlags[key]}
                            onClick={() => cntl.toggleCmd(key)}
                        />
                    ))}
                </SlotGroup>
            </SlotRow>
        </Slot>
    )
}

ControlSignals.propTypes = {
    cntl: PropTypes.shape({
        controlFlags: PropTypes.objectOf(PropTypes.bool).isRequired,
        toggleCmd: PropTypes.func.isRequired
    }).isRequired
}

export default ControlSignals
