import Header from './Components/Header/Header'
import Registration from './Components/Registration/Registration'
import styles from '@/styles/Registration.module.css'
const registration = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Registration />
      </main>
    </>

  )
}

export default registration