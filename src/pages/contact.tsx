import Error from '@/components/Error/Error'
import GridWithFormControl from '@/components/GridWithFormControl/GridWithFormControl'
import Layout from '@/components/Layout/Layout'
import { ContactSchema } from '@/schema/index'
import { ContactType, RegistrationType } from '@/types'
import { Button, CircularProgress, FormControl, Grid, InputLabel, OutlinedInput, Typography } from '@mui/material'
import { Inter } from '@next/font/google'
import axios from 'axios'
import cookie from 'cookie'
import { useFormik } from 'formik'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const NavigationComponent = dynamic(
  () => import('@/components/Navigation/Navigation'), { loading: () => <CircularProgress /> }
)

const inter = Inter({ subsets: ['latin'] })
const Contact = ({ data, user }: { data: RegistrationType, user: { name: string, email: string, id: number } }) => {
  const [userData, setUserData] = useState({
    name: '', email: ''
  })
  const [showComponent, setShowComponent] = useState(true);

  const initialValues = {
    name: userData ? userData.name : '',
    message: '',
    email: userData ? userData.email : '',
    number: data ? data.number : ''
  }
  useEffect(() => {
    const userSetter = () => {
      if (user) {
        setUserData({ ...user })
      }
    }
    userSetter()
  }, [])


  useEffect(() => {
    setShowComponent(true);
  }, []);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ContactSchema,
    enableReinitialize: true,
    onSubmit: values => {
      const fetchAPI = async (values: ContactType) => {
        try {
          axios.post('api/contact/send', { ...values }).then((response) => {
            console.log(response.data.message)
            if (response.status === 200) {
              Swal.fire({
                icon: 'success',
                title: 'Message successfully sent',
                showConfirmButton: false,
                timer: 1500
              })
              formik.resetForm()
            }
          });
        } catch (e) {
          console.error(e)
        }
      }
      fetchAPI(values)
    },
  })
  return (
    <>
      <Layout>
        <Grid container direction="column" spacing={2}>
          <Grid item md={12}>
            {showComponent && <NavigationComponent active="contact" id={user.id} />}
          </Grid>
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
                    <Grid item>
                      <Grid container spacing={2}>
                        <Grid item md={6} xs={12}>
                          <Grid container direction="column" spacing={2}>
                            <GridWithFormControl name="name" handleChange={formik.handleChange} value={formik.values.name} label="Your Name" message={formik.errors.name} checker={formik.touched.name && formik.errors.name} />
                            <GridWithFormControl name="email" handleChange={formik.handleChange} value={formik.values.email} label="Email" message={formik.errors.email} checker={formik.touched.email && formik.errors.email} />
                            <GridWithFormControl name="number" handleChange={formik.handleChange} value={formik.values.number} label="Phone Number" message={formik.errors.number} checker={formik.touched.number && formik.errors.number} />
                          </Grid>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <FormControl fullWidth>
                            <InputLabel htmlFor='message'>Message</InputLabel>
                            <OutlinedInput id='message' name='message' label="Message" onChange={formik.handleChange} value={formik.values.message} multiline rows={7} />
                            <Error message={formik.errors.message} checker={formik.touched.message && formik.errors.message} />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Button variant='contained' size='large' type="submit" fullWidth>Send</Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

  try {
    const session = await getSession(context) as any
    const { registration } = cookie.parse(context.req.headers.cookie!)
    const result = await axios.post(`${process.env.NEXT_PUBLIC_API}users/get`, { cookie: registration, id: session?.user?.id })
    return {
      props: { ...session, ...result.data }
    }
  } catch (error) {
    console.error(error)
    return { props: {} }
  }

}

export default Contact