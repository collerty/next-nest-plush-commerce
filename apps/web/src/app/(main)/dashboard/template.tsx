'use client'
import {motion} from 'framer-motion'

const variants = {
  hidden: {opacity: 0, x: 0, y: 0},
  enter: {opacity: 1, x: 0, y: 0},
}

export default function Template({children}) {
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