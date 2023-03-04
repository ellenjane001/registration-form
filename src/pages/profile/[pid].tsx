import styles from '@/styles/Profile.module.css'
import { Avatar, Button, CircularProgress, Grid, Paper } from '@mui/material'
import { Inter } from '@next/font/google'
import { GetServerSidePropsContext } from 'next'
import { getSession, signOut, useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Header from '../../components/Header/Header'
const NavigationComponent = dynamic(
    () => import('@/components/Navigation/Navigation'), { loading: () => <CircularProgress /> }
)
const inter = Inter({ subsets: ['latin'] })

const Profile = () => {
    const [showComponent, setShowComponent] = useState(true);
    const { data: session } = useSession()

    useEffect(() => {
        setShowComponent(true);
    }, []);
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
                            <Grid item>
                                {showComponent && <NavigationComponent active="profile" />}
                            </Grid>
                            <Grid item md={12}>
                                <h1 className={inter.className}>Welcome {session && session.user?.name}</h1>
                            </Grid>
                            <Grid item>
                                <Avatar src={session.user?.image !== null ? session.user?.image : ''} sx={{ width: 56, height: 56 }} imgProps={{ referrerPolicy: 'no-referrer' }} />
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
}

export default Profile

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context)
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }

    return {
        props: { session }
    }
}