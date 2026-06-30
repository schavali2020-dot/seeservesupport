import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Heart, Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'

const ROLES = [
  { value: 'seeking_help', label: 'I need help / resources' },
  { value: 'volunteer', label: 'I want to volunteer' },
  { value: 'donor', label: 'I want to donate' },
  { value: 'advocate', label: 'I\'m an advocate or researcher' },
]

export default function Register() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', role: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const passwordStrength = () => {
    const pw = form.password
    if (!pw) return null
    if (pw.length < 6) return { label: 'Too short', color: 'text-danger' }
    if (pw.length < 10) return { label: 'Fair', color: 'text-yellow-600' }
    return { label: 'Strong', color: 'text-accent' }
  }
  const strength = passwordStrength()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    const { error: err } = await signUp(form.email, form.password, {
      full_name: form.name,
      role: form.role,
    })
    setLoading(false)
    if (err) { setError(err.message); return }
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 animate-fade-in">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-accent-light flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={32} className="text-accent" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Check your email</h1>
          <p className="text-slate-500 mb-6">
            We sent a confirmation link to <strong>{form.email}</strong>. Click it to activate your account.
          </p>
          <Link to="/login" className="btn-primary mx-auto">Go to Sign In</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <span className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
              <Heart size={22} className="text-white" fill="white" />
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Join SeeServeSupport</h1>
          <p className="text-slate-500 mt-1 text-sm">Free forever. No credit card needed.</p>
        </div>

        <div className="card p-6 sm:p-8 shadow-md">
          {error && (
            <div role="alert" className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-danger text-sm mb-5">
              <AlertCircle size={16} className="shrink-0 mt-0.5" aria-hidden="true" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-foreground mb-1.5">
                Full name <span aria-hidden="true" className="text-danger">*</span>
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="input pl-9"
                  placeholder="Your name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-foreground mb-1.5">
                Email address <span aria-hidden="true" className="text-danger">*</span>
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="input pl-9"
                  placeholder="you@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-bold text-foreground mb-1.5">
                I am here because… <span aria-hidden="true" className="text-danger">*</span>
              </label>
              <select
                id="role"
                required
                value={form.role}
                onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                className="input"
                aria-label="Select your role"
              >
                <option value="">Select your role</option>
                {ROLES.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-foreground mb-1.5">
                Password <span aria-hidden="true" className="text-danger">*</span>
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  minLength={6}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  className="input pl-9 pr-10"
                  placeholder="Min. 6 characters"
                  aria-describedby="pw-strength"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-foreground cursor-pointer"
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {strength && (
                <p id="pw-strength" className={`text-xs mt-1 font-bold ${strength.color}`} aria-live="polite">
                  Password strength: {strength.label}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-base"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                  Creating account…
                </>
              ) : 'Create Free Account'}
            </button>

            <p className="text-xs text-center text-slate-400">
              By joining, you agree to use this platform to support our community with dignity and respect.
            </p>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
