import Header from '@/components/Templates/Header/Header'
import useAppStore from '@/utils/AppStore'
import { darkTheme, lightTheme } from '@/utils/themes'
import { ThemeProvider } from '@emotion/react'
import React from 'react'
import styles from '../../../styles/Login.module.css'
import { childrenType } from '@/types'

const CustomLayout = ({ children }: childrenType) => {
    const theme = useAppStore(state => state.theme)
    return (
        <>
            <Header />
            <ThemeProvider theme={theme ? darkTheme : lightTheme}>
                <main className={styles.main}>
                    {children}
                </main>
            </ThemeProvider>
        </>
    )
}

export default CustomLayout