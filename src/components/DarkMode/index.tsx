import useAppStore from '@/utils/AppStore'
import React, { useCallback, useEffect } from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode'

const DarkMode = () => {
    const setTheme = useAppStore(state => state.setTheme)
    const themeSetter = useCallback(() => {
        if (localStorage.getItem("theme") == "true") {
            setTheme(true)
        } else {
            setTheme(false)
        }
    }, [])

    useEffect(() => {
        themeSetter()
    }, [themeSetter])

    const handleChangeDarkMode = () => {
        if (localStorage.getItem("theme") == "true") {
            localStorage.setItem("theme", "false")
            setTheme(false)
        }
        else {
            localStorage.setItem("theme", "true")
            setTheme(true)
        }
    }
    const theme = useAppStore<boolean>(state => state.theme)

    return (
        <DarkModeSwitch
            style={{ marginBottom: '2rem' }}
            checked={theme}
            onChange={handleChangeDarkMode}
            size={25}
        />
    )
}

export default DarkMode