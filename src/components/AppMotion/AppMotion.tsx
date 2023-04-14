import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import React from 'react'

const AppMotion = ({ children }: { children: any }): JSX.Element => {
    const router = useRouter()
    return (
        <motion.div
            key={router.route}
            initial="initialState"
            animate="animateState"
            exit="exitState"
            transition={{ duration: 0.50, ease: "easeInOut" }}
            variants={{
                initialState: {
                    opacity: 0
                }, animateState: {
                    opacity: 1
                }, exitState: {
                    opacity: 0
                }
            }}
        >
            {children}
        </motion.div>
    )
}

export default AppMotion