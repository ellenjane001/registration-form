import Layout from '@/components/Layout/Layout'
import { Button, ButtonGroup, CircularProgress, Grid } from '@mui/material'
import { signIn, useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Hero from '../assets/Resume.gif'

const NavigationComponent = dynamic(
  () => import('@/components/Navigation/Navigation'), { loading: () => <CircularProgress /> }
)
export default function Home(): JSX.Element {
  const [showComponent, setShowComponent] = useState(true);
  const [screenSize, setScreenSize] = useState<number>(0);

  useEffect(() => {
    function handleResize(): void {
      setScreenSize(window.innerWidth);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setShowComponent(true);
  }, []);

  const { data: session } = useSession() as any

  const router = useRouter()
  const handleClickDisplayLogin = () => {
    signIn()
  }
  const handleClickDisplayRegister = () => {
    router.push('/registration')
  }

  return (
    <>
      <Layout>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            {showComponent && <NavigationComponent active="home" id={session?.user?.id} />}
          </Grid>
          <Grid item>
            <Image src={Hero} alt="hero" priority height={screenSize < 400 ? 300 : 400} />
          </Grid>
          {!session &&
            <Grid item>
              <ButtonGroup>
                <Button variant='contained' color='primary' onClick={handleClickDisplayLogin}>Login</Button>
                <Button variant='contained' color='secondary' onClick={handleClickDisplayRegister}>Register</Button>
              </ButtonGroup>
            </Grid>}
        </Grid>
      </Layout>
    </>
  )
}
