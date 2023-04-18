import useAppStore from '@/utils/AppStore'
import { swalRegistrationSuccess, swalWithErrorIcon } from '@/utils/swal'
import { Button, ButtonGroup, CircularProgress, FormControl, FormHelperText, Grid, Link, Stack, Typography } from '@mui/material'
import { Inter } from '@next/font/google'
import axios from 'axios'
import { useFormik } from 'formik'
import { signIn } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { RegistrationSchema } from '../../Schema/index'
import { RegistrationType } from '../../types/index'
import FormItem from '../FormItem/FormItem'
import GridItemWithPassword from '../GridItemWithPassword/GridItemWithPassword'
import GridWithFormControl from '../GridWithFormControl/'
import CustomHeader from '../LoginAndRegister/Header/CustomHeader'

const PasswordChecklist = dynamic(() => import('react-password-checklist'), {
  ssr: false,
});

const inter = Inter({ subsets: ['latin'] })
const StyledPaperComponent = dynamic(() => import('@/components/StyledComponents').then(index => index.StyledPaper2), { loading: () => <CircularProgress /> })

const RegistrationComponent = (): JSX.Element => {
  const theme = useAppStore<boolean>(state => state.theme)
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

  const formik = useFormik<RegistrationType>({
    initialValues: initialValues,
    validationSchema: RegistrationSchema,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: values => {
      const fetchAPI = async (values: RegistrationType) => {
        try {
          let response = await axios.post('api/users/register', { ...values })
          if (response.status === 200) {
            swalRegistrationSuccess({theme})
            formik.resetForm()
            router.push('/')
          }
        } catch (e: any) {
          console.error(e.message)
          swalWithErrorIcon({ message: "Bad Request! Please enter different credentials", theme: theme })
        }
      }
      fetchAPI(values)
    },
  })
  const items = [
    { name: 'last_name', value: formik.values.last_name, handleChangeFormik: formik.handleChange, label: 'Last Name', error: formik.errors.last_name, touched: formik.touched.last_name, handleBlurFormik: formik.handleBlur },
    { name: 'email', value: formik.values.email, handleChangeFormik: formik.handleChange, label: 'Email Address', error: formik.errors.email, touched: formik.touched.email, handleBlurFormik: formik.handleBlur },
    { name: 'number', value: formik.values.number, handleChangeFormik: formik.handleChange, label: 'Mobile Number', error: formik.errors.number, touched: formik.touched.number, handleBlurFormik: formik.handleBlur },
    { name: 'username', value: formik.values.username, handleChangeFormik: formik.handleChange, label: 'Username', error: formik.errors.username, touched: formik.touched.username, handleBlurFormik: formik.handleBlur }
  ]

  const handleClickChangeToLogin = () => {
    signIn()
  }

  return (
    <StyledPaperComponent>
      <Grid container spacing={2}>
        <CustomHeader text="Registration Form" />
        <form onSubmit={formik.handleSubmit} >
          <Grid container alignItems="center" justifyContent="center" sx={{ padding: '10px' }} spacing={2}>
            {/* firstname */}
            <GridWithFormControl name='first_name' value={formik.values.first_name} handleChange={formik.handleChange} handleBlur={formik.handleBlur} label='First Name' message={formik
              .errors.first_name} checker={formik.touched.first_name && formik.errors.first_name} md={4} />
            {/* middle name */}
            <Grid item md={4} xs={12}>
              <FormControl fullWidth>
                <FormItem name='middle_name' value={formik.values.middle_name} handleChange={formik.handleChange} label="Middle Name" />
                <FormHelperText>Optional</FormHelperText>
              </FormControl>
            </Grid>
            {items.map((item, i) => {
              const { name, value, handleChangeFormik, label, error, touched, handleBlurFormik } = item
              return (
                <GridWithFormControl key={i} name={name} handleBlur={handleBlurFormik} handleChange={handleChangeFormik} label={label} checker={touched && error} md={4} value={value} message={error} />
              )
            })}
            <Grid item md={12} xs={12}>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                  <Grid container direction="column" spacing={2} justifyContent="center">
                    {/* password */}
                    <GridItemWithPassword handleChange={formik.handleChange} value={formik.values.password} message={formik.errors.password} checker={formik.touched.password && formik.errors.password} id="password" label='Password' name='password' />
                    {/* Confirm password */}
                    <GridItemWithPassword handleChange={formik.handleChange} value={formik.values.confirm_password} message={formik.errors.confirm_password} checker={formik.touched.confirm_password && formik.errors.confirm_password} name="confirm_password" label="Confirm Password" id="confirm_password" />
                  </Grid>
                </Grid>
                {/* password checklist */}
                <Grid item md={6} xs={12}>
                  <PasswordChecklist style={{ fontFamily: 'Helvetica' }}
                    rules={["maxLength", "minLength", "specialChar", "number", "capital", "match"]}
                    value={formik.values.password}
                    minLength={6}
                    maxLength={15}
                    valueAgain={formik.values.confirm_password}
                  />
                </Grid>
              </Grid>
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
    </StyledPaperComponent>
  )
}

export default RegistrationComponent