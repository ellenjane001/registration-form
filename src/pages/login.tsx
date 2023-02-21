import styles from '@/styles/Login.module.css'
import { Home, Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Paper, Stack, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import * as Yup from 'yup'
import Header from './Components/Header/Header'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })


const login = () => {
    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const validationSchema = Yup.object().shape({
        username: Yup.string(),
        password: Yup.string()
    })
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            //   const fetchAPI = async (values) => {

            //   }
            //   fetchAPI(values)
            formik.resetForm()
            router.push('./profile')
        },
    })


    const handleClickDisplayRegister = () => {
        router.push('./registration')
    }
    const handleClickReturnHome=()=>{
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
                        <Grid item>
                            <h1 className={inter.className} style={{ textAlign: "center" }}>Sign in</h1>
                        </Grid>
                        <Grid item sx={{ textAlign: 'center' }} md={12}>
                            <form onSubmit={formik.handleSubmit} style={{ padding: "10px" }}>
                                <Grid container direction="column" spacing={1}>
                                    <Grid item>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="username">Username</InputLabel>
                                            <OutlinedInput id='username' name="username" label="Username" onChange={formik.handleChange} />
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


                    </Grid>

                </Paper>

            </main>
        </>
    )
}

export default login