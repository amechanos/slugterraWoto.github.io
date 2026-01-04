import React from 'react'

type Slug = {
  "Name": string
  "Original?": string
  "Element": string
  "Ghoul Form": string
  "Description": string
}

export default function SlugCard({ slug }: { slug: Slug }) {
  return (
    <article className="slug-card">
      <div className="slug-card-body">
        <h3 className="slug-name">{slug.Name} / {slug['Ghoul Form']}</h3>
        <p className="slug-meta"><strong>Element:</strong> {slug.Element} <br></br> <strong>Canon to show:</strong> {slug['Original?']}</p>
        <p className="slug-desc">{slug.Description}</p>
      </div>
    </article>
  )
}
