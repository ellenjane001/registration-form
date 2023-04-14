import styles from '@/styles/Registration.module.css'
import { CircularProgress } from '@mui/material'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import Header from '../components/Templates/Header/Header'

const RegComponent = dynamic(() => import('@/components/Registration/Registration'), { loading: () => <CircularProgress /> })
const Registration = () => {
  const [showComponent, setShowComponent] = useState<boolean>(false)
  useEffect(() => {
    setShowComponent(true)
  }, [])

  return (
    <>
      <Header title='Registration' />
      <main className={styles.main}>
        {showComponent && <RegComponent />}
      </main>
    </>
  )
}

export default Registration


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const session = await getSession(context) as any
    console.log(session)
    if (session) {
      return {
        redirect: {
          destination: `/profile/${session.user?.id}`,
          permanent: false,
        },
      }
    }
    else {
      return {
        props: {}
      }
    }

  } catch (e) {

    console.log((e as Error).message)
    return { props: {} }
  }

}