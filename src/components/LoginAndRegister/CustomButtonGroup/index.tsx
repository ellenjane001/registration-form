import { Button, ButtonGroup, Grid } from '@mui/material'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'

const CustomButtonGroup = (): JSX.Element => {
    const router = useRouter()
    const handleClickDisplayLogin = () => {
        signIn()
    }
    const handleClickDisplayRegister = () => {
        router.push('/registration')
    }
    return (
        <Grid item>
            <ButtonGroup>
                <Button variant='contained' color='primary' onClick={handleClickDisplayLogin}>Login</Button>
                <Button variant='contained' color='secondary' onClick={handleClickDisplayRegister}>Register</Button>
            </ButtonGroup>
        </Grid>
    )
}

export default CustomButtonGroup