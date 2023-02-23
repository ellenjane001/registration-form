import { Grid } from '@mui/material'
import React from 'react'
import { Inter } from '@next/font/google'
const inter = Inter({ subsets: ['latin'] })
const SignIn = () => {
    return (
        <Grid item>
            <h1 className={inter.className} style={{ textAlign: "center" }}>Sign in</h1>
        </Grid>
    )
}

export default SignIn