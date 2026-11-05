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
        return { ledColor: colors[key], ledOnColor: colors[`${key}-on`], zeroFlagColor: colors[`${key}-flag`], zeroFlagOnColor: colors[`${key}-flag-on`] }
    } else {
        return { ledColor: '#ffd166', ledOnColor: '#ffd166', zeroFlagColor: undefined, zeroFlagOnColor: undefined }
    }
}

function Register({ name, pins, zeroFlag }) {
    const colors = useColors()
    let { ledColor, ledOnColor, zeroFlagColor, zeroFlagOnColor } = getColors(name, colors)
    return (
        <Slot title={name + ' Register'} className="register">
            <SlotRow>
                <SlotGroup>
                    <LedNibble values={pins.slice(0, 4)} color={ledColor} colorOn={ledOnColor} />
                </SlotGroup>
                <SlotGroup>
                    <LedNibble values={pins.slice(4)} color={ledColor} colorOn={ledOnColor} />
                </SlotGroup>
            </SlotRow>
            {zeroFlag !== undefined ? (
                <>
                    <SlotRow>
                        <SlotGroup>
                            <Led on={zeroFlag} color={zeroFlagColor} colorOn={zeroFlagOnColor} />
                        </SlotGroup>
                        <div className="slot-header">
                            <h2>{"Zero Flag"}</h2>
                        </div>
                    </SlotRow>
                </>
            ) : null}
        </Slot>
    )
}

Register.propTypes = {
    name: PropTypes.string,
    pins: PropTypes.arrayOf(PropTypes.bool).isRequired,
    zeroFlag: PropTypes.bool
}

export default Register
