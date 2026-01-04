import { useState } from 'react'
import SlugGallery from './components/SlugGallery'
import Header from './components/header'
import ReadingPage from './components/ReadingPage'
import './App.css'

function App() {
  const [view, setView] = useState('gallery')

  return (
    <>
      <Header view={view} setView={setView} />
      <main>
        {view === 'gallery' ? <SlugGallery /> : <ReadingPage />}
      </main>
    </>
  )
}

export default App
