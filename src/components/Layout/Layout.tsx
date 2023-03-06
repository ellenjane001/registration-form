import React from 'react'
import Header from '../Header/Header'
import styles from '@/styles/Layout.module.css'
import { Paper } from '@mui/material'

interface LayoutProps {
    title?: string
    children?: any
}
const Layout: React.FC<LayoutProps> = ({ children, title }) => {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <Paper sx={{ padding: '1rem' }} elevation={0}>
                    {children}
                </Paper >
            </main>
        </>
    )
}

export default Layout