import { useState } from 'react'
import { ChevronDown, ChevronUp, ExternalLink, BookOpen, Heart, Users, Home, DollarSign, Info } from 'lucide-react'

const SECTIONS = [
  {
    id: 'understand',
    icon: Info,
    title: 'Understanding Homelessness',
    color: 'text-primary bg-blue-50',
    content: [
      {
        q: 'What causes homelessness?',
        a: 'Homelessness is caused by a complex mix of factors including: rising housing costs and lack of affordable housing, job loss or low wages, medical emergencies or disability, domestic violence, mental illness or substance use disorders, and systemic issues like lack of social safety nets. No single cause applies to everyone — each person\'s situation is unique.',
      },
      {
        q: 'Who experiences homelessness?',
        a: 'Homelessness affects people of all backgrounds. About 582,000 people experience homelessness on any given night in the US. This includes single adults (68%), families with children (28%), youth and young adults, veterans, and elderly individuals. The fastest-growing population experiencing homelessness is people over 50.',
      },
      {
        q: 'What\'s the difference between sheltered and unsheltered homelessness?',
        a: '"Sheltered" homelessness means staying in an emergency shelter, transitional housing, or hotel/motel paid by a program. "Unsheltered" means sleeping outdoors, in cars, in abandoned buildings, or other places not meant for human habitation. About 40% of homeless individuals are unsheltered.',
      },
      {
        q: 'Is homelessness a choice?',
        a: 'No. Homelessness is almost never a voluntary choice. Most people experiencing homelessness would prefer stable housing and are actively trying to find it. Factors like trauma, disability, addiction, domestic violence, and lack of affordable housing create situations where people have no safe options. Approaching homelessness with this understanding leads to more effective and compassionate support.',
      },
    ],
  },
  {
    id: 'help-right',
    icon: Heart,
    title: 'How to Help Effectively',
    color: 'text-accent bg-green-50',
    content: [
      {
        q: 'What should I do if I see someone sleeping outside?',
        a: 'First, treat the person with dignity and respect — approach calmly and ask if they need anything. You can offer food, water, or warm clothing. Provide information about local shelters (call 211 for local resources). Don\'t call police unless there\'s an immediate safety concern — this can make things worse. If someone appears to be in a medical emergency, call 911.',
      },
      {
        q: 'Is giving money helpful?',
        a: 'This is personal. Many experts suggest donating to reputable organizations instead because they can stretch dollars further and provide consistent services. However, giving money directly respects the person\'s autonomy and dignity. If you do give money, give it without judgment. You can also carry hygiene kits, gift cards, or bus passes as alternatives.',
      },
      {
        q: 'How can I volunteer effectively?',
        a: 'The most impactful volunteering is consistent. Rather than one-time events, consider: regular meal service at a local shelter, tutoring or job coaching, helping with housing applications, or donating professional skills (accounting, legal aid, medical care). Contact local shelters and nonprofits directly — they usually have specific needs.',
      },
      {
        q: 'What are the most effective charitable organizations to donate to?',
        a: 'Look for organizations focused on housing-first approaches (getting people into stable housing before addressing other needs). Effective national organizations include: National Alliance to End Homelessness, Covenant House (youth), Home Start (families), and local Community Action Agencies. Check Charity Navigator or GuideStar for transparency ratings.',
      },
    ],
  },
  {
    id: 'resources-types',
    icon: Home,
    title: 'Types of Resources Explained',
    color: 'text-purple-700 bg-purple-50',
    content: [
      {
        q: 'What is the difference between emergency shelter and transitional housing?',
        a: 'Emergency shelters provide immediate, short-term housing (often 1 night to 90 days) for people in crisis. Transitional housing is longer-term (6 months to 2 years) and includes case management to help people move toward permanent housing. Both are stepping stones — the goal is permanent supportive housing or independent housing.',
      },
      {
        q: 'What is the "Housing First" approach?',
        a: 'Housing First is an evidence-based model that prioritizes getting people into permanent housing immediately, without requiring sobriety or participation in treatment programs first. Research shows Housing First leads to better long-term outcomes including maintained housing, improved health, and reduced substance use. Many modern programs use this approach.',
      },
      {
        q: 'What healthcare is available for homeless individuals?',
        a: 'Federally Qualified Health Centers (FQHCs) and Health Care for the Homeless (HCH) programs provide free or sliding-scale medical, mental health, dental, and substance use care. Emergency rooms cannot turn away anyone regardless of ability to pay. Many cities also have mobile health clinics and street medicine programs.',
      },
      {
        q: 'What is 211?',
        a: '211 is a free, confidential information and referral service available in most of the US and Canada. When you dial 211, a specialist connects you to local resources for food, shelter, mental health services, utilities assistance, and more. Available 24/7, in multiple languages. It\'s the most important number to know.',
      },
    ],
  },
  {
    id: 'advocacy',
    icon: Users,
    title: 'Advocacy & Systemic Change',
    color: 'text-orange-700 bg-orange-50',
    content: [
      {
        q: 'How can I advocate for policy change?',
        a: 'Contact your local, state, and federal elected officials to support: affordable housing funding, mental health funding, decriminalization of homelessness (banning "camping bans"), expansion of rental assistance programs, and living wage legislation. Attend city council meetings where housing policy is discussed. Join organizations like the National Alliance to End Homelessness.',
      },
      {
        q: 'What policies have actually reduced homelessness?',
        a: 'The most evidence-backed approaches are: Housing First programs (Helsinki, Finland reduced homelessness by 80%), permanent supportive housing for chronically homeless individuals, rapid re-housing with rental assistance, coordinated entry systems that prioritize by need, and significant investment in affordable housing units.',
      },
      {
        q: 'How can students make an impact?',
        a: 'Students can: raise awareness through campaigns like SeeServeSupport, volunteer at local shelters, advocate on campus for affordable housing policies, host supply drives (socks, hygiene items are always needed), connect unhoused people to campus resources that may be available to the public, and conduct research on local homelessness to inform community responses.',
      },
    ],
  },
  {
    id: 'finances',
    icon: DollarSign,
    title: 'Financial & Legal Resources',
    color: 'text-teal-700 bg-teal-50',
    content: [
      {
        q: 'Can homeless individuals receive government benefits?',
        a: 'Yes. Homeless individuals may be eligible for: SSI/SSDI (disability), Medicaid/Medicare, SNAP (food stamps), Veterans benefits (VA), General Assistance, and TANF (if they have children). Having a fixed address is NOT required for most benefits — a shelter address or P.O. box works. Benefits navigators at shelters can help with applications.',
      },
      {
        q: 'What legal protections exist for homeless people?',
        a: 'Homeless individuals retain all constitutional rights. Key legal protections include: the right to vote (many states), the right to medical care via EMTALA, the McKinney-Vento Act (right to education for homeless children), and Fair Housing Act protections. Many cities have laws that illegally restrict homeless individuals\' rights — legal aid organizations can help fight these.',
      },
      {
        q: 'How can someone get an ID without an address?',
        a: 'Many states allow homeless individuals to use a shelter address or the address of a service provider on their ID. Organizations like the National Homeless Voter Coalition help people get IDs. Legal aid organizations can help navigate the documentation requirements.',
      },
    ],
  },
]

function AccordionItem({ q, a }) {
  const [open, setOpen] = useState(false)
  const id = `faq-${q.slice(0, 20).replace(/\s/g, '-')}`
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-start justify-between gap-3 w-full py-4 text-left text-sm font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
        aria-expanded={open}
        aria-controls={id}
      >
        <span>{q}</span>
        {open
          ? <ChevronUp size={16} className="shrink-0 mt-0.5 text-primary" aria-hidden="true" />
          : <ChevronDown size={16} className="shrink-0 mt-0.5 text-slate-400" aria-hidden="true" />
        }
      </button>
      {open && (
        <div id={id} className="pb-4 text-sm text-slate-600 leading-relaxed animate-slide-up">
          {a}
        </div>
      )}
    </div>
  )
}

export default function Learn() {
  const [activeSection, setActiveSection] = useState('understand')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-1">Learn</h1>
        <p className="text-slate-500">Education, facts, and guidance on homelessness and how to help.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar nav */}
        <aside className="w-full lg:w-56 shrink-0" aria-label="Topic navigation">
          <nav>
            <ul className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0" role="list">
              {SECTIONS.map(({ id, icon: Icon, title, color }) => (
                <li key={id} className="shrink-0">
                  <button
                    onClick={() => setActiveSection(id)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer w-full text-left ${
                      activeSection === id
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-foreground hover:bg-muted'
                    }`}
                    aria-current={activeSection === id ? 'page' : undefined}
                  >
                    <Icon size={16} aria-hidden="true" />
                    <span className="hidden lg:block">{title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">
          {SECTIONS.filter(s => s.id === activeSection).map(({ icon: Icon, title, color, content }) => (
            <section key={title} className="animate-fade-in" aria-labelledby="section-title">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${color} mb-4`}>
                <Icon size={16} aria-hidden="true" />
                <span className="font-bold text-sm">{title}</span>
              </div>
              <div className="card">
                {content.map((item) => (
                  <AccordionItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </section>
          ))}

          {/* External resources */}
          <section className="mt-6 card" aria-labelledby="external-heading">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={16} className="text-primary" aria-hidden="true" />
              <h2 id="external-heading" className="font-bold text-foreground">Further Reading & Resources</h2>
            </div>
            <ul className="space-y-3 text-sm" role="list">
              {[
                { label: 'National Alliance to End Homelessness', url: 'https://endhomelessness.org', desc: 'Policy research and national data' },
                { label: 'HUD Exchange', url: 'https://www.hudexchange.info', desc: 'Federal housing programs and grants' },
                { label: 'United States Interagency Council on Homelessness', url: 'https://www.usich.gov', desc: 'Federal strategy and reports' },
                { label: 'Covenant House', url: 'https://www.covenanthouse.org', desc: 'Services for homeless youth' },
                { label: 'National Health Care for the Homeless Council', url: 'https://nhchc.org', desc: 'Healthcare resources and advocacy' },
              ].map(({ label, url, desc }) => (
                <li key={url}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-3 p-3 rounded-xl border border-border hover:bg-surface transition-colors group"
                    aria-label={`${label} (opens in new tab)`}
                  >
                    <div>
                      <div className="font-bold text-primary group-hover:underline">{label}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
                    </div>
                    <ExternalLink size={14} className="text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  )
}
