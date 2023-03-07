import styles from '@/styles/Registration.module.css'
import { CircularProgress } from '@mui/material'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import Header from '../components/Header/Header'

const RegComponent = dynamic(() => import('@/components/Registration/Registration'), { loading: () => <CircularProgress /> })
const Registration = () => {
  const [showComponent, setShowComponent] = useState(false)
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


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context) as any
  if (session) {
    return {
      redirect: {
        destination: `/profile/${session.user?.id}`,
        permanent: false,
      },
    }
  }

  return {
    props: { session }
  }
}