import { motion } from 'framer-motion'
import React from 'react'

const ImageMotion = ({ children }: { children: any }): JSX.Element => {
    return (
        <motion.div
            transition={{ duration: .40 }}
            initial={{
                transform: "scale(0.25,0)"
            }}
            animate={{
                transform: "scale(1,1)"
            }}>
            {children}
        </motion.div>
    )
}

export default ImageMotion