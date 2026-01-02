import React, { useState } from 'react'
import { auth } from '../lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import StarBackground from './StarBackground'
import { ThemeToggle } from './ThemeToggle'
import { LogIn, Mail, Lock, ShieldCheck } from 'lucide-react'
import toast from 'react-hot-toast'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const toastId = toast.loading('Verifying credentials...')
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success('Welcome back, Admin!', { id: toastId })
      navigate('/admin/dashboard')
    } catch (err) {
      toast.error(err.message || 'Login failed', { id: toastId })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <StarBackground />
      <ThemeToggle />
      
      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="bg-card/40 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-2">
              <ShieldCheck size={32} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Portal</h1>
            <p className="text-muted-foreground">Please sign in to manage your portfolio</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Mail size={14} /> Email Address
              </label>
              <input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-background/50 border border-input focus:ring-2 focus:ring-primary outline-hidden transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Lock size={14} /> Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-background/50 border border-input focus:ring-2 focus:ring-primary outline-hidden transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="cosmic-button w-full flex items-center justify-center gap-2 py-3 rounded-xl text-lg font-semibold transition-transform active:scale-[0.98]"
            >
              {loading ? (
                <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn size={20} /> Sign In
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground pt-4">
            Authorized Personnel Only
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
