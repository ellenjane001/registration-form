import { NavigationProps } from '@/types'
import useAppStore from '@/utils/AppStore'
import { Button, Grid, Typography } from '@mui/material'
import { Inter } from '@next/font/google'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useCallback, useEffect } from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode'
import Swal from 'sweetalert2'
const inter = Inter({ subsets: ['latin'] })

const Navigation = (props: NavigationProps): JSX.Element => {
    const { data: session } = useSession()
    const setTheme = useAppStore(state => state.setTheme)

    const themeSetter = useCallback(() => {
        if (localStorage.getItem("theme") == "true") {
            setTheme(true)
        } else {
            setTheme(false)
        }
    }, [])

    useEffect(() => {
        themeSetter()
    }, [themeSetter])

    const handleChangeDarkMode = () => {
        if (localStorage.getItem("theme") == "true") {
            localStorage.setItem("theme", "false")
            setTheme(false)
        }
        else {
            localStorage.setItem("theme", "true")
            setTheme(true)
        }
    }
    const handleClickLogout = () => {
        Swal.fire({
            title: 'Logout',
            text: 'Do you want to logout?',
            icon: 'question',
            showConfirmButton: true,
            showCancelButton: true,
            allowOutsideClick: false,
            confirmButtonColor: '#1565c0'
        }).then(result => {
            if (result.isConfirmed) {
                signOut({
                    callbackUrl: `${window.location.origin}/login`
                })
            }
        })
    }
    const theme = useAppStore<boolean>(state => state.theme)

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
                        <DarkModeSwitch
                            style={{ marginBottom: '2rem' }}
                            checked={theme}
                            onChange={handleChangeDarkMode}
                            size={25}
                        />
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