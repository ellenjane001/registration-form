import styles from '@/styles/Home.module.css'
import { Button, ButtonGroup, Grid, Paper } from '@mui/material'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Hero from '../assets/Resume.gif'
import Header from './Components/Header/Header'
import Navigation from './Components/Navigation/Navigation'

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()
  const handleClickDisplayLogin = () => {
    signIn()
    router.push('/profile/1')
  }
  const handleClickDisplayRegister = () => {
    router.push('/registration')
  }

  return (
    <>
      <Header title='Home' />
      <main className={styles.main}>
        <Paper sx={{ padding: '1rem' }} elevation={0}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Navigation active="home" />
            </Grid>
            <Grid item>
              <Image src={Hero} alt="hero" priority />
            </Grid>
            {!session &&
              <Grid item>
                <ButtonGroup>
                  <Button variant='contained' color='primary' onClick={handleClickDisplayLogin}>Login</Button>
                  <Button variant='contained' color='secondary' onClick={handleClickDisplayRegister}>Register</Button>
                </ButtonGroup>
              </Grid>}

            <Grid item>

            </Grid>
          </Grid>
        </Paper>

      </main>
    </>
  )
}
