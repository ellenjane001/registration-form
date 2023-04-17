import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../Templates/Layout/Layout'
import NavGrid from '../NavGrid/NavGrid'
import { Button, CircularProgress, FormControl, Grid, InputLabel, OutlinedInput, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import { Inter } from '@next/font/google'
import { useFormik } from 'formik'
import { ContactType, propsUserDataType, userDataType } from '@/types'
import { ContactSchema } from '@/Schema'
import Swal from 'sweetalert2'
import axios from 'axios'
import GridWithFormControl from '../GridWithFormControl'
import Error from '../Error/Error'
const NavigationComponent = dynamic(
    () => import('@/components/Navigation/Navigation'), { loading: () => <CircularProgress /> }
)

const inter = Inter({ subsets: ['latin'] })

const Contact = ({ user }: propsUserDataType) => {
    const [userData, setUserData] = useState<userDataType>({
        name: '', email: '', id: 0
    })
    const [showComponent, setShowComponent] = useState<boolean>(true);

    const initialValues = {
        name: userData ? userData.name : '',
        message: '',
        email: userData ? userData.email : ''
    }

    const userSetter = useCallback(() => {
        if (user) {
            setUserData({ ...user })
        }
    }, [])

    useEffect(() => {
        userSetter()
        setShowComponent(true);
    }, [userSetter])

    const formik = useFormik<ContactType>({
        initialValues: initialValues,
        validationSchema: ContactSchema,
        enableReinitialize: true,
        onSubmit: values => {
            const fetchAPI = async (values: ContactType) => {
                try {
                    axios.post('api/contact/send', { ...values }).then((response) => {
                        if (response.status === 200) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Message successfully sent',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            formik.resetForm()
                        }
                    })
                } catch (e) {
                    console.error(e)
                }
            }
            fetchAPI(values)
        },
    })
    return (
        <Layout>
            <NavGrid>
                {showComponent && <NavigationComponent active="contact" id={userData.id} />}
            </NavGrid>
            <Grid item md={12}>
                <Typography variant="h4" className={inter.className} sx={{ textAlign: "center" }}>
                    Get in touch!
                </Typography>
            </Grid>
            <Grid item md={12}>
                <Grid container direction='column' alignItems="center" spacing={1}>
                    <Grid item>
                        <Typography variant='h6'>Contact Form</Typography>
                    </Grid>
                    <Grid item>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container direction="column" spacing={2}>
                                <GridWithFormControl name="name" handleChange={formik.handleChange} value={formik.values.name} label="Your Name" message={formik.errors.name} checker={formik.touched.name && formik.errors.name} handleBlur={formik.handleBlur} md={12} />
                                <GridWithFormControl name="email" handleChange={formik.handleChange} value={formik.values.email} label="Email" message={formik.errors.email} checker={formik.touched.email && formik.errors.email} handleBlur={formik.handleBlur} md={12} />
                                <Grid item>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor='message'>Message</InputLabel>
                                        <OutlinedInput id='message' name='message' label="Message" onChange={formik.handleChange} value={formik.values.message} multiline rows={4} onBlur={formik.handleBlur} />
                                        <Error message={formik.errors.message} checker={formik.touched.message && formik.errors.message} />
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <Button variant='contained' size='large' type="submit" fullWidth>Send</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Grid>

        </Layout>

    )
}

export default Contact