import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { MessageSquare, CheckCircle, AlertCircle, Send } from 'lucide-react'

const TYPES = [
  { value: 'suggest_resource', label: 'Suggest a new resource' },
  { value: 'report_outdated', label: 'Report outdated information' },
  { value: 'general', label: 'General feedback' },
  { value: 'bug', label: 'Report a bug or technical issue' },
  { value: 'story', label: 'Share my story' },
]

export default function Feedback() {
  const { user } = useAuth()
  const [form, setForm] = useState({ type: '', message: '', email: user?.email || '', resource_name: '', resource_address: '', resource_phone: '', resource_city: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const isResource = form.type === 'suggest_resource'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.type) { setError('Please select a feedback type.'); return }
    if (!form.message.trim()) { setError('Please enter a message.'); return }
    setLoading(true)

    try {
      // Submit to Netlify Forms
      const body = new URLSearchParams({
        'form-name': 'feedback',
        type: form.type,
        message: form.message,
        email: form.email,
        resource_name: form.resource_name,
        resource_address: form.resource_address,
        resource_phone: form.resource_phone,
        resource_city: form.resource_city,
      })
      await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() })

      // Also store in Supabase if configured
      if (isSupabaseConfigured) {
        await supabase.from('feedback').insert([{
          type: form.type,
          message: form.message,
          email: form.email,
          resource_name: form.resource_name,
          resource_address: form.resource_address,
          resource_phone: form.resource_phone,
          resource_city: form.resource_city,
          user_id: user?.id || null,
        }])
      }
      setSuccess(true)
    } catch {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  if (success) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center animate-fade-in">
        <CheckCircle size={48} className="text-accent mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Thank you!</h1>
        <p className="text-slate-500 mb-6">Your feedback has been received. We review all submissions and update the database regularly.</p>
        <button onClick={() => { setSuccess(false); setForm({ type: '', message: '', email: user?.email || '', resource_name: '', resource_address: '', resource_phone: '', resource_city: '' }) }} className="btn-secondary">Submit another</button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare size={22} className="text-primary" aria-hidden="true" />
          <h1 className="text-3xl font-bold text-foreground">Feedback</h1>
        </div>
        <p className="text-slate-500">Help us improve SeeServeSupport — suggest resources, report outdated info, or share your story.</p>
      </div>

      <div className="card p-6 sm:p-8">
        {error && (
          <div role="alert" className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-danger text-sm mb-5">
            <AlertCircle size={16} className="shrink-0 mt-0.5" aria-hidden="true" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div>
            <label htmlFor="type" className="block text-sm font-bold text-foreground mb-1.5">
              Feedback type <span aria-hidden="true" className="text-danger">*</span>
            </label>
            <select
              id="type"
              required
              value={form.type}
              onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
              className="input"
            >
              <option value="">Select feedback type</option>
              {TYPES.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
            </select>
          </div>

          {/* Resource fields if suggesting */}
          {isResource && (
            <fieldset className="space-y-4 p-4 rounded-xl bg-surface border border-border">
              <legend className="text-sm font-bold text-foreground px-1">Resource Details</legend>
              {[
                { id: 'resource_name', label: 'Organization/Resource Name', placeholder: 'e.g. City Rescue Mission' },
                { id: 'resource_address', label: 'Address', placeholder: '123 Main St, City, State ZIP' },
                { id: 'resource_phone', label: 'Phone Number', placeholder: '(555) 123-4567' },
                { id: 'resource_city', label: 'City', placeholder: 'e.g. Los Angeles, CA' },
              ].map(({ id, label, placeholder }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-sm font-bold text-foreground mb-1">{label}</label>
                  <input
                    id={id}
                    type="text"
                    value={form[id]}
                    onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
                    className="input text-sm"
                    placeholder={placeholder}
                  />
                </div>
              ))}
            </fieldset>
          )}

          <div>
            <label htmlFor="message" className="block text-sm font-bold text-foreground mb-1.5">
              {isResource ? 'Additional details or description' : 'Message'}{' '}
              <span aria-hidden="true" className="text-danger">*</span>
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              className="input resize-none"
              placeholder={isResource ? 'Tell us about this resource — hours, services offered, who it serves…' : 'Your feedback…'}
            />
          </div>

          {!user && (
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-foreground mb-1.5">
                Email <span className="text-slate-400 font-normal text-xs">(optional — for follow-up)</span>
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="input"
                placeholder="you@email.com"
              />
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                Submitting…
              </>
            ) : (
              <>
                <Send size={15} aria-hidden="true" />
                Submit Feedback
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
