import { RegistrationSchema } from '@/Schema'
import { useFormik } from 'formik'
import { useState } from 'react'


const Registration = () => {
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
        <div>Registration</div>
    )
}

export default Registration