import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
  Heart, Map, BookOpen, HelpCircle, Settings, MessageSquare,
  Menu, X, LogOut, LayoutDashboard, ChevronDown
} from 'lucide-react'

const NAV_ITEMS = [
  { to: '/assist', label: 'Find Resources', icon: Map },
  { to: '/learn', label: 'Learn', icon: BookOpen },
  { to: '/help', label: 'Help Portal', icon: HelpCircle },
]

const USER_NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/feedback', label: 'Feedback', icon: MessageSquare },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Layout({ children }) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
    setUserOpen(false)
  }

  return (
    <div className="flex flex-col min-h-dvh">
      {/* Skip link for keyboard users */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg">
        Skip to main content
      </a>

      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16" aria-label="Main navigation">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" aria-label="SeeServeSupport home">
            <span className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow group-hover:bg-primary-dark transition-colors">
              <Heart size={18} className="text-white" fill="white" />
            </span>
            <span className="font-bold text-foreground text-lg leading-tight hidden sm:block">
              See<span className="text-primary">Serve</span>Support
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold transition-colors duration-150 cursor-pointer ${
                      isActive ? 'bg-primary text-white' : 'text-foreground hover:bg-surface'
                    }`
                  }
                >
                  <Icon size={16} aria-hidden="true" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Auth section */}
          <div className="flex items-center gap-2">
            {user ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setUserOpen(v => !v)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface text-sm font-bold text-foreground transition-colors cursor-pointer"
                  aria-expanded={userOpen}
                  aria-haspopup="true"
                >
                  <span className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                    {user.email?.[0]?.toUpperCase()}
                  </span>
                  <span className="max-w-28 truncate">{user.user_metadata?.full_name || user.email}</span>
                  <ChevronDown size={14} aria-hidden="true" />
                </button>
                {userOpen && (
                  <div className="absolute right-0 mt-1 w-52 bg-white rounded-xl border border-border shadow-lg py-1 animate-fade-in" role="menu">
                    {USER_NAV.map(({ to, label, icon: Icon }) => (
                      <Link
                        key={to}
                        to={to}
                        onClick={() => setUserOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-surface transition-colors cursor-pointer"
                        role="menuitem"
                      >
                        <Icon size={15} aria-hidden="true" />
                        {label}
                      </Link>
                    ))}
                    <hr className="my-1 border-border" />
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-danger hover:bg-red-50 transition-colors cursor-pointer"
                      role="menuitem"
                    >
                      <LogOut size={15} aria-hidden="true" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className="btn-secondary text-sm px-4 py-2">Sign In</Link>
                <Link to="/register" className="btn-primary text-sm px-4 py-2">Join Free</Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden p-2 rounded-lg hover:bg-surface text-foreground transition-colors cursor-pointer"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-white px-4 pb-4 animate-fade-in">
            <ul className="space-y-1 pt-3" role="list">
              {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                        isActive ? 'bg-primary text-white' : 'text-foreground hover:bg-surface'
                      }`
                    }
                  >
                    <Icon size={16} aria-hidden="true" />
                    {label}
                  </NavLink>
                </li>
              ))}
              {user ? (
                <>
                  {USER_NAV.map(({ to, label, icon: Icon }) => (
                    <li key={to}>
                      <NavLink
                        to={to}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                            isActive ? 'bg-primary text-white' : 'text-foreground hover:bg-surface'
                          }`
                        }
                      >
                        <Icon size={16} aria-hidden="true" />
                        {label}
                      </NavLink>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm font-bold text-danger hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <LogOut size={16} aria-hidden="true" />
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <li className="flex gap-2 pt-2">
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-secondary flex-1 justify-center">Sign In</Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)} className="btn-primary flex-1 justify-center">Join Free</Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </header>

      {/* Main */}
      <main id="main-content" className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-charcoal text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Heart size={18} fill="white" aria-hidden="true" />
                <span className="font-bold text-lg">SeeServeSupport</span>
              </div>
              <p className="text-orange-200 text-sm leading-relaxed">
                A student-led campaign connecting communities with homeless support resources.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-3 text-sm uppercase tracking-wide text-orange-200">Resources</h3>
              <ul className="space-y-2 text-sm text-orange-200">
                <li><Link to="/assist" className="hover:text-white transition-colors">Find Resources</Link></li>
                <li><Link to="/learn" className="hover:text-white transition-colors">Learn</Link></li>
                <li><Link to="/help" className="hover:text-white transition-colors">Help Portal</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3 text-sm uppercase tracking-wide text-orange-200">Emergency</h3>
              <ul className="space-y-2 text-sm text-orange-200">
                <li><span className="font-bold text-white">211</span> — Local services</li>
                <li><span className="font-bold text-white">988</span> — Crisis lifeline</li>
                <li><span className="font-bold text-white">911</span> — Emergency</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-orange-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-orange-200">
            <p>© 2025 SeeServeSupport. Student-led initiative.</p>
            <p>Built with care to serve our community.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
