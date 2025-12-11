import React from 'react'
import PropTypes from 'prop-types'
import Button from '../ui/buttons/Button'
import ResetButton from '../ui/buttons/ResetButton'
import Slot from '../ui/slot/Slot'
import SlotRow from '../ui/slot/SlotRow'
import SlotGroup from '../ui/slot/SlotGroup'

function Reset({ onButtonDown, onButtonUp }) {
    return (
        <Slot title="Reset" className="reset">
            <SlotRow>
                <SlotGroup>
                    <ResetButton onMouseDown={onButtonDown} onMouseUp={onButtonUp} />
                </SlotGroup>
            </SlotRow>
        </Slot>
    )
}

Reset.propTypes = {
    onButtonDown: PropTypes.func.isRequired,
    onButtonUp: PropTypes.func.isRequired
}

export default Reset
