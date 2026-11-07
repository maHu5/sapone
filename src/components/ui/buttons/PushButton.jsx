import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './PushButton.css'

function PushButton({ name, on, styles, onClick, onMouseDown, onMouseUp, color = '#0b1d07', colorOn = '#08ec61' }) {
    return (
        <div className="push-button" onClick={onClick} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
            <div className="button-content">
                <div className="button-led-container">
                    {on && <div className="button-led-glow" style={{ '--led-glow-color': colorOn }} />}

                    <div
                        className={classNames('button-led', { on })}
                        style={{
                            '--led-color': on ? colorOn : color,
                            '--led-bg': on ? colorOn : color
                        }}
                    >
                        {on && <div className="button-led-highlight" />}
                    </div>
                </div>
                {name !== '\u00A0' && (
                    <div
                        className={classNames('button-label', { on })}
                        style={{
                            '--label-color': on ? colorOn : '#777',
                            '--label-glow-color': colorOn,
                            ...(styles?.buttonLabel ?? {})
                        }}
                    >
                        {name}
                    </div>
                )}
            </div>
        </div>
    )
}

PushButton.propTypes = {
    name: PropTypes.string.isRequired,
    on: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    color: PropTypes.string,
    colorOn: PropTypes.string,
    styles: PropTypes.object
}

export default PushButton
