import { useState, useMemo } from 'react'
import { RESOURCES, CATEGORIES, CITIES } from '../data/resources'
import {
  Search, MapPin, Phone, ExternalLink, Filter, X, Clock, Globe
} from 'lucide-react'

function ResourceCard({ resource }) {
  const cat = CATEGORIES.find(c => c.id === resource.category)
  return (
    <article className="card flex flex-col gap-3 animate-slide-up" aria-label={resource.name}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-foreground text-base leading-snug">{resource.name}</h3>
          <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
            <MapPin size={11} aria-hidden="true" />
            <span>{resource.city}</span>
          </div>
        </div>
        {cat && (
          <span className={`badge shrink-0 ${cat.color}`}>{cat.label}</span>
        )}
      </div>

      <p className="text-sm text-slate-600 leading-relaxed">{resource.description}</p>

      <div className="space-y-1.5 text-sm">
        <div className="flex items-start gap-2 text-slate-600">
          <MapPin size={13} className="shrink-0 mt-0.5 text-slate-400" aria-hidden="true" />
          <span>{resource.address}</span>
        </div>
        {resource.hours && (
          <div className="flex items-start gap-2 text-slate-600">
            <Clock size={13} className="shrink-0 mt-0.5 text-slate-400" aria-hidden="true" />
            <span>{resource.hours}</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 pt-1 mt-auto">
        <a
          href={`tel:${resource.phone.replace(/[^0-9+]/g, '')}`}
          className="btn-primary text-xs px-3 py-1.5"
          aria-label={`Call ${resource.name}: ${resource.phone}`}
        >
          <Phone size={13} aria-hidden="true" />
          {resource.phone}
        </a>
        {resource.website && (
          <a
            href={resource.website}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-xs px-3 py-1.5"
            aria-label={`Visit ${resource.name} website (opens in new tab)`}
          >
            <Globe size={13} aria-hidden="true" />
            Website
            <ExternalLink size={11} aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  )
}

export default function AssistPortal() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [city, setCity] = useState('All Cities')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    return RESOURCES.filter(r => {
      const matchCat = category === 'all' || r.category === category
      const matchCity = city === 'All Cities' || r.city === city
      const matchSearch = !search ||
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase()) ||
        r.city.toLowerCase().includes(search.toLowerCase()) ||
        r.address.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchCity && matchSearch
    })
  }, [search, category, city])

  const clearFilters = () => {
    setSearch('')
    setCategory('all')
    setCity('All Cities')
  }
  const hasFilters = search || category !== 'all' || city !== 'All Cities'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Find Resources</h1>
            <p className="text-slate-500 mt-1">
              {filtered.length} verified resource{filtered.length !== 1 ? 's' : ''} — shelters, food, healthcare, and more
            </p>
          </div>
          <button
            onClick={() => setShowFilters(v => !v)}
            className="btn-secondary gap-2 md:hidden"
            aria-expanded={showFilters}
          >
            <Filter size={16} aria-hidden="true" />
            Filters
            {hasFilters && <span className="w-2 h-2 rounded-full bg-primary" aria-hidden="true" />}
          </button>
        </div>

        {/* Emergency callout */}
        <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-100 flex items-center gap-3">
          <Phone size={18} className="text-danger shrink-0" aria-hidden="true" />
          <p className="text-sm text-danger font-bold">
            Emergency? Call <a href="tel:911" className="underline">911</a> or{' '}
            <a href="tel:211" className="underline">211</a> (shelter &amp; services) or{' '}
            <a href="tel:988" className="underline">988</a> (mental health crisis)
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside
          className={`w-full md:w-64 shrink-0 space-y-5 ${showFilters ? 'block' : 'hidden md:block'}`}
          aria-label="Filter resources"
        >
          {/* Search */}
          <div>
            <label htmlFor="search" className="block text-sm font-bold text-foreground mb-1.5">Search</label>
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                id="search"
                type="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input pl-9 text-sm"
                placeholder="Name, city, or keyword…"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-foreground cursor-pointer"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-bold text-foreground mb-1.5">City</label>
            <select
              id="city"
              value={city}
              onChange={e => setCity(e.target.value)}
              className="input text-sm"
            >
              {CITIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Categories */}
          <div>
            <p className="text-sm font-bold text-foreground mb-2" id="category-label">Category</p>
            <ul role="list" aria-labelledby="category-label" className="space-y-1">
              {CATEGORIES.map(({ id, label }) => (
                <li key={id}>
                  <button
                    onClick={() => setCategory(id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold transition-colors cursor-pointer ${
                      category === id
                        ? 'bg-primary text-white'
                        : 'text-foreground hover:bg-muted'
                    }`}
                    aria-pressed={category === id}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {hasFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1.5 text-xs text-danger font-bold hover:underline cursor-pointer">
              <X size={12} aria-hidden="true" />
              Clear all filters
            </button>
          )}
        </aside>

        {/* Results */}
        <section className="flex-1 min-w-0" aria-label="Resource results" aria-live="polite">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Search size={40} className="text-slate-300 mb-3" aria-hidden="true" />
              <h2 className="text-lg font-bold text-foreground mb-1">No resources found</h2>
              <p className="text-slate-500 text-sm">Try a different search term, city, or category.</p>
              <button onClick={clearFilters} className="btn-secondary mt-4 text-sm">Clear filters</button>
            </div>
          ) : (
            <ul
              className="grid grid-cols-1 lg:grid-cols-2 gap-4"
              role="list"
              aria-label={`${filtered.length} resources`}
            >
              {filtered.map(r => (
                <li key={r.id}>
                  <ResourceCard resource={r} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
