import React, { useMemo, useState } from 'react'
import slugData from '../data/slugProfiles.json'
import SlugCard from './SlugCard'
import '../styles/slug-gallery.css'

type Slug = {
  "Name": string
  "Original?": string
  "Element": string
  "Ghoul Form": string
  "Description": string
}

export default function SlugGallery() {
  const [order, setOrder] = useState<'none' | 'asc' | 'desc'>('none')
  const slugs = slugData as Slug[]

  const sorted = useMemo(() => {
    if (order === 'none') return slugs
    const factor = order === 'asc' ? 1 : -1
    return [...slugs].sort((a, b) => factor * a.Name.localeCompare(b.Name, undefined, { sensitivity: 'base' }))
  }, [order, slugs])

  return (
    <section id="slug-gallery" className="slug-gallery">
      <div className="gallery-header">
        <h2>Slug Gallery</h2>
        <div className="gallery-controls">
          <button onClick={() => setOrder('asc')} aria-pressed={order === 'asc'}>Sort A→Z</button>
          <button onClick={() => setOrder('desc')} aria-pressed={order === 'desc'}>Sort Z→A</button>
          <button onClick={() => setOrder('none')} aria-pressed={order === 'none'}>Original</button>
        </div>
      </div>

      <div className="slug-grid">
        {sorted.map((s, i) => (
          <SlugCard key={s.Name ?? i} slug={s} />
        ))}
      </div>
    </section>
  )
}
