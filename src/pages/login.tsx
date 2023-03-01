import { LoginSchema } from '@/schema'
import styles from '@/styles/Login.module.css'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Paper, Stack, Typography } from '@mui/material'
import { Inter } from '@next/font/google'
import { useFormik } from 'formik'
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { getCsrfToken, getSession, signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import GoogleButton from 'react-google-button'
import Error from './Components/Error/Error'
import FormItem from './Components/FormItem/FormItem'
import Header from './Components/Header/Header'
import LoginAndRegHeader from './Components/LoginAndRegHeader/LoginAndRegHeader'
const inter = Inter({ subsets: ['latin'] })

const login = ({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [failedLogin, setFailedLogin] = useState(0)
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: LoginSchema,
        onSubmit: values => {
            const login = async (values: { username: string, password: string }) => {
                try {
                    await signIn('credentials', { ...values, redirect: false })
                    const session = await getSession()
                    router.push(`/profile/${session?.user?.id}`)
                    formik.resetForm()
                } catch (error) {
                    console.log(error)
                }
            }
            login(values)
        },
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
                                    <Grid item>
                                        <FormControl fullWidth>
                                            <FormItem name="username" handleChange={formik.handleChange} value={formik.values.username} label="Username"></FormItem>
                                            <Error message={formik.errors.username} checker={formik.touched.username && formik.errors.username} />
                                        </FormControl>
                                    </Grid>
                                    <Grid item>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="password">Password</InputLabel>
                                            <OutlinedInput id='password' name="password" label="Password" onChange={formik.handleChange} type={showPassword ? 'text' : 'password'} endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            } />
                                            <Error message={formik.errors.password} checker={formik.touched.password && formik.errors.password} />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Stack direction="row" justifyContent="center" spacing={1} sx={{ padding: '10px' }}>
                                    <Typography variant='subtitle2' className={inter.className} >
                                        Don't have an account ?
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

export default login

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context)
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