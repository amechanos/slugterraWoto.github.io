import React, { useEffect, useState } from 'react'
import { marked } from 'marked'
import '../styles/reading-page.css'

// Load all markdown files in src/content as raw strings (Vite)
const mdModules = (import.meta as any).glob('../content/*.md', { as: 'raw', eager: true }) as Record<string, string>

function parseMdModules(mods: Record<string, string>) {
  return Object.entries(mods).map(([path, raw]) => {
    const filename = path.split('/').pop()?.replace(/\.md$/, '') ?? path
    // Prefer first H1 as title, fall back to filename
    const titleMatch = raw.match(/^#\s+(.+)$/m)
    const title = titleMatch ? titleMatch[1].trim() : filename.replace(/[-_]/g, ' ')
    const html = marked.parse(raw)
    return { id: filename, title, html }
  }).sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }))
}

export default function ReadingPage() {
  const [toc, setToc] = useState(() => parseMdModules(mdModules))
  const [current, setCurrent] = useState(toc[0] ?? null)

  useEffect(() => {
    // ensure current remains valid if toc changes
    if (!toc.find(c => c.id === current?.id)) setCurrent(toc[0] ?? null)
  }, [toc])

  if (!toc || toc.length === 0) {
    return (
      <section id="reading-page" className="reading-page">
        <div className="reading-inner">
          <h2>Reading Page</h2>
          <p>No chapters found. Add markdown files to <code>src/content/*.md</code>.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="reading-page" className="reading-page">
      <div className="reading-inner reader-grid">
        <aside className="toc" aria-label="Table of contents">
          <h3>Contents</h3>
          <ul>
            {toc.map(ch => (
              <li key={ch.id}>
                <button
                  className={`toc-link ${current && current.id === ch.id ? 'active' : ''}`}
                  onClick={() => setCurrent(ch)}
                  aria-pressed={current && current.id === ch.id}
                >
                  {ch.title}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <article className="chapter" aria-live="polite">
          <h2>{current.title}</h2>
          <div className="chapter-body" dangerouslySetInnerHTML={{ __html: current.html }} />

          <nav className="chapter-controls" aria-label="Chapter navigation">
            <button
              onClick={() => setCurrent(toc[Math.max(0, toc.findIndex(c => c.id === current.id) - 1)])}
              disabled={toc.findIndex(c => c.id === current.id) <= 0}
            >
              ← Prev
            </button>
            <button
              onClick={() => setCurrent(toc[Math.min(toc.length - 1, toc.findIndex(c => c.id === current.id) + 1)])}
              disabled={toc.findIndex(c => c.id === current.id) >= toc.length - 1}
            >
              Next →
            </button>
          </nav>
        </article>
      </div>
    </section>
  )
}
