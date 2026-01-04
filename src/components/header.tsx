import React from 'react'
import '../styles/header.css'

export default function Header({ view, setView }: { view: 'reading' | 'gallery', setView: (v: 'reading' | 'gallery') => void }) {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="site-logo" role="img" aria-label="Slugterra Woto logo"><img src="src/assets/logo.png" alt="Logo" /></div>

        <nav className="nav-controls" aria-label="Main navigation">
          <button onClick={() => setView('reading')} aria-pressed={view === 'reading'}>Reading</button>
          <button onClick={() => setView('gallery')} aria-pressed={view === 'gallery'}>Gallery</button>
        </nav>
      </div>
    </header>
  )
}
