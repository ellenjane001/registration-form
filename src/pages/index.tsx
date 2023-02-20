import styles from '@/styles/Home.module.css'
import Header from './Components/Header/Header'
import Hero from '../assets/Resume.gif'
import Image from 'next/image'
export default function Home() {

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Image src={Hero} alt="hero" />
      </main >
    </>
  )
}
