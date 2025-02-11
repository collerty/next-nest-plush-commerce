'use client'
import {motion} from 'framer-motion'

export default function Template({children}: {children: React.ReactNode}) {
  return (
      <motion.main
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
            delay:0.1
          }}
          key="LandingPage"
      >
        {children}
      </motion.main>
  )
}