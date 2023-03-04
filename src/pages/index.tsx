import styles from '@/styles/Home.module.css'
import { Button, ButtonGroup, CircularProgress, Grid, Paper } from '@mui/material'
import { signIn, useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Hero from '../assets/Resume.gif'
import Header from '../components/Header/Header'

const NavigationComponent = dynamic(
  () => import('@/components/Navigation/Navigation'), { loading: () => <CircularProgress /> }
)
export default function Home() {
  const [showComponent, setShowComponent] = useState(true);

  useEffect(() => {
    setShowComponent(true);
  }, []);

  const { data: session } = useSession()

  const router = useRouter()
  const handleClickDisplayLogin = () => {
    signIn()
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
              {showComponent && <NavigationComponent active="home" />}
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
