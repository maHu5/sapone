import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useRef } from 'react'
import './PushButton.css'

function PushButton({ name, on, styles, onClick, onMouseDown, onMouseUp, color = '#0b1d07', colorOn = '#08ec61' }) {
    const buttonRef = useRef(null)

    const handlePointerDown = onClick
        ? null
        : (event) => {
              console.log('handlePointerDown')
              buttonRef.current.setPointerCapture(event.pointerId)
              onMouseDown?.(event)
          }

    const handlePointerUp = onClick
        ? null
        : (event) => {
              console.log('handlePointerUp')
              onMouseUp?.(event)
          }

    const handlePointerCancel = onClick
        ? null
        : (event) => {
              console.log('handlePointerCancel')
              onMouseUp?.(event)
          }

    return (
        <div
            ref={buttonRef}
            className="push-button"
            onClick={onClick}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            style={styles?.pushButton ?? {}}
        >
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
