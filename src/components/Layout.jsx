import React from 'react'
import { motion } from 'framer-motion'
import Sidebar from './Sidebar'
import Header from './Header'
import { useTheme } from '../contexts/ThemeContext'

const Layout = ({ children }) => {
  const { currentTheme } = useTheme()

  return (
    <div className="min-h-screen bg-bg-primary transition-all duration-500">
      {/* Theme-specific background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {currentTheme === 'modern' && (
          <>
            <motion.div
              className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-brand-tertiary/20 to-brand-primary/20 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </>
        )}

        {currentTheme === 'neon' && (
          <>
            <motion.div
              className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-brand-primary/30 to-brand-secondary/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-brand-secondary/30 to-brand-tertiary/30 rounded-full blur-3xl"
              animate={{
                scale: [1.3, 1, 1.3],
                opacity: [0.6, 0.3, 0.6],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </>
        )}

        {currentTheme === 'organic' && (
          <>
            <motion.div
              className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-brand-primary/5 via-transparent to-brand-secondary/5"
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </>
        )}

        {currentTheme === 'classic' && (
          <div className="absolute inset-0 bg-gradient-to-br from-bg-secondary/50 via-transparent to-bg-accent/50" />
        )}

        {currentTheme === 'corporate' && (
          <div className="absolute inset-0 bg-gradient-to-br from-bg-secondary/30 to-bg-tertiary/30" />
        )}
      </div>

      <div className="flex h-screen relative z-10">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <motion.main 
            className="flex-1 overflow-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="p-8">
              {children}
            </div>
          </motion.main>
          
          {/* Footer */}
          <footer className="border-t border-border-primary bg-bg-primary/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-8 py-3">
              <div className="text-center">
                <div className="text-sm font-semibold text-text-primary mb-1">
                  Nanhi.Link v2.0 - Premium Link Management
                </div>
                <div className="flex items-center justify-center space-x-2 text-xs text-text-tertiary">
                  <span>Made with ❤️ 2025 by</span>
                  <a 
                    href="https://anwe.sh" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brand-primary hover:underline font-medium"
                  >
                    anwe.sh
                  </a>
                  <span>•</span>
                  <span>"Making long URLs cry since 2025" 😢</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Layout
