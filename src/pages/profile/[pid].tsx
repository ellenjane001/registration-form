import { useRouter } from 'next/router'
import React from 'react'
import Header from '../Components/Header/Header'
import styles from '../../styles/DynamicProfile.module.css'
const Profile = () => {
    const router = useRouter()
    const { pid } = router.query

    return (<>
        <Header />
        <main className={styles.main}>
            Profile: {pid}
        </main>
    </>
    )
}

export default Profile