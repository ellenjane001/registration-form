import styles from '@/styles/Home.module.css'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, ButtonGroup, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { Inter } from '@next/font/google'
import { useFormik } from 'formik'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { RegistrationSchema } from '../Schema/'
import FormItem from './Components/FormItem'
import Header from './Components/Header'
import Title from './Components/Title'
const PasswordChecklist = dynamic(() => import('react-password-checklist'), {
  ssr: false,
});

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  type fetchFunction = (values: {
    username: string,
    password: string,
    confirm_password: string,
    first_name: string,
    middle_name: string,
    last_name: string,
    email: string,
    number: string
  }) => void
  const [showPassword, setShowPassword] = useState(false)
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirm_password: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      number: ''
    },
    validationSchema: RegistrationSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      const fetchAPI = async (values: {
        username: string,
        password: string,
        confirm_password: string,
        first_name: string,
        middle_name: string,
        last_name: string,
        email: string,
        number: string
      }) => {
        fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          body: JSON.stringify(
            values
          ),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then((response) => response.json())
          .then((json) => console.log(json));
      }
      fetchAPI(values)
      formik.resetForm()
    },
  })
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Paper elevation={3} sx={{ padding: '20px' }}>
          <Grid container>
            <Title className={inter.className} />
            <form onSubmit={formik.handleSubmit} >
              <Grid container alignItems="center" justifyContent="center" sx={{ padding: '10px' }} spacing={2}>
                {/* firstname */}
                <Grid item md={4}>
                  <FormControl fullWidth>
                    <FormItem name='first_name' value={formik.values.first_name} handleChange={formik.handleChange} label="First Name" />
                    {formik.touched.first_name && formik.errors.first_name ? (
                      <FormHelperText error>{formik.errors.first_name}</FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>
                {/* middle name */}
                <Grid item md={4}>
                  <FormControl fullWidth>
                    <FormItem name='middle_name' value={formik.values.middle_name} handleChange={formik.handleChange} label="Middle Name (Optional)" />
                    {formik.touched.middle_name && formik.errors.middle_name ? (
                      <FormHelperText error>{formik.errors.middle_name}</FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>
                {/* last name */}
                <Grid item md={4}>
                  <FormControl fullWidth>
                    <FormItem name='last_name' value={formik.values.last_name} handleChange={formik.handleChange} label="Last Name" />
                    {formik.touched.last_name && formik.errors.last_name ? (
                      <FormHelperText error>{formik.errors.last_name}</FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>
                {/* email address */}
                <Grid item md={12}>
                  <FormControl fullWidth>
                    <FormItem name='email' value={formik.values.email} handleChange={formik.handleChange} label="Email Address" />
                    {formik.touched.email && formik.errors.email ? (
                      <FormHelperText error>{formik.errors.email}</FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>
                {/* mobile number */}
                <Grid item md={12}>
                  <FormControl fullWidth>
                    <FormItem name='number' value={formik.values.number} handleChange={formik.handleChange} label="Mobile Number" />
                    {formik.touched.number && formik.errors.number ? (
                      <FormHelperText error>{formik.errors.number}</FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>
                {/* username */}
                <Grid item md={12}>
                  <FormControl fullWidth>
                    <FormItem name='username' value={formik.values.username} handleChange={formik.handleChange} label="Username" />
                    {formik.touched.username && formik.errors.username ? (
                      <FormHelperText error>{formik.errors.username}</FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>
                {/* password */}
                <Grid item md={6}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item md={6}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput label="Password" name="password" id="password" fullWidth onChange={formik.handleChange} value={formik.values.password} type={showPassword ? 'text' : 'password'} endAdornment={
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
                        {formik.touched.password && formik.errors.password ? (
                          <FormHelperText error>{formik.errors.password}</FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>
                    {/* Confirm password */}
                    <Grid item md={6}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="confirm_password">Confirm Password</InputLabel>
                        <OutlinedInput label="Confirm Password" name="confirm_password" id="confirm_password" fullWidth onChange={formik.handleChange} value={formik.values.confirm_password} type={showPassword ? 'text' : 'password'} endAdornment={
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
                        {formik.touched.confirm_password && formik.errors.confirm_password ? (
                          <FormHelperText error>{formik.errors.confirm_password}</FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>
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
                <Grid item md={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <ButtonGroup>
                    <Button variant='contained' color="warning" type='button' onClick={e => formik.resetForm()}>Clear</Button>
                    <Button variant='contained' color="primary" type='submit'>Register</Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Paper >
      </main >
    </>
  )
}
