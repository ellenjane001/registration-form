import React from 'react'
import { Grid, Typography } from '@mui/material'
import { Inter } from '@next/font/google'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

interface Props {
    active: string
}

const Navigation = (props: Props) => {
    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item>
                <Link href='/'>
                    <Typography variant='h6' className={inter.className} color={props.active=='home'?'#1976d2':'null'} >Home</Typography>
                </Link>
            </Grid>
            <Grid item>
                <Link href='/contact'>
                    <Typography variant='h6' className={inter.className} color={props.active=='contact'?'#1976d2':'null'}>Contact</Typography>
                </Link>
            </Grid>
        </Grid>
    )
}

export default Navigation