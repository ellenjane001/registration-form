import { useFormik } from 'formik'
import React, { useState, useEffect } from 'react'
import StyledPaper from '../StyledComponents/StyledPaper/StyledPaper'
import { Button, CircularProgress, Grid, Link, Stack, Typography } from '@mui/material'
import CustomHeader from '../LoginAndRegister/Header/CustomHeader'
import { LoginType } from '@/types'
import { LoginSchema } from '@/Schema'
import { getCookie, setCookie } from 'cookies-next'
import { swalWithErrorIcon, swalwithWarningIcon } from '@/utils/swal'
import { getSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { Inter } from '@next/font/google'
import GoogleButton from 'react-google-button'
import useAppStore from '@/utils/AppStore'
const inter = Inter({ subsets: ['latin'] })

const GridWithFormControlComponent = dynamic(() => import('@/components/GridWithFormControl/'), { loading: () => <Grid item><CircularProgress /></Grid> })
const GridItemWithPasswordComponent = dynamic(() => import('@/components/GridItemWithPassword/GridItemWithPassword'), { loading: () => <Grid item><CircularProgress /></Grid> })

const Login = (): JSX.Element => {
    const [failedLogin, setFailedLogin] = useState<number>(3)
    const [allowLogin, setAllowLogin] = useState<boolean>(true)
    const [showComponent, setShowComponent] = useState<boolean>(false)
    const router = useRouter()
    const setTheme = useAppStore(state => state.setTheme)

    useEffect(() => {
        setShowComponent(true)
        if (localStorage.getItem("theme") == "true") {
            setTheme(true)
        }
    }, [])
    const handleClickDisplayRegister = () => {
        router.push('./registration')
    }
    const formik = useFormik<LoginType>({
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
    return (
        <StyledPaper>
            <Grid container direction="column">
                <CustomHeader text="Sign In" />
                <Grid item sx={{ textAlign: 'center' }} md={12}>
                    <form onSubmit={formik.handleSubmit} style={{ padding: "10px" }} action="/api/auth/callback/credentials">
                        <Grid container direction="column" spacing={1}>
                            {showComponent && <>
                                <GridWithFormControlComponent md={4} name="username" handleChange={formik.handleChange} value={formik.values.username} handleBlur={formik.handleBlur} label="Username" message={formik.errors.username} checker={formik.touched.username && formik.errors.username} />
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
                        <Button variant='contained' color='primary' type="submit">Login</Button>
                    </form>
                </Grid>
                <Grid item sx={{ textAlign: 'center', paddingBottom: '10px' }} className={inter.className}> or </Grid>
                <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid container direction="column" alignItems="center" spacing={1}>
                        <Grid item>
                            <GoogleButton
                                onClick={() => signIn('google', { redirect: false })}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </StyledPaper>
    )
}

export default Login