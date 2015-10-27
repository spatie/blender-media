import React from 'react'

const Columns = (props) => {
    let className = `columns_${props.size}`

    if (props.offset) {
        className += ` columns_offset_${props.offset}`
    }

    if (props.align) {
        className += ` align_${props.align}`
    }

    if (props.className) {
        className += props.className
    }

    return <div className={className} style={props.style || {}}>{props.children}</div>
}

export default Columns
