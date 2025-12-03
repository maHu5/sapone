import React from 'react'
import PropTypes from 'prop-types'
import Slot from '../ui/slot/Slot'
import SlotRow from '../ui/slot/SlotRow'
import SlotGroup from '../ui/slot/SlotGroup'
import LedNibble from '../ui/led/LedNibble'
import Led from '../ui/led/Led'
import { useColors } from '../ui/Colors'

function getColors(name, colors) {
    if (name) {
        const key = `register-${name.toLowerCase()}`
        return { ledColor: colors[key], zeroFlagColor: colors[`${key}-flag`] }
    } else {
        return { ledColor: '#ffd166', zeroFlagColor: undefined }
    }
}

function Register({ name, pins, zeroFlag }) {
    const colors = useColors()
    let { ledColor, zeroFlagColor } = getColors(name, colors)

    return (
        <Slot title={name + ' Register'} className="register">
            <SlotRow>
                <SlotGroup>
                    <LedNibble values={pins.slice(0, 4)} color={ledColor} />
                </SlotGroup>
                <SlotGroup>
                    <LedNibble values={pins.slice(4)} color={ledColor} />
                </SlotGroup>
                {zeroFlag !== undefined ? (
                    <SlotGroup>
                        <Led on={zeroFlag} color={zeroFlagColor} />
                    </SlotGroup>
                ) : null}
            </SlotRow>
        </Slot>
    )
}

Register.propTypes = {
    name: PropTypes.string,
    pins: PropTypes.arrayOf(PropTypes.bool).isRequired,
    zeroFlag: PropTypes.bool
}

export default Register
