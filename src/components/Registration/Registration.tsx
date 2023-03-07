import { RegistrationSchema } from '@/schema'
import { RegistrationType } from '@/types'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, ButtonGroup, FormControl, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Paper, Stack, Typography } from '@mui/material'
import { Inter } from '@next/font/google'
import axios from 'axios'
import { useFormik } from 'formik'
import { signIn } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Swal from 'sweetalert2'
import Error from '../Error/Error'
import FormItem from '../FormItem/FormItem'
import GridItemWithPassword from '../GridItemWithPassword/GridItemWithPassword'
import LoginAndRegHeader from '../LoginAndRegHeader/LoginAndRegHeader'
const PasswordChecklist = dynamic(() => import('react-password-checklist'), {
  ssr: false,
});

const inter = Inter({ subsets: ['latin'] })


const Registration = () => {
  const [showPassword, setShowPassword] = useState(false)
  const initialValues = {
    username: '',
    password: '',
    confirm_password: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    number: ''
  }

  const router = useRouter()

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: RegistrationSchema,
    enableReinitialize: true,
    onSubmit: values => {
      const fetchAPI = async (values: RegistrationType) => {
        try {
          axios.post('api/users/register', { ...values }).then((response) => {
            if (response.status === 200) {
              Swal.fire({
                icon: 'success',
                title: 'Congratulations',
                text: 'User has been successfully registered',
                showConfirmButton: false,
                timer: 1500
              })
              formik.resetForm()
              router.push('/')
            }
          });
        } catch (e) {
          console.error(e)
        }
      }
      fetchAPI(values)
    },
  })
  const items = [
    { name: 'last_name', value: formik.values.last_name, handleChangeFormik: formik.handleChange, label: 'Last Name', error: formik.errors.last_name, touched: formik.touched.last_name },
    { name: 'email', value: formik.values.email, handleChangeFormik: formik.handleChange, label: 'Email Address', error: formik.errors.email, touched: formik.touched.email },
    { name: 'number', value: formik.values.number, handleChangeFormik: formik.handleChange, label: 'Mobile Number', error: formik.errors.number, touched: formik.touched.number },
    { name: 'username', value: formik.values.username, handleChangeFormik: formik.handleChange, label: 'Username', error: formik.errors.username, touched: formik.touched.username }
  ]

  const handleClickChangeToLogin = () => {
    signIn()
  }
  return (
    <>
      <Paper elevation={3} sx={{ padding: '20px' }}>
        <Grid container>
          <LoginAndRegHeader text="Registration Form" />
          <form onSubmit={formik.handleSubmit} >
            <Grid container alignItems="center" justifyContent="center" sx={{ padding: '10px' }} spacing={2}>
              {/* firstname */}
              <Grid item md={4} xs={12}>
                <FormControl fullWidth>
                  <FormItem name='first_name' value={formik.values.first_name} handleChange={formik.handleChange} label="First Name" />
                  <Error message={formik.errors.first_name} checker={formik.touched.first_name && formik.errors.first_name} />
                </FormControl>
              </Grid>
              {/* middle name */}
              <Grid item md={4} xs={12}>
                <FormControl fullWidth>
                  <FormItem name='middle_name' value={formik.values.middle_name} handleChange={formik.handleChange} label="Middle Name (Optional)" />
                </FormControl>
              </Grid>
              {items.map((item, i) => {
                const { name, value, handleChangeFormik, label, error, touched } = item
                return (<Grid item md={4} xs={12} key={i}>
                  <FormControl fullWidth>
                    <FormItem name={name} value={value} handleChange={handleChangeFormik} label={label} />
                    <Error message={error} checker={touched && error} />
                  </FormControl>
                </Grid>)
              })}
              {/* password */}
              <Grid item md={6} xs={12}>
                <Grid container direction="column" spacing={2}>
                  <GridItemWithPassword handleChange={formik.handleChange} value={formik.values.password} message={formik.errors.password} checker={formik.touched.password && formik.errors.password} id="password" label='Password' name='password' />
                  {/* Confirm password */}
                  <GridItemWithPassword handleChange={formik.handleChange} value={formik.values.confirm_password} message={formik.errors.confirm_password} checker={formik.touched.confirm_password && formik.errors.confirm_password} name="confirm_password" label="Confirm Password" id="confirm_password" />
                </Grid>
              </Grid>
              {/* password checklist */}
              <Grid item md={6}>
                <PasswordChecklist style={{ fontFamily: 'Helvetica' }}
                  rules={["maxLength", "minLength", "specialChar", "number", "capital", "match"]}
                  value={formik.values.password}
                  minLength={6}
                  maxLength={15}
                  valueAgain={formik.values.confirm_password}
                />
              </Grid>
              {/* buttons */}
              <Grid item md={12}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item md={6} xs={12} >
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="subtitle2" className={inter.className}>
                        Already have an account?
                      </Typography>
                      <Link component="button" className={inter.className} type='button' onClick={handleClickChangeToLogin}>Login</Link>
                    </Stack>
                  </Grid>
                  <Grid item md={6} xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <ButtonGroup>
                      <Button variant='contained' color="warning" type='button' onClick={e => formik.resetForm()}>Clear</Button>
                      <Button variant='contained' color="primary" type='submit'>Register</Button>
                    </ButtonGroup>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Paper >
    </>
  )
}

export default Registration