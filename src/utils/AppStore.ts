import { create } from 'zustand'

interface AppState {
    theme: boolean,
    setTheme: (value: boolean) => void,
}

const useAppStore = create<AppState>()((set) => ({
    theme: false,
    setTheme: (value) => set(() => ({ theme: value }))
}))


export default useAppStore