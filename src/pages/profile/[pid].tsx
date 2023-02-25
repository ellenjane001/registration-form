import { AuthContext } from '@/context/auth-context'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import styles from '../../styles/DynamicProfile.module.css'
import Header from '../Components/Header/Header'
const Profile = () => {
    const router = useRouter()
    const { pid } = router.query
    const authContext = useContext(AuthContext)
    
    useEffect(() => {
        authContext.isUserAuthenticated()
            ? router.push("/profile/1")
            : router.push("/");
    }, [])
    return (<>
        <Header />
        <main className={styles.main}>
            Profile: {pid}
        </main>
    </>
    )
}

export default Profile