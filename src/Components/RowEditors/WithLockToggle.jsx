import Columns from './Layout/Columns'
import Locales from '../Fields/Locales'
import LockToggleButton from '../Fields/ToggleButtons/LockToggleButton'
import Name from '../Fields/Name'
import React from 'react'
import RowEditor from './Layout/RowEditor'
import Toggle from '../Fields/Toggle'

const WithLockToggle = () => {
    return (
        <RowEditor>
            <Columns size="8">
                <Name />
            </Columns>
            <Columns size="1" offset="1" align="right">
                <Locales />
            </Columns>
            <Columns size="1" offset="1" align="right">
                <Toggle for="isPrivate"
                        default={false}
                        contents={LockToggleButton} />
            </Columns>
        </RowEditor>
    )
}

export default WithLockToggle
