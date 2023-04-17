import { CustomHeaderType } from '@/types'
import { Home } from '@mui/icons-material'
import { Grid, IconButton } from '@mui/material'
import { Inter } from '@next/font/google'
import { useRouter } from 'next/router'
import DarkMode from '@/components/DarkMode'

const inter = Inter({ subsets: ['latin'] })

const CustomHeader = ({ text }: CustomHeaderType): JSX.Element => {
    const router = useRouter()
    const handleClickReturnHome = () => {
        router.push('/')
    }
    return (
        <Grid container spacing={2} textAlign="center" padding={2}>
            <Grid item xs={12} md={2}>
                <IconButton onClick={handleClickReturnHome}>
                    <Home />
                </IconButton>
            </Grid>
            <Grid item xs={12} md={8}>
                <h1 className={inter.className}>{text}</h1>
            </Grid>
            <Grid item xs={12} md={2}>
                <DarkMode />
            </Grid>
        </Grid>
    )
}

export default CustomHeader