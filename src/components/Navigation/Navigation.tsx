import { NavigationProps } from '@/types'
import useAppStore from '@/utils/AppStore'
import { swalLogout } from '@/utils/swal'
import { Button, Grid, Typography } from '@mui/material'
import { Inter } from '@next/font/google'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import DarkMode from '../DarkMode'
const inter = Inter({ subsets: ['latin'] })

const Navigation = (props: NavigationProps): JSX.Element => {
    const { data: session } = useSession()

    const theme = useAppStore<boolean>(state => state.theme)

    const handleClickLogout = () => {
        swalLogout({ theme })
    }
    return (
        <Grid container spacing={2}>
            <Grid item md={8} xs={8}>
                <Grid container spacing={2}>
                    <Grid item xs="auto">
                        <Link href='/'>
                            <Typography variant='h6' className={inter.className} color={props.active == 'home' ? '#1976d2' : 'null'} >Home</Typography>
                        </Link>
                    </Grid>
                    <Grid item xs="auto">
                        <Link href='/contact'>
                            <Typography variant='h6' className={inter.className} color={props.active == 'contact' ? '#1976d2' : 'null'}>Contact</Typography>
                        </Link>
                    </Grid>
                    {session && <Grid item xs="auto">
                        <Link href={`/profile/${props.id}`}>
                            <Typography variant='h6' className={inter.className} color={props.active == 'profile' ? '#1976d2' : 'null'}>Profile</Typography>
                        </Link>
                    </Grid>}
                    {session && <Grid item xs="auto">
                        <Link href={`/users`}>
                            <Typography variant='h6' className={inter.className} color={props.active == 'users' ? '#1976d2' : 'null'}>Users</Typography>
                        </Link>
                    </Grid>}
                    <Grid item xs="auto">
                        <DarkMode />
                    </Grid>
                </Grid>
            </Grid>
            {session &&
                <Grid item md={4} xs={4} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-start" }}>
                    <Button variant="contained" onClick={handleClickLogout}> Logout</Button>
                </Grid>}
        </Grid>
    )
}

export default Navigation

