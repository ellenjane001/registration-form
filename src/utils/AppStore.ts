import { create } from 'zustand'

interface AppState {
    auth: {
        isLoggedIn: boolean
    }
    setAuth: (val: { isLoggedIn: boolean }) => void,
}

const useAppStore = create<AppState>()((set) => ({
    auth: { isLoggedIn: false },
    setAuth: (val) => set(state => ({ auth: { isLoggedIn: val.isLoggedIn } }))
}))


export default useAppStore