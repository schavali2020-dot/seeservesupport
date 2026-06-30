import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Map, BookOpen, HelpCircle, MessageSquare, Heart, ArrowRight, Phone } from 'lucide-react'

const QUICK_ACTIONS = [
  { to: '/assist', icon: Map, label: 'Find Resources', desc: 'Search shelters, food, healthcare', color: 'bg-orange-50 text-primary border-orange-100' },
  { to: '/learn', icon: BookOpen, label: 'Learn', desc: 'Education & how to help', color: 'bg-green-50 text-accent border-green-100' },
  { to: '/help', icon: HelpCircle, label: 'Help Portal', desc: 'FAQs and guidance', color: 'bg-purple-50 text-purple-700 border-purple-100' },
  { to: '/feedback', icon: MessageSquare, label: 'Give Feedback', desc: 'Help us improve', color: 'bg-orange-50 text-orange-700 border-orange-100' },
]

const TIPS = [
  'Carry a list of local shelter phone numbers on your phone.',
  'Many libraries offer free WiFi, charging stations, and daytime shelter.',
  '211 connects you to local resources — food, housing, and more — 24/7.',
  'Churches and community centers often have unofficial resources not listed online.',
  'Veterans can call 1-877-424-3838 for dedicated housing support.',
]

export default function Dashboard() {
  const { user } = useAuth()
  const name = user?.user_metadata?.full_name?.split(' ')[0] || 'there'
  const role = user?.user_metadata?.role

  const ROLE_LABELS = {
    seeking_help: 'Finding Resources',
    volunteer: 'Volunteer',
    donor: 'Donor',
    advocate: 'Advocate',
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Welcome */}
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
            {name[0]?.toUpperCase()}
          </span>
          <div>
            <h1 className="text-xl font-bold">Welcome back, {name}!</h1>
            {role && (
              <span className="badge bg-white/20 text-white text-xs border border-white/30 mt-0.5">
                {ROLE_LABELS[role] || role}
              </span>
            )}
          </div>
        </div>
        <p className="text-orange-100 text-sm mt-2">
          Thank you for being part of the SeeServeSupport community. Every action you take helps someone in need.
        </p>
      </div>

      {/* Quick Actions */}
      <section aria-labelledby="actions-heading" className="mb-8">
        <h2 id="actions-heading" className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" role="list">
          {QUICK_ACTIONS.map(({ to, icon: Icon, label, desc, color }) => (
            <li key={to}>
              <Link
                to={to}
                className={`card flex flex-col gap-3 border-2 ${color} hover:shadow-md group cursor-pointer`}
              >
                <span className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm" aria-hidden="true">
                  <Icon size={20} className={color.split(' ')[1]} />
                </span>
                <div>
                  <div className="font-bold text-foreground text-sm">{label}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
                </div>
                <ArrowRight size={14} className="text-slate-400 group-hover:translate-x-1 transition-transform mt-auto" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emergency Numbers */}
        <section className="card border-red-100" aria-labelledby="emergency-heading">
          <div className="flex items-center gap-2 mb-4">
            <Phone size={18} className="text-danger" aria-hidden="true" />
            <h2 id="emergency-heading" className="font-bold text-foreground">Emergency Contacts</h2>
          </div>
          <ul className="space-y-3" role="list">
            {[
              { number: '911', label: 'Emergency Services', sub: 'Police, Fire, Medical' },
              { number: '211', label: 'Social Services', sub: 'Shelter, food, housing' },
              { number: '988', label: 'Crisis Lifeline', sub: 'Mental health & suicide prevention' },
              { number: '1-877-424-3838', label: 'Veterans Crisis', sub: 'VA National Call Center' },
            ].map(({ number, label, sub }) => (
              <li key={number} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-red-50 border border-red-100">
                <div>
                  <div className="font-bold text-sm text-foreground">{label}</div>
                  <div className="text-xs text-slate-500">{sub}</div>
                </div>
                <a
                  href={`tel:${number.replace(/[^0-9]/g, '')}`}
                  className="font-bold text-danger text-base hover:underline shrink-0"
                  aria-label={`Call ${label}: ${number}`}
                >
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Tips */}
        <section className="card" aria-labelledby="tips-heading">
          <div className="flex items-center gap-2 mb-4">
            <Heart size={18} className="text-accent" aria-hidden="true" />
            <h2 id="tips-heading" className="font-bold text-foreground">Community Tips</h2>
          </div>
          <ul className="space-y-3" role="list">
            {TIPS.map((tip, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-600">
                <span className="w-5 h-5 rounded-full bg-accent-light text-accent font-bold text-xs flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                  {i + 1}
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* CTA */}
      <div className="mt-6 p-5 rounded-2xl bg-accent-light border border-green-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="font-bold text-accent text-lg">Know a resource we're missing?</h2>
          <p className="text-sm text-green-700 mt-0.5">Help us grow the database by sharing local resources via the feedback form.</p>
        </div>
        <Link to="/feedback" className="btn-accent shrink-0">Share a Resource</Link>
      </div>
    </div>
  )
}
