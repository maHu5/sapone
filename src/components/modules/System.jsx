import React, { useState } from 'react'
import PropTypes from 'prop-types'
import PushButton from '../ui/buttons/PushButton'
import Slot from '../ui/slot/Slot'
import SlotRow from '../ui/slot/SlotRow'
import SlotGroup from '../ui/slot/SlotGroup'

function System({ onButtonDown, onButtonUp, clockButtonDown, clockButtonUp, isRunning, toggleRunning }) {
    const [isResetDown, SetResetDown] = useState(false)
    const [isStepDown, SetSteptDown] = useState(false)

    return (
        <Slot title="System" className="reset">
            <SlotRow>
                <SlotGroup>
                    <PushButton
                        name={'Reset'}
                        on={isResetDown}
                        onMouseDown={() => {
                            SetResetDown(true)
                            onButtonDown()
                        }}
                        onMouseUp={() => {
                            SetResetDown(false)
                            onButtonUp()
                        }}
                        color={'#300000'}
                        colorOn={'#ff0204'}
                    />
                </SlotGroup>
                <SlotGroup>
                    <PushButton
                        name={'Step'}
                        on={isStepDown}
                        color={'#493e0b'}
                        colorOn={'#ffe902'}
                        onMouseDown={() => {
                            SetSteptDown(true)
                            clockButtonDown()
                        }}
                        onMouseUp={() => {
                            SetSteptDown(false)
                            clockButtonUp()
                        }}
                    />
                </SlotGroup>
                <SlotGroup>
                    <PushButton name={'Run'} on={isRunning} onClick={toggleRunning} />
                </SlotGroup>
            </SlotRow>
        </Slot>
    )
}

System.propTypes = {
    onButtonDown: PropTypes.func.isRequired,
    onButtonUp: PropTypes.func.isRequired,
    clockButtonDown: PropTypes.func.isRequired,
    clockButtonUp: PropTypes.func.isRequired,
    isRunning: PropTypes.bool.isRequired,
    toggleRunning: PropTypes.func.isRequired
}

export default System
