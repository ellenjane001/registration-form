import Layout from '@/components/Layout/Layout'
import { Button, ButtonGroup, CircularProgress, Grid } from '@mui/material'
import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import People from '../assets/people.png'

const NavigationComponent = dynamic(
  () => import('@/components/Navigation/Navigation'), { loading: () => <CircularProgress /> }
)
export default function Home(): JSX.Element {
  const [showComponent, setShowComponent] = useState(true);
  const [quote, setQuote] = useState("")
  useEffect(() => {
    setShowComponent(true);
    const getQoutes = async () => {
      const q = await axios.get('https://api.quotable.io/random')
      setQuote(q.data.content)
    }
    getQoutes()
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
        <Grid container direction="column" alignItems="center" spacing={2} className='font'>
          <Grid item>
            {showComponent && <NavigationComponent active="home" id={session?.user?.id} />}
          </Grid>
          <Grid item>
            <Image src={People} alt="hero" priority style={{ objectFit: "contain", width: "100%" }} />
          </Grid>
          <Grid item>
            <a href="https://www.freepik.com/free-vector/flat-crowd-people-fast-running-rushing-work_37476426.htm#query=employee&position=9&from_view=keyword&track=sph" style={{ color: "#1976d2" }}>Image by redgreystock</a> on Freepik
          </Grid>
          <Grid item>
            <strong>
              {quote}
            </strong>
          </Grid>
          <Grid item>
            <i>
              Random Quotes generated from <a href="https://github.com/lukePeavey/quotable#get-random-quote" style={{ color: "#1976d2" }}>this Github link</a>
            </i>
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
