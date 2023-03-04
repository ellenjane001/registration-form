import Header from '../components/Header/Header'
import Registration from '../components/Registration/Registration'
import styles from '@/styles/Registration.module.css'
import { getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'

const registration = () => {
  return (
    <>
      <Header title='Registration' />
      <main className={styles.main}>
        <Registration />
      </main>
    </>
  )
}

export default registration


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)
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