import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Slot from '../ui/slot/Slot'
import SlotRow from '../ui/slot/SlotRow'
import SlotGroup from '../ui/slot/SlotGroup'
import LedNibble from '../ui/led/LedNibble'
import { useColor } from '../ui/Colors'

import SevenSegmentDisplay from '../ui/sevensegment/SevenSegmentDisplay'
import ToggleButton from '../ui/buttons/ToggleButton'

function InputOutput({ pins, setPins }) {
    const color = useColor('input-output')
    const [isSigned, setIsSigned] = useState(false)

    const togglePin = (index) => {
        setPins((prevPins) => prevPins.map((pin, i) => (i === index ? !pin : pin)))
    }

    const bitString = pins.map((b) => (b ? '1' : '0')).join('')

    return (
        <Slot title="Input / Output" className="input-output">
            <SlotRow>
                <SlotGroup>
                    <div
                        style={{
                            background: '#111',
                            padding: '2px 15px',
                            marginBottom: '5px',
                            display: 'inline-block'
                        }}
                    >
                        <SevenSegmentDisplay align={'left'} size={28} value={bitString} signed={isSigned} />
                    </div>
                </SlotGroup>
                <SlotGroup>
                    <ToggleButton
                        onLabel={'signed'}
                        offLabel={'unsigned'}
                        active={isSigned}
                        onToggle={() => setIsSigned((s) => !s)}
                    />
                </SlotGroup>
            </SlotRow>
            <SlotRow>
                <SlotGroup>
                    <LedNibble values={pins.slice(0, 4)} color={color} onToggle={(i) => togglePin(i)} />
                </SlotGroup>
                <SlotGroup>
                    <LedNibble values={pins.slice(4)} color={color} onToggle={(i) => togglePin(4 + i)} />
                </SlotGroup>
            </SlotRow>
        </Slot>
    )
}

InputOutput.propTypes = {
    pins: PropTypes.arrayOf(PropTypes.bool).isRequired,
    setPins: PropTypes.func
}

export default InputOutput
