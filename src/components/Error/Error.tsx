import React from 'react'
import { FormHelperText } from '@mui/material'
import { ErrorProps } from '@/types'

const Error = (props: ErrorProps): JSX.Element => {
    const { checker, message } = props
    return (
        <>
            {checker ? (
                <FormHelperText error>{message}</FormHelperText>
            ) : null}
        </>
    )
}

export default Error