import { LoginSchema } from '@/schema'
import styles from '@/styles/Login.module.css'
import { LoginType } from '@/types'
import { Home, Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Paper, Stack, Typography } from '@mui/material'
import { Inter } from '@next/font/google'
import axios from 'axios'
import { useFormik } from 'formik'
import type { InferGetServerSidePropsType, GetServerSidePropsContext } from "next"
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Error from './Components/Error/Error'
import FormItem from './Components/FormItem/FormItem'
import Header from './Components/Header/Header'
import SignIn from './Components/Login/SignIn/SignIn'
import { getCsrfToken } from "next-auth/react"
const inter = Inter({ subsets: ['latin'] })

const login = ({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
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
            signIn('credentials', { values })
            // alert(JSON.stringify(values, null, 2));
            // const fetchAPI = async (values: LoginType) => {
            //     try {
            //         axios.post('api/users/login', { ...values }).then((response) => {
            //             if (response.status === 200) {
            //                 console.log(response)
            //                 // router.push('./profile/1')

            //                 // Swal.fire({
            //                 //   icon: 'success',
            //                 //   title: 'Congratulations',
            //                 //   text: 'User has been successfully registered',
            //                 //   showConfirmButton: false,
            //                 //   timer: 1500
            //                 // })
            //                 // formik.resetForm()
            //             }
            //         });
            //     } catch (e) {
            //         console.error(e)
            //     }
            // }
            // fetchAPI(values)
            // formik.resetForm()
        },
    })


    const handleClickDisplayRegister = () => {
        router.push('./registration')
    }
    const handleClickReturnHome = () => {
        router.push('./')
    }
    return (
        <>
            <Header />
            <main className={styles.main}>
                <Paper sx={{ padding: '20px' }}>
                    <Grid container direction="column">
                        <Grid item>
                            <IconButton onClick={handleClickReturnHome}>
                                <Home />
                            </IconButton>
                        </Grid>
                        <SignIn />
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

                                <Button variant='contained' color='primary' type="submit">Login</Button>
                            </form>

                        </Grid>
                        <Grid item sx={{ textAlign: 'center' }}>
                            <Button variant="contained" color="inherit" onClick={() => signIn("google", {
                                callbackUrl: `${window.location.origin}/profile/1`,
                            })}>Sign in with Google</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </main>
        </>
    )
}

export default login

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    }
}