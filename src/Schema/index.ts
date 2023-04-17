import * as Yup from 'yup'
const phoneRegExp = /^[0]\s*(?:\+?(\d{3}))[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
export const RegistrationSchema = Yup.object().shape({
  username: Yup.string().trim().max(10, 'Must be less than 10 characters').min(4, 'Must be atleast 4 characters').required('Required'),
  password: Yup.string().trim().required('Password is required'),
  confirm_password: Yup.string().trim().test('password-match', 'Password must match', function (value) { return this.parent.password === value }).required('Required'),
  first_name: Yup.string().trim()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  middle_name: Yup.string().trim(),
  last_name: Yup.string().trim()
    .required('Required'),
  email: Yup.string().trim().email('Invalid email address').required('Required'),
  number: Yup.string().trim().matches(phoneRegExp, 'Phone number is not valid').required('Required'),
})

export const LoginSchema = Yup.object().shape({
  username: Yup.string().trim().max(10, 'Must be less than 10 characters').min(4, 'Must be atleast 4 characters').required('Required'),
  password: Yup.string().trim().required('Required')
})

export const ContactSchema = Yup.object().shape({
  name: Yup.string().trim().required('Required'),
  message: Yup.string().trim().required('Required'),
  email: Yup.string().trim().email('Invalid email address').required('Required')
})