import React from 'react'
import Header from '../Header/Header'
import styles from '@/styles/Layout.module.css'
import { CircularProgress, Paper } from '@mui/material'
import dynamic from 'next/dynamic'

interface LayoutProps {
    title?: string
    children?: any
}

const StyledPaperComponent = dynamic(() => import('@/components/StyledComponents/StyledPaper/StyledPaper'), { loading: () => <CircularProgress /> })

const Layout: React.FC<LayoutProps> = ({ children, title }): JSX.Element => {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <StyledPaperComponent>
                    <Paper sx={{ padding: '1rem' }} elevation={0}>
                        {children}
                    </Paper >
                </StyledPaperComponent>

            </main>
        </>
    )
}

export default Layout