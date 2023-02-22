import styles from '@/styles/Profile.module.css'
import Header from './Components/Header/Header'

const profile = () => {
 
  return (
    <>
      <Header />
      <main className={styles.main}>
        Profile
      </main>
    </>
  )
}

export default profile