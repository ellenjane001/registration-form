import styles from '@/styles/Profile.module.css'
import { Avatar, Button, Grid, Paper } from '@mui/material'
import { Inter } from '@next/font/google'
import { GetServerSidePropsContext } from 'next'
import { getSession, signOut, useSession } from 'next-auth/react'
import Swal from 'sweetalert2'
import Header from '../Components/Header/Header'
import Navigation from '../Components/Navigation/Navigation'

const inter = Inter({ subsets: ['latin'] })

const Profile = () => {
    const { data: session } = useSession()
    const handleClickLogout = () => {
        Swal.fire({
            title: 'Logout',
            text: 'Do you want to logout?',
            icon: 'question',
            showConfirmButton: true,
        }).then(confirm => {
            if (confirm) {
                signOut({
                    callbackUrl: `${window.location.origin}/login`
                })
            }
        })
    }
    if (session) {
        return (
            <>
                <Header />
                <main className={styles.main}>
                    <Paper sx={{ padding: '30px' }} elevation={0}>
                        <Grid container direction="column" alignItems="center" spacing={3}>
                            <Navigation active="profile" />
                            <Grid item md={12}>
                                <h1 className={inter.className}>Welcome {session && session.user?.name}</h1>
                            </Grid>
                            <Grid item>
                                <Avatar src={session.user?.image !== null ? session.user?.image : ''} sx={{ width: 56, height: 56 }} imgProps={{referrerPolicy:'no-referrer'}}/>
                            </Grid>
                            <Grid item>
                                <p className={inter.className}>You can view this page because you are signed in.</p>
                            </Grid>
                            <Grid item>
                                <Button variant='contained' onClick={handleClickLogout}>Logout</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </main>
            </>
        )
    }
    return <main className={styles.main}>Access Denied</main>
}

export default Profile

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context)
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: { session }
    }
}