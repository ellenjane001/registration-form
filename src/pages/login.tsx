import CustomLayout from '@/components/LoginAndRegister/Layout'
import { CircularProgress, Skeleton } from '@mui/material'
import type { GetServerSideProps, GetServerSidePropsContext } from "next"
import { getSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const LoginComponent = dynamic(() => import('@/components/Login/'), { loading: () => <CircularProgress/> })

const Login = () => {
    const [showComponent, setShowComponent] = useState<boolean>(false)
    useEffect(() => {
        setShowComponent(true)
    }, [])
    return (
        <CustomLayout>
          {showComponent && <LoginComponent />}
        </CustomLayout>
    )
}

export default Login

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
            return { props: {} }

    } catch (e) {
        console.log((e as Error).message)
        return { props: {} }
    }

}