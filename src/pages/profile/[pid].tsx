import { useRouter } from 'next/router'
import styles from '../../styles/DynamicProfile.module.css'
import Header from '../Components/Header/Header'
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