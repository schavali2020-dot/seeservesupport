import { Link } from 'react-router-dom'
import { Heart, Map, BookOpen, Users, ArrowRight, Phone, Shield, Zap } from 'lucide-react'

const STATS = [
  { value: '73+', label: 'Verified Resource Locations' },
  { value: '20+', label: 'Cities Covered' },
  { value: '7', label: 'Colorado Cities' },
  { value: '100%', label: 'Free to Use' },
]

const FEATURES = [
  {
    icon: Map,
    title: 'Find Resources Near You',
    desc: 'Search shelters, food banks, health clinics, and more across major U.S. cities — filtered by category and location.',
    color: 'bg-orange-100 text-primary',
  },
  {
    icon: BookOpen,
    title: 'Learn & Understand',
    desc: 'Educational content about homelessness, how to help effectively, and what resources exist for different needs.',
    color: 'bg-green-100 text-accent',
  },
  {
    icon: Users,
    title: 'Two Ways to Use',
    desc: 'Whether you\'re experiencing homelessness or want to volunteer and donate, we connect you to what matters.',
    color: 'bg-purple-100 text-purple-700',
  },
]

const URGENT = [
  { label: 'Emergency Shelter', phone: '211', sub: 'Dial anytime, anywhere in the US' },
  { label: 'Crisis / Mental Health', phone: '988', sub: 'Suicide & Crisis Lifeline' },
  { label: 'Homeless Veterans', phone: '1-877-424-3838', sub: 'VA National Call Center' },
]

export default function Splash() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-charcoal via-primary-dark to-primary text-white">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-sm font-bold mb-6 border border-white/30">
            <Heart size={14} fill="white" aria-hidden="true" />
            Student-led campaign · Colorado-focused
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5">
            See. Serve. <span className="text-yellow-300">Support.</span>
          </h1>
          <p className="text-lg md:text-xl text-orange-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            A student-led campaign and free platform connecting Coloradans — and communities nationwide — with verified shelters, food, healthcare, and homelessness resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/assist" className="btn-accent text-base px-7 py-3 shadow-lg">
              <Map size={18} aria-hidden="true" />
              Find Resources Now
            </Link>
            <Link to="/register" className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-white/20 border border-white/40 text-white font-bold text-base hover:bg-white/30 transition-colors cursor-pointer">
              Join the Movement
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-border" aria-label="Campaign statistics">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-6" role="list">
            {STATS.map(({ value, label }) => (
              <li key={label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">{value}</div>
                <div className="text-sm text-slate-500 mt-1">{label}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Urgent lines */}
      <section className="bg-red-50 border-y border-red-100" aria-labelledby="urgent-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-2 mb-4">
            <Phone size={18} className="text-danger" aria-hidden="true" />
            <h2 id="urgent-heading" className="font-bold text-danger text-base">Emergency Lines — Available 24/7</h2>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4" role="list">
            {URGENT.map(({ label, phone, sub }) => (
              <li key={phone} className="bg-white rounded-xl border border-red-100 px-4 py-3 flex items-center gap-3">
                <a
                  href={`tel:${phone.replace(/[^0-9]/g, '')}`}
                  className="text-2xl font-bold text-primary hover:text-foreground transition-colors"
                  aria-label={`Call ${label}: ${phone}`}
                >
                  {phone}
                </a>
                <div>
                  <div className="font-bold text-foreground text-sm">{label}</div>
                  <div className="text-xs text-slate-500">{sub}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-labelledby="features-heading">
        <div className="text-center mb-12">
          <h2 id="features-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-3">How SeeServeSupport Works</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">Everything you need to find help or give help — in one place.</p>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6" role="list">
          {FEATURES.map(({ icon: Icon, title, desc, color }) => (
            <li key={title} className="card flex flex-col gap-4">
              <span className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`} aria-hidden="true">
                <Icon size={22} />
              </span>
              <div>
                <h3 className="font-bold text-foreground text-lg mb-1">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Dual CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16" aria-labelledby="cta-heading">
        <h2 id="cta-heading" className="sr-only">Get started</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* For someone in need */}
          <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-light text-white p-8 flex flex-col gap-4">
            <span className="badge bg-white/20 text-white text-xs border border-white/30 w-fit">I need help</span>
            <h3 className="text-2xl font-bold">Are you experiencing homelessness?</h3>
            <p className="text-orange-100 text-sm leading-relaxed">Find emergency shelter, food, healthcare, and support services near you. No account required to search.</p>
            <Link to="/assist" className="btn-accent w-fit mt-auto">
              <Map size={16} aria-hidden="true" />
              Find Help Now
            </Link>
          </div>
          {/* For a helper */}
          <div className="rounded-2xl bg-gradient-to-br from-accent to-green-500 text-white p-8 flex flex-col gap-4">
            <span className="badge bg-white/20 text-white text-xs border border-white/30 w-fit">I want to help</span>
            <h3 className="text-2xl font-bold">Want to make a difference?</h3>
            <p className="text-green-100 text-sm leading-relaxed">Learn about effective ways to volunteer, donate, and advocate. Create a free account to track your impact.</p>
            <Link to="/learn" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-accent font-bold text-sm hover:bg-green-50 transition-colors cursor-pointer w-fit">
              <BookOpen size={16} aria-hidden="true" />
              Learn How to Help
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-muted border-t border-border py-8" aria-labelledby="trust-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="trust-heading" className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Our Commitments</h2>
          <ul className="flex flex-wrap justify-center gap-6 text-sm text-foreground font-bold" role="list">
            <li className="flex items-center gap-1.5"><Shield size={15} className="text-accent" aria-hidden="true" />Privacy-first</li>
            <li className="flex items-center gap-1.5"><Shield size={15} className="text-accent" aria-hidden="true" />No data sold</li>
            <li className="flex items-center gap-1.5"><Zap size={15} className="text-accent" aria-hidden="true" />Always free</li>
            <li className="flex items-center gap-1.5"><Heart size={15} className="text-accent" aria-hidden="true" />Dignity-centered</li>
            <li className="flex items-center gap-1.5"><Shield size={15} className="text-accent" aria-hidden="true" />WCAG accessible</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
