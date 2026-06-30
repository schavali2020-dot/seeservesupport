import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Settings as SettingsIcon, User, Lock, LogOut, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ROLES = [
  { value: 'seeking_help', label: 'I need help / resources' },
  { value: 'volunteer', label: 'I want to volunteer' },
  { value: 'donor', label: 'I want to donate' },
  { value: 'advocate', label: 'I\'m an advocate or researcher' },
]

export default function Settings() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState(user?.user_metadata?.full_name || '')
  const [role, setRole] = useState(user?.user_metadata?.role || '')
  const [profileSaving, setProfileSaving] = useState(false)
  const [profileMsg, setProfileMsg] = useState(null)

  const [pw, setPw] = useState({ current: '', new: '', confirm: '' })
  const [showPw, setShowPw] = useState(false)
  const [pwSaving, setPwSaving] = useState(false)
  const [pwMsg, setPwMsg] = useState(null)

  const saveProfile = async (e) => {
    e.preventDefault()
    setProfileSaving(true)
    setProfileMsg(null)
    if (!isSupabaseConfigured) { setProfileSaving(false); setProfileMsg({ type: 'error', text: 'Supabase not configured.' }); return }
    const { error } = await supabase.auth.updateUser({ data: { full_name: name, role } })
    setProfileSaving(false)
    setProfileMsg(error ? { type: 'error', text: error.message } : { type: 'success', text: 'Profile updated!' })
  }

  const savePassword = async (e) => {
    e.preventDefault()
    setPwMsg(null)
    if (pw.new.length < 6) { setPwMsg({ type: 'error', text: 'New password must be at least 6 characters.' }); return }
    if (pw.new !== pw.confirm) { setPwMsg({ type: 'error', text: 'Passwords do not match.' }); return }
    setPwSaving(true)
    if (!isSupabaseConfigured) { setPwSaving(false); setPwMsg({ type: 'error', text: 'Supabase not configured.' }); return }
    const { error } = await supabase.auth.updateUser({ password: pw.new })
    setPwSaving(false)
    if (error) { setPwMsg({ type: 'error', text: error.message }); return }
    setPwMsg({ type: 'success', text: 'Password updated successfully!' })
    setPw({ current: '', new: '', confirm: '' })
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <div className="flex items-center gap-2 mb-8">
        <SettingsIcon size={22} className="text-primary" aria-hidden="true" />
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
      </div>

      {/* Profile */}
      <section className="card mb-5" aria-labelledby="profile-heading">
        <div className="flex items-center gap-2 mb-5">
          <User size={18} className="text-primary" aria-hidden="true" />
          <h2 id="profile-heading" className="font-bold text-foreground">Profile</h2>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-surface border border-border mb-5">
          <span className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
            {user?.email?.[0]?.toUpperCase()}
          </span>
          <div>
            <div className="font-bold text-foreground text-sm">{user?.user_metadata?.full_name || 'No name set'}</div>
            <div className="text-xs text-slate-500">{user?.email}</div>
          </div>
        </div>

        {profileMsg && (
          <div role="status" className={`flex items-center gap-2 p-3 rounded-lg text-sm mb-4 ${profileMsg.type === 'success' ? 'bg-green-50 text-accent border border-green-200' : 'bg-red-50 text-danger border border-red-200'}`}>
            {profileMsg.type === 'success' ? <CheckCircle size={15} aria-hidden="true" /> : <AlertCircle size={15} aria-hidden="true" />}
            {profileMsg.text}
          </div>
        )}

        <form onSubmit={saveProfile} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-foreground mb-1.5">Full name</label>
            <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} className="input" placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-bold text-foreground mb-1.5">Role</label>
            <select id="role" value={role} onChange={e => setRole(e.target.value)} className="input">
              <option value="">Select role</option>
              {ROLES.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
            </select>
          </div>
          <button type="submit" disabled={profileSaving} className="btn-primary">
            {profileSaving ? 'Saving…' : 'Save Profile'}
          </button>
        </form>
      </section>

      {/* Password */}
      <section className="card mb-5" aria-labelledby="password-heading">
        <div className="flex items-center gap-2 mb-5">
          <Lock size={18} className="text-primary" aria-hidden="true" />
          <h2 id="password-heading" className="font-bold text-foreground">Change Password</h2>
        </div>

        {pwMsg && (
          <div role="status" className={`flex items-center gap-2 p-3 rounded-lg text-sm mb-4 ${pwMsg.type === 'success' ? 'bg-green-50 text-accent border border-green-200' : 'bg-red-50 text-danger border border-red-200'}`}>
            {pwMsg.type === 'success' ? <CheckCircle size={15} aria-hidden="true" /> : <AlertCircle size={15} aria-hidden="true" />}
            {pwMsg.text}
          </div>
        )}

        <form onSubmit={savePassword} className="space-y-4">
          {['new', 'confirm'].map((field) => (
            <div key={field}>
              <label htmlFor={`pw-${field}`} className="block text-sm font-bold text-foreground mb-1.5">
                {field === 'new' ? 'New password' : 'Confirm new password'}
              </label>
              <div className="relative">
                <input
                  id={`pw-${field}`}
                  type={showPw ? 'text' : 'password'}
                  autoComplete={field === 'new' ? 'new-password' : 'new-password'}
                  value={pw[field]}
                  onChange={e => setPw(p => ({ ...p, [field]: e.target.value }))}
                  className="input pr-10"
                  placeholder="••••••••"
                />
                {field === 'new' && (
                  <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-foreground cursor-pointer" aria-label={showPw ? 'Hide' : 'Show'}>
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                )}
              </div>
            </div>
          ))}
          <button type="submit" disabled={pwSaving} className="btn-primary">
            {pwSaving ? 'Updating…' : 'Update Password'}
          </button>
        </form>
      </section>

      {/* Sign out */}
      <section className="card border-red-100" aria-labelledby="signout-heading">
        <div className="flex items-center gap-2 mb-3">
          <LogOut size={18} className="text-danger" aria-hidden="true" />
          <h2 id="signout-heading" className="font-bold text-foreground">Sign Out</h2>
        </div>
        <p className="text-sm text-slate-500 mb-4">You'll be returned to the home page.</p>
        <button onClick={handleSignOut} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-danger text-danger font-bold text-sm hover:bg-red-50 transition-colors cursor-pointer">
          <LogOut size={15} aria-hidden="true" />
          Sign Out
        </button>
      </section>
    </div>
  )
}
