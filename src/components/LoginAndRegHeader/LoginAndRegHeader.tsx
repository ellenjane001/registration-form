import { Home } from '@mui/icons-material'
import { Grid, IconButton } from '@mui/material'
import { Inter } from '@next/font/google'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

const LoginAndRegHeader = (props: { text: string }): JSX.Element => {
    const { text } = props
    const router = useRouter()
    const handleClickReturnHome = () => {
        router.push('/')
    }
    return (
        <Grid container>
            <Grid item xs={12} md={1}>
                <IconButton onClick={handleClickReturnHome}>
                    <Home />
                </IconButton>
            </Grid>
            <Grid item xs={12} md={11} sx={{ textAlign: "right" }}>
                <h1 className={inter.className}>{text}</h1>
            </Grid>
        </Grid>
    )
}

export default LoginAndRegHeader