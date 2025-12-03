import React from 'react'
import PropTypes from 'prop-types'

function SapOnePile({ children }) {
    return <div>{children}</div>
}

SapOnePile.propTypes = {
    children: PropTypes.node
}

export default SapOnePile
