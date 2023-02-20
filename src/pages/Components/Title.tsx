import { Grid } from '@mui/material'
import React from 'react'

const Title = (props: { className: string }) => {
    const { className } = props
    return (
        <Grid item xs={12} md={12} sx={{ textAlign: "center" }}>
            <h1 className={className}>Registration Form</h1>
        </Grid>
    )
}

export default Title