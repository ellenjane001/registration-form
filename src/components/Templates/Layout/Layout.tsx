import styles from '@/styles/Layout.module.css'
import { CircularProgress, Grid, Paper, Skeleton } from '@mui/material'
import dynamic from 'next/dynamic'
import React from 'react'
import Header from '../Header/Header'

interface LayoutProps {
    title?: string
    children?: any
}

const StyledPaperComponent = dynamic(() => import('@/components/StyledComponents/StyledPaper/StyledPaper'), { loading: () => <CircularProgress /> })

const Layout: React.FC<LayoutProps> = ({ children }): JSX.Element => {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <StyledPaperComponent>
                    <Grid container direction="column" alignItems="center" spacing={2} className='font'>
                        {children}
                    </Grid>
                </StyledPaperComponent>
            </main>
        </>
    )
}

export default Layout