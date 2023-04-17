import { propsUserDataType, userDataType } from '@/types'
import { CircularProgress } from '@mui/material'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const ContactComponent = dynamic(
  () => import('@/components/Contact/'), { loading: () => <CircularProgress /> }
)

const Contact = ({user}: propsUserDataType) => {
  const [showComponent, setShowComponent] = useState<boolean>(true);
  useEffect(() => {
    setShowComponent(true);
  }, [])

  return (
    <>
      {showComponent && <ContactComponent user={user} />}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const session = await getSession(context) as any
    return {
      props: { ...session }
    }
  } catch (e) {
    console.log((e as Error).message)
    return { props: {} }
  }

}

export default Contact
