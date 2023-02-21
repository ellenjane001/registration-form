import React from 'react'
import Header from './Components/Header/Header'
import styles from '@/styles/Profile.module.css'
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