import useAppStore from '@/utils/AppStore'
import { Grid, Switch, Typography } from '@mui/material'
import { Inter } from '@next/font/google'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect } from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode'
const inter = Inter({ subsets: ['latin'] })

interface Props {
    active: string
    id?: number
}

const Navigation = (props: Props) => {
    const { data: session } = useSession()
    const setTheme = useAppStore(state => state.setTheme)
    useEffect(() => {
        if (localStorage.getItem("theme") == "true") {
            setTheme(true)
        } else {
            setTheme(false)
        }
    }, [])
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
    const theme = useAppStore(state => state.theme)

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
                <Link href={`/profile/${props.id}`}>
                    <Typography variant='h6' className={inter.className} color={props.active == 'profile' ? '#1976d2' : 'null'}>Profile</Typography>
                </Link>
            </Grid>}
            {session && <Grid item>
                <Link href={`/users`}>
                    <Typography variant='h6' className={inter.className} color={props.active == 'users' ? '#1976d2' : 'null'}>Users</Typography>
                </Link>
            </Grid>}
            <Grid item>
                <DarkModeSwitch
                    style={{ marginBottom: '2rem' }}
                    checked={theme}
                    onChange={handleChangeDarkMode}
                    size={25}
                />
            </Grid>
        </Grid >
    )
}

export default Navigation