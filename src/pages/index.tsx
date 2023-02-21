import styles from '@/styles/Home.module.css'
import { Button, Grid, Paper, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Hero from '../assets/Resume.gif'
import Header from './Components/Header/Header'
import { Inter } from '@next/font/google'
import Navigation from './Components/Navigation/Navigation'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  const handleClickDisplayLogin = () => {
    router.push('./login')
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Paper sx={{ padding: '1rem' }} elevation={0}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Navigation active="home" />
            </Grid>
            <Grid item>
              <Image src={Hero} alt="hero" />
            </Grid>
            <Grid item>
              <Button variant='contained' color='primary' onClick={handleClickDisplayLogin}>Login</Button>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Paper>

      </main>
    </>
  )
}
