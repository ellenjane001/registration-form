import ImageMotion from '@/components/ImageMotion/ImageMotion'
import LoginAndRegisterButton from '@/components/LoginAndRegister/CustomButtonGroup'
import NavGrid from '@/components/NavGrid/NavGrid'
import StyledIElement from '@/components/StyledComponents/StyledIElement/StyledIElement'
import Layout from '@/components/Templates/Layout/Layout'
import { CircularProgress, Grid, Skeleton } from '@mui/material'
import axios from 'axios'
import { GetStaticProps } from 'next'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import People from '../assets/people.png'

const NavigationComponent = dynamic(
  () => import('@/components/Navigation/Navigation'), { loading: () => <Skeleton variant="rounded" width="100%" height={60} /> }
)
export default function Home({ content }: { content: string }): JSX.Element {
  const [showComponent, setShowComponent] = useState<boolean>(true);

  useEffect(() => {
    setShowComponent(true);
  }, []);

  const { data: session } = useSession() as any

  return (
    <Layout>
      <NavGrid>
        {showComponent && <NavigationComponent active="home" id={session?.user?.id} />}
      </NavGrid>
      <Grid item md={12}>
        <ImageMotion>
          <Image src={People} alt="hero" priority style={{ objectFit: "contain", width: "100%", height: "auto" }} />
        </ImageMotion>
      </Grid>
      <Grid item>
        <StyledIElement>
          <a href="https://www.freepik.com/free-vector/flat-crowd-people-fast-running-rushing-work_37476426.htm#query=employee&position=9&from_view=keyword&track=sph" style={{ color: "#1976d2" }}>Image by redgreystock</a> on Freepik
        </StyledIElement>
      </Grid>
      <Grid item>
        <strong>
          {content ? content : <CircularProgress />}
        </strong>
      </Grid>
      <Grid item>
        <StyledIElement>
          Random Quotes generated from <a href="https://github.com/lukePeavey/quotable#get-random-quote" style={{ color: "#1976d2" }}>this Github link</a>
        </StyledIElement>
      </Grid>
      <Grid item>
        {!session &&
          <LoginAndRegisterButton />}
      </Grid>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  try {
    let result = await axios.get('https://api.quotable.io/random')
    return {
      props: { ...result.data }
    }

  } catch (e) {
    return {
      props: {}
    }
  }

}