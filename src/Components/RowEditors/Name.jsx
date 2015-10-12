import Columns from './Layout/Columns'
import NameField from '../Fields/Name'
import React from 'react'
import RowEditor from './Layout/RowEditor'

const Name = () => {
    return (
        <RowEditor>
            <Columns size="12">
                <NameField />
            </Columns>
        </RowEditor>
    )
}

export default Name
