import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import type { AppProps } from 'next/app'
import type { Session } from "next-auth"
import { ThemeProvider } from '@mui/material'
import useAppStore from '@/utils/AppStore'
import { lightTheme, darkTheme } from '@/utils/themes'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {
  const theme = useAppStore(state => state.theme)
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme ? darkTheme : lightTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

