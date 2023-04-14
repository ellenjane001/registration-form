import { create } from 'zustand'

interface AppState {
    auth: {
        isLoggedIn: boolean
    }
    setAuth: (val: { isLoggedIn: boolean }) => void,
    theme: boolean,
    setTheme: any
}

const useAppStore = create<AppState>()((set) => ({
    auth: { isLoggedIn: false },
    setAuth: (val) => set(() => ({ auth: { isLoggedIn: val.isLoggedIn } })),
    theme: false,
    setTheme: (value: boolean) => set(() => ({ theme: value }))
}))


export default useAppStore