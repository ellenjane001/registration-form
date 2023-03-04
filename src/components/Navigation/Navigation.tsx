import React from 'react'
import { Grid, Typography } from '@mui/material'
import { Inter } from '@next/font/google'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
const inter = Inter({ subsets: ['latin'] })

interface Props {
    active: string
}

const Navigation = (props: Props) => {
    const { data: session } = useSession()
    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item>
                <Link href='/'>
                    <Typography variant='h6' className={inter.className} color={props.active == 'home' ? '#1976d2' : 'null'} >Home</Typography>
                </Link>
            </Grid>
            <Grid item>
                <Link href='/contact'>
                    <Typography variant='h6' className={inter.className} color={props.active == 'contact' ? '#1976d2' : 'null'}>Contact</Typography>
                </Link>
            </Grid>
            {session && <Grid item>
                <Link href={`/profile/${session.user?.id}`}>
                    <Typography variant='h6' className={inter.className} color={props.active == 'profile' ? '#1976d2' : 'null'}>Profile</Typography>
                </Link>
            </Grid>}
        </Grid >
    )
}

export default Navigation