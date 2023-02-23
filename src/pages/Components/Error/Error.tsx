import React from 'react'
import { FormHelperText } from '@mui/material'

type ErrorProps = {
    message: string | undefined,
    checker: string | false | undefined
}
const Error = (props: ErrorProps) => {
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