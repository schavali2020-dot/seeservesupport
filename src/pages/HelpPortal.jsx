import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HelpCircle, Phone, Map, BookOpen, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react'

const FAQS = [
  {
    q: 'Do I need to create an account to find resources?',
    a: 'No! The Find Resources page is completely public. You can search all shelters, food banks, clinics, and other services without signing in. An account lets you save favorites, give feedback, and track your involvement.',
  },
  {
    q: 'How do I know the resource information is accurate?',
    a: 'We manually verify each listing using official city government websites, 211.org, and the organizations\' own websites. We update listings regularly but always recommend calling ahead, as hours and availability can change without notice.',
  },
  {
    q: 'I\'m in crisis right now. What should I do?',
    a: 'If you\'re in immediate danger, call 911. For shelter, call 211. For mental health crisis, call or text 988. These lines are free, confidential, and available 24/7. You can also go directly to an emergency shelter — most accept walk-ins.',
  },
  {
    q: 'I know a resource that\'s not listed. Can I submit it?',
    a: 'Yes! Use the Feedback page to submit new resources. Include the name, address, phone number, hours, and a brief description. Our team will verify and add it. Thank you for helping us grow the database.',
  },
  {
    q: 'Is my information private?',
    a: 'Yes. We only collect your email and the role you select during sign-up. We never sell your data, share it with third parties, or store any location data. Our auth is handled by Supabase with enterprise-grade security.',
  },
  {
    q: 'I represent a shelter or organization. How can we get listed?',
    a: 'Please use the Feedback form or email us directly. Include your organization\'s full information and we\'ll review and add you. Listing is always free.',
  },
  {
    q: 'Can I use this app on my phone?',
    a: 'Yes! SeeServeSupport is a mobile-responsive web app — it works well on any smartphone browser. Tap the Find Resources button from the home screen for quick access.',
  },
  {
    q: 'What is SeeServeSupport?',
    a: 'SeeServeSupport is a student-led campaign and free platform designed to connect people experiencing homelessness — and those who want to help — with verified local resources. Our mission is to make critical information easy to find for everyone.',
  },
]

const CARDS = [
  { icon: Map, to: '/assist', label: 'Find Resources', desc: 'Browse shelters, food, healthcare, and more by city and category.', color: 'bg-orange-50 text-primary border-orange-100' },
  { icon: BookOpen, to: '/learn', label: 'Learn', desc: 'Educational content about homelessness and effective ways to help.', color: 'bg-green-50 text-accent border-green-100' },
  { icon: MessageSquare, to: '/feedback', label: 'Submit Feedback', desc: 'Report outdated info, suggest new resources, or share your experience.', color: 'bg-orange-50 text-orange-700 border-orange-100' },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-start justify-between gap-3 w-full py-4 text-left text-sm font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
        aria-expanded={open}
      >
        <span>{q}</span>
        {open
          ? <ChevronUp size={16} className="shrink-0 mt-0.5 text-primary" aria-hidden="true" />
          : <ChevronDown size={16} className="shrink-0 mt-0.5 text-slate-400" aria-hidden="true" />
        }
      </button>
      {open && (
        <p className="pb-4 text-sm text-slate-600 leading-relaxed animate-slide-up">{a}</p>
      )}
    </div>
  )
}

export default function HelpPortal() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-4">
          <HelpCircle size={28} className="text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-1">Help Portal</h1>
        <p className="text-slate-500">Answers to common questions and guidance for using SeeServeSupport.</p>
      </div>

      {/* Emergency callout */}
      <div className="p-4 rounded-2xl bg-danger text-white mb-8 flex items-center gap-4">
        <Phone size={22} className="shrink-0" aria-hidden="true" />
        <div>
          <p className="font-bold">In immediate crisis?</p>
          <p className="text-sm text-red-100">
            Call <strong>911</strong> (emergency) · <strong>211</strong> (shelter/services) · <strong>988</strong> (mental health crisis)
          </p>
        </div>
      </div>

      {/* Quick links */}
      <section aria-labelledby="quick-help-heading" className="mb-8">
        <h2 id="quick-help-heading" className="text-xl font-bold text-foreground mb-4">Where would you like to go?</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4" role="list">
          {CARDS.map(({ icon: Icon, to, label, desc, color }) => (
            <li key={to}>
              <Link
                to={to}
                className={`card flex flex-col gap-3 border-2 ${color} hover:shadow-md cursor-pointer`}
              >
                <Icon size={22} aria-hidden="true" />
                <div>
                  <div className="font-bold text-foreground text-sm">{label}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="card">
        <h2 id="faq-heading" className="font-bold text-foreground text-lg mb-2">Frequently Asked Questions</h2>
        <div>
          {FAQS.map(faq => <FaqItem key={faq.q} {...faq} />)}
        </div>
      </section>

      {/* Still need help */}
      <div className="mt-6 p-5 rounded-2xl bg-muted border border-border text-center">
        <h2 className="font-bold text-foreground mb-1">Still need help?</h2>
        <p className="text-sm text-slate-500 mb-4">Use the feedback form to reach our team — we respond within 48 hours.</p>
        <Link to="/feedback" className="btn-primary mx-auto w-fit">
          <MessageSquare size={15} aria-hidden="true" />
          Contact Us
        </Link>
      </div>
    </div>
  )
}
