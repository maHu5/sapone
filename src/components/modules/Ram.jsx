import React from 'react'
import PropTypes from 'prop-types'

import Slot from '../ui/slot/Slot'
import SlotRow from '../ui/slot/SlotRow'
import SlotGroup from '../ui/slot/SlotGroup'
import LedNibble from '../ui/led/LedNibble'
import { useColor } from '../ui/Colors'
import PushButton from '../ui/buttons/PushButton'
function Ram({ pins, isRamEditorOpen, toggleRamEditor, leftControl, rightControl }) {
    const color = useColor('ram')
    const colorOn = useColor('ram-on')
    return (
        <Slot title="Ram" className="ram" leftControl={leftControl} rightControl={rightControl}>
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
                    <PushButton
                        styles={{ buttonLabel: { fontSize: '12px' } }}
                        name={'Monitor'}
                        on={isRamEditorOpen}
                        onClick={toggleRamEditor}
                    />
                </SlotGroup>
            </SlotRow>
        </Slot>
    )
}

Ram.propTypes = {
    pins: PropTypes.arrayOf(PropTypes.bool).isRequired,
    isRamEditorOpen: PropTypes.bool,
    toggleRamEditor: PropTypes.func,
    onClick: PropTypes.func,
    leftControl: PropTypes.node,
    rightControl: PropTypes.node
}

export default Ram
