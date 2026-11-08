import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Led.css'

function Led({ on = false, color = 'green', colorOn = 'transparent', onClick, styles = {} }) {
    return (
        <div className="led-main">
            <div className="led-container" style={styles?.ledContainer ?? {}}>
                {on && (
                    <div
                        className="led-glow"
                        style={{
                            '--led-glow-color': colorOn
                        }}
                    />
                )}
                <div
                    className={classNames('led', { on })}
                    style={{
                        '--led-color': on ? colorOn : color,
                        '--led-bg': on ? colorOn : color,
                        ...(styles?.led ?? {})
                    }}
                >
                    {on && <div className="glow" />}
                </div>
            </div>
            {!!onClick && <div onClick={onClick} className={classNames('led-button', { clickable: !!onClick })}></div>}
        </div>
    )
}

Led.propTypes = {
    on: PropTypes.bool,
    color: PropTypes.string,
    colorOn: PropTypes.string,
    onClick: PropTypes.func,
    styles: PropTypes.object
}

export default Led
