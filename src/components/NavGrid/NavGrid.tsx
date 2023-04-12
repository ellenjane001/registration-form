import { Grid } from '@mui/material'
import React, { ReactNode } from 'react'

const NavGrid = ({ children }: { children: ReactNode }) => {
    return (
        <Grid item width="100%">{children}</Grid>
    )
}

export default NavGrid