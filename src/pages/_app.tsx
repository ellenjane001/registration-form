import AppMotion from '@/components/AppMotion/AppMotion'
import '@/styles/globals.css'
import useAppStore from '@/utils/AppStore'
import { darkTheme, lightTheme } from '@/utils/themes'
import { ThemeProvider } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import type { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {
  const theme = useAppStore(state => state.theme)
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme ? darkTheme : lightTheme}>
        <AnimatePresence mode='wait'>
          <AppMotion>
            <Component {...pageProps} />
          </AppMotion>
        </AnimatePresence>
      </ThemeProvider>
    </SessionProvider>
  )
}

