import LoginAndRegHeader from '@/components/LoginAndRegHeader/LoginAndRegHeader'
import { LoginSchema } from '../Schema/index'
import styles from '@/styles/Login.module.css'
import { LoginType } from '@/types'
import { swalWithErrorIcon, swalwithWarningIcon } from '@/utils/swal'
import { Button, CircularProgress, Grid, Link, Paper, Stack, Typography } from '@mui/material'
import { Inter } from '@next/font/google'
import { getCookie, setCookie } from 'cookies-next'
import { useFormik } from 'formik'
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { getCsrfToken, getSession, signIn } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import GoogleButton from 'react-google-button'
import Header from '../components/Header/Header'
const inter = Inter({ subsets: ['latin'] })

const GridWithFormControlComponent = dynamic(() => import('@/components/GridWithFormControl/GridWithFormControl'), { loading: () => <Grid item><CircularProgress /></Grid> })
const GridItemWithPasswordComponent = dynamic(() => import('@/components/GridItemWithPassword/GridItemWithPassword'), { loading: () => <Grid item><CircularProgress /></Grid> })
const Login = ({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [failedLogin, setFailedLogin] = useState<number>(3)
    const [allowLogin, setAllowLogin] = useState<boolean>(true)
    const [showComponent, setShowComponent] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setShowComponent(true)
    }, [])


    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: LoginSchema,
        onSubmit: values => {
            const login = async (values: LoginType) => {
                const { username } = values
                if (getCookie('locked')) {
                    if (username === getCookie('locked')) {
                        setAllowLogin(false)
                        swalWithErrorIcon({ message: `Your Account is disabled! Please login again after 30 minutes` })
                    }
                } else {
                    setAllowLogin(true)
                }

                if (allowLogin) {
                    let response = await signIn('credentials', { ...values, redirect: false })
                    if (response) {
                        if (response?.status === 200) {
                            const session = await getSession() as any
                            router.push(`/profile/${session?.user?.id}`)
                            formik.resetForm()
                            setFailedLogin(3)
                        } else if (response?.status === 401) {
                            const currentTime = new Date();
                            const expireTime = new Date(currentTime.getTime() + 20 * 1000); //20 seconds
                            if (failedLogin > 0) {
                                swalwithWarningIcon({ message: 'Please enter a different account or click the register link', title: 'Account not Found' })
                                setFailedLogin(prevFailedLogin => prevFailedLogin - 1)
                            }
                            else if (failedLogin === 0) {
                                setCookie('locked', username, { expires: expireTime })
                                swalWithErrorIcon({ message: `Your Account has been disabled! Please login again after 30 minutes` })
                                setAllowLogin(false)
                            }
                        }
                    }
                }
            }
            login(values)
        }
    })
    const handleClickDisplayRegister = () => {
        router.push('./registration')
    }

    return (
        <>
            <Header />
            <main className={styles.main}>
                <Paper sx={{ padding: '20px' }}>
                    <Grid container direction="column">
                        <LoginAndRegHeader text="Sign In" />
                        <Grid item sx={{ textAlign: 'center' }} md={12}>
                            <form onSubmit={formik.handleSubmit} style={{ padding: "10px" }} action="/api/auth/callback/credentials">
                                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                                <Grid container direction="column" spacing={1}>
                                    {showComponent && <>
                                        <GridWithFormControlComponent name="username" handleChange={formik.handleChange} value={formik.values.username} label="Username" message={formik.errors.username} checker={formik.touched.username && formik.errors.username} />
                                        <GridItemWithPasswordComponent handleChange={formik.handleChange} value={formik.values.password} message={formik.errors.password} checker={formik.touched.password && formik.errors.password} id="passzword" name='password' label='Password' />
                                    </>}
                                </Grid>
                                <Stack direction="row" justifyContent="center" spacing={1} sx={{ padding: '10px' }}>
                                    <Typography variant='subtitle2' className={inter.className} >
                                        Don&#39;t have an account ?
                                    </Typography>
                                    <Link component="button" type='button' onClick={handleClickDisplayRegister} className={inter.className}>
                                        Register
                                    </Link>
                                </Stack>
                                <Button variant='contained' color='inherit' type="submit">Login</Button>
                            </form>
                        </Grid>
                        <Grid item sx={{ textAlign: 'center', paddingBottom: '10px' }} className={inter.className}> or </Grid>
                        <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                            <GoogleButton
                                onClick={() => signIn('google', { redirect: false })}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </main>
        </>
    )
}

export default Login

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context) as any
    if (session) {
        return {
            redirect: {
                destination: `/profile/${session.user?.id}`,
                permanent: false,
            },
        }
    }

    return {
        props: {
            csrfToken: await getCsrfToken(context),
            session
        },
    }
}