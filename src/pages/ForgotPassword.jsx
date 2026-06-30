import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Heart, Mail, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react'

export default function ForgotPassword() {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: err } = await resetPassword(email)
    setLoading(false)
    if (err) { setError(err.message); return }
    setSent(true)
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
          <h1 className="text-2xl font-bold text-foreground">Reset your password</h1>
          <p className="text-slate-500 mt-1 text-sm">
            {sent ? "Check your inbox for the reset link." : "We'll send you a link to reset your password."}
          </p>
        </div>

        <div className="card p-6 sm:p-8 shadow-md">
          {sent ? (
            <div className="text-center py-4">
              <CheckCircle size={40} className="text-accent mx-auto mb-3" />
              <p className="text-foreground font-bold mb-1">Email sent!</p>
              <p className="text-slate-500 text-sm">
                If <strong>{email}</strong> has an account, you'll receive a reset link shortly.
              </p>
            </div>
          ) : (
            <>
              {error && (
                <div role="alert" className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-danger text-sm mb-5">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" aria-hidden="true" />
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
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
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="input pl-9"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : 'Send Reset Link'}
                </button>
              </form>
            </>
          )}
        </div>

        <Link to="/login" className="flex items-center justify-center gap-1.5 text-sm text-slate-500 hover:text-foreground transition-colors mt-5">
          <ArrowLeft size={14} aria-hidden="true" />
          Back to Sign In
        </Link>
      </div>
    </div>
  )
}
