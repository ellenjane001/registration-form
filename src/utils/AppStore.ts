import { create } from 'zustand'

interface AppState {
    auth: boolean
    setAuth: () => void,
}

const useAppStore = create<AppState>()((set) => ({
    auth: false,
    setAuth: () => set(state => ({ auth: !state.auth }))
}))


export default useAppStore