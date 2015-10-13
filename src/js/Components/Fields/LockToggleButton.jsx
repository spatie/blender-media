import React from 'react'

const LockToggleButton = function(props) {
    return (
        <span className="media_toggle">
            <i className={`fa ${props.active ? 'fa-lock' : 'fa-unlock'}`}></i>
        </span>
    )
}

export default LockToggleButton
