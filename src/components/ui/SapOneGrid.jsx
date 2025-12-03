import React from 'react'
import PropTypes from 'prop-types'

import './SapOneGrid.css'

function SapOneGrid({ children }) {
    return <div className="sap-one-grid">{children}</div>
}

SapOneGrid.propTypes = {
    children: PropTypes.node.isRequired
}

export default SapOneGrid
