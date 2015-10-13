import Columns from './Layout/Columns'
import Locales from '../Fields/Locales'
import Name from '../Fields/Name'
import React from 'react'
import RowEditor from './Layout/RowEditor'

const DefaultRowEditor = () => {
    return (
        <RowEditor>
            <Columns size="10">
                <Name />
            </Columns>
            <Columns size="1" offset="1" align="right">
                <Locales />
            </Columns>
        </RowEditor>
    )
}

export default DefaultRowEditor
