import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      await signUp(email, password)
      toast.success('Account created successfully!')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl"
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
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl"
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
      </div>

      <motion.div 
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50 p-8">
          {/* Logo */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex justify-center mb-4">
              {/* Dark logo for light backgrounds */}
              <svg width="80" height="80" viewBox="0 0 500 500" className="drop-shadow-lg dark:hidden">
                <defs>
                  <path id="topCurve" d="M 80 180 A 170 170 0 0 1 420 180" fill="none"/>
                </defs>
                
                {/* Blue arcs */}
                <path d="M 100 250 A 150 150 0 0 1 400 250" fill="none" stroke="#3b82f6" strokeWidth="12" strokeLinecap="round"/>
                <path d="M 130 250 A 120 120 0 0 1 370 250" fill="none" stroke="#60a5fa" strokeWidth="8" strokeLinecap="round"/>
                
                {/* Connection points */}
                <circle cx="100" cy="250" r="12" fill="#1e293b"/>
                <circle cx="200" cy="250" r="8" fill="#3b82f6"/>
                <circle cx="300" cy="250" r="8" fill="#1e293b"/>
                <circle cx="400" cy="250" r="12" fill="#3b82f6"/>
                
                {/* NANHI text curved */}
                <text fontSize="48" fontWeight="bold" fill="#1e293b" fontFamily="Arial, sans-serif">
                  <textPath href="#topCurve" startOffset="50%" textAnchor="middle">NANHI</textPath>
                </text>
                
                {/* LINK text at bottom */}
                <text x="250" y="380" fontSize="36" fontWeight="bold" fill="#1e293b" textAnchor="middle" fontFamily="Arial, sans-serif">LINK</text>
              </svg>

              {/* Light logo for dark backgrounds */}
              <svg width="80" height="80" viewBox="0 0 500 500" className="drop-shadow-lg hidden dark:block">
                <defs>
                  <path id="topCurveDark" d="M 80 180 A 170 170 0 0 1 420 180" fill="none"/>
                </defs>
                
                {/* Cyan arcs for dark mode */}
                <path d="M 100 250 A 150 150 0 0 1 400 250" fill="none" stroke="#22d3ee" strokeWidth="12" strokeLinecap="round"/>
                <path d="M 130 250 A 120 120 0 0 1 370 250" fill="none" stroke="#67e8f9" strokeWidth="8" strokeLinecap="round"/>
                
                {/* Connection points */}
                <circle cx="100" cy="250" r="12" fill="#e2e8f0"/>
                <circle cx="200" cy="250" r="8" fill="#22d3ee"/>
                <circle cx="300" cy="250" r="8" fill="#e2e8f0"/>
                <circle cx="400" cy="250" r="12" fill="#22d3ee"/>
                
                {/* NANHI text curved */}
                <text fontSize="48" fontWeight="bold" fill="#e2e8f0" fontFamily="Arial, sans-serif">
                  <textPath href="#topCurveDark" startOffset="50%" textAnchor="middle">NANHI</textPath>
                </text>
                
                {/* LINK text at bottom */}
                <text x="250" y="380" fontSize="36" fontWeight="bold" fill="#fbbf24" textAnchor="middle" fontFamily="Arial, sans-serif">LINK</text>
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Join Nanhi.Link
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Create your account to get started
            </p>
          </motion.div>

          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </motion.form>

          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-slate-600 dark:text-slate-400">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default Register
