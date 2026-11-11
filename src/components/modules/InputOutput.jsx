import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Slot from '../ui/slot/Slot'
import SlotRow from '../ui/slot/SlotRow'
import SlotGroup from '../ui/slot/SlotGroup'
import LedNibble from '../ui/led/LedNibble'
import { useColor } from '../ui/Colors'
import PushButton from '../ui/buttons/PushButton'

import SevenSegmentDisplay from '../ui/sevensegment/SevenSegmentDisplay'

function InputOutput({ pins, setPins, leftControl, rightControl }) {
    const color = useColor('input-output')
    const colorOn = useColor('input-output-on')
    const [isSigned, setIsSigned] = useState(false)

    const togglePin = (index) => {
        setPins((prevPins) => prevPins.map((pin, i) => (i === index ? !pin : pin)))
    }

    const bitString = pins.map((b) => (b ? '1' : '0')).join('')

    return (
        <Slot title="Input / Output" className="input-output" leftControl={leftControl} rightControl={rightControl}>
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
            </SlotRow>
            <SlotRow>
                <SlotGroup style={{ marginBottom: '10px' }}>
                    <PushButton
                        styles={{ buttonLabel: { fontSize: '12px' } }}
                        name={'SIGNED'}
                        on={isSigned}
                        onClick={() => setIsSigned((s) => !s)}
                    />
                </SlotGroup>
            </SlotRow>
            <SlotRow>
                <SlotGroup>
                    <LedNibble
                        values={pins.slice(0, 4)}
                        color={color}
                        colorOn={colorOn}
                        onToggle={(i) => togglePin(i)}
                    />
                </SlotGroup>
                <SlotGroup>
                    <LedNibble
                        values={pins.slice(4)}
                        color={color}
                        colorOn={colorOn}
                        onToggle={(i) => togglePin(4 + i)}
                    />
                </SlotGroup>
            </SlotRow>
        </Slot>
    )
}

InputOutput.propTypes = {
    pins: PropTypes.arrayOf(PropTypes.bool).isRequired,
    setPins: PropTypes.func,
    leftControl: PropTypes.node,
    rightControl: PropTypes.node
}

export default InputOutput
