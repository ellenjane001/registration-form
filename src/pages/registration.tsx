import CustomLayout from '@/components/LoginAndRegister/Layout'
import { Skeleton } from '@mui/material'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const RegComponent = dynamic(() => import('@/components/Registration/Registration'), { loading: () => <Skeleton /> })

const Registration = () => {
  const [showComponent, setShowComponent] = useState<boolean>(false)
  useEffect(() => {
    setShowComponent(true)
  }, [])

  return (
    <CustomLayout>
      {showComponent && <RegComponent />}
    </CustomLayout>
  )
}

export default Registration


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const session = await getSession(context) as any
    if (session)
      return {
        redirect: {
          destination: `/profile/${session.user?.id}`,
          permanent: false,
        },
      }
    else
      return {
        props: {}
      }

  } catch (e) {

    console.log((e as Error).message)
    return { props: {} }
  }

}