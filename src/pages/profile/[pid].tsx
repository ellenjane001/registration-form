import Layout from '@/components/Layout/Layout'
import styles from '@/styles/Profile.module.css'
import { RegistrationType } from '@/types'
import { Avatar, Button, CircularProgress, Grid, Paper, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { Inter } from '@next/font/google'
import axios from 'axios'
import cookie from 'cookie'
import { GetServerSidePropsContext } from 'next'
import { getSession, signOut, useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import TwoPeople from '../../assets/twopeople.png'
const NavigationComponent = dynamic(
    () => import('@/components/Navigation/Navigation'), { loading: () => <CircularProgress /> }
)
const inter = Inter({ subsets: ['latin'] })

const Profile = (props: { data: RegistrationType, user: { name: string, email: string, image: string | null, id: number }, expires: any }) => {

    const { data, user } = props
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
    if (session) {
        return (
            <>
                <Layout>
                    <Grid container direction="column" alignItems="center" spacing={3} alignContent="center">
                        <Grid item xs={12}>
                            {showComponent && <NavigationComponent active="profile" />}
                        </Grid>
                        <Grid item md={12}>
                            <h1 className={inter.className}>Welcome {session && session.user?.name}</h1>
                        </Grid>
                        <Grid item>
                            <Stack className={inter.className} alignItems="center" sx={{ textAlign: 'center' }} spacing={2}>
                                <p>You can view this page because you are signed in.
                                    Do you want to <Button variant="contained" className={inter.className} type='button' onClick={handleClickLogout}>Logout</Button> ?</p>
                            </Stack>
                        </Grid>
                        <Grid item>
                            <Paper variant="outlined" sx={{ padding: '20px' }}>
                                <Grid container direction="column" alignItems="center">
                                    <Grid item>
                                        <Typography variant="h4" className={inter.className}>
                                            Profile details
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Grid container alignItems="center" spacing={2}>
                                            <Grid item md={6} xs={12}>
                                                <Grid container spacing={2} direction="column">
                                                    <Grid item className={styles.avatar}>
                                                        <Avatar src={session.user?.image !== null ? session.user?.image : ''} sx={{ width: 56, height: 56 }} imgProps={{ referrerPolicy: 'no-referrer' }} />
                                                    </Grid>
                                                    <Grid item className={styles.font}>
                                                        <strong>Name:</strong> {user ? data ? `${data.first_name ?? ''} ${data.middle_name ?? ''} ${data.last_name ?? ''}` : user.name : ""}
                                                    </Grid>
                                                    <Grid item className={styles.font}>
                                                        <strong>Email:</strong> {user ? data ? data.email : user.email : ""}
                                                    </Grid>
                                                    <Grid item className={styles.font}>
                                                        <strong>Profile ID:</strong> {user ? data ? data.id : user.id : ""}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item md={6} xs={12} sx={{ textAlign: "center" }}>
                                                <Image src={TwoPeople} alt="static image" height={200} />
                                            </Grid>
                                            <Grid item> <a href="https://www.freepik.com/free-vector/back-back-concept-illustration_13850246.htm#query=employee&position=4&from_view=keyword&track=sph">Image by storyset</a> on Freepik</Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Layout>
            </>
        )
    }
}

export default Profile

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const session = await getSession(context) as any
        const { registration } = cookie.parse(context.req.headers.cookie!)

        if (!session) {
            return {
                redirect: {
                    destination: `${process.env.NEXTAUTH_URL}/login`,
                    permanent: false,
                },
            }
        }
        const result = await axios.post(`${process.env.NEXT_PUBLIC_API}users/get`, { cookie: registration, id: session?.user?.id })
        const { data } = result

        return {
            props: { ...session, ...data }
        }
        
    } catch (e) {
        return {
            props: {}
        }
    }

}