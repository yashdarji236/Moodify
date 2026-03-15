import React, { useContext, useState } from 'react'
import { SongContext } from '../Context'
import Player from '../Component/Player'
import FaceExpression from '../../Expression/component/expression'
import { useSongs } from '../Hooks/useSongs'

const NAV = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
    ),
    label: 'Home',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2">
        <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
      </svg>
    ),
    label: 'Search',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    label: 'Liked Songs',
  },
]

const PLAYLISTS = ['Favorites', 'Recently Played', 'Discover New']

const greeting = () => {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
}

const Home = () => {
  const { song, Setsong } = useContext(SongContext)
  const { handleGetSongs } = useSongs()
  const [activeNav, setActiveNav] = useState('Home')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    /* Root: full screen, flex col so bottom bar sticks */
    <div className="flex flex-col h-screen bg-[#212121] text-white overflow-hidden">

      {/* ── TOP LAYER: sidebar + main ── */}
      <div className="flex flex-1 min-h-0">

        {/* ── SIDEBAR ── */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-40 w-60 bg-[#171717] border-r border-[#2f2f2f]
            flex flex-col transition-transform duration-200
            md:relative md:translate-x-0
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5 px-5 py-5 border-b border-[#2f2f2f]">
            <div className="w-7 h-7 shrink-0">
              <svg viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="19" stroke="white" strokeWidth="1.5"/>
                <path d="M10 20 Q15 12 20 20 Q25 28 30 20" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
            <span className="text-white font-semibold text-sm tracking-tight">MoodSync</span>
          </div>

          {/* Nav */}
          <nav className="px-3 pt-4 flex flex-col gap-0.5">
            {NAV.map(({ icon, label }) => (
              <button
                key={label}
                onClick={() => { setActiveNav(label); setSidebarOpen(false) }}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm w-full text-left transition-colors
                  ${activeNav === label
                    ? 'bg-[#2f2f2f] text-white'
                    : 'text-[#8e8ea0] hover:bg-[#2a2a2a] hover:text-white'}
                `}
              >
                {icon}
                {label}
              </button>
            ))}
          </nav>

          {/* Playlists */}
          <div className="px-3 mt-6 flex-1 overflow-y-auto">
            <p className="text-[10px] font-semibold text-[#555] uppercase tracking-widest px-3 mb-2">
              Playlists
            </p>
            {PLAYLISTS.map(p => (
              <button
                key={p}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-[#8e8ea0] hover:bg-[#2a2a2a] hover:text-white transition-colors w-full text-left"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#3f3f3f] shrink-0" />
                {p}
              </button>
            ))}
          </div>

          {/* User stub */}
          <div className="px-4 py-4 border-t border-[#2f2f2f]">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#3f3f3f] flex items-center justify-center text-xs font-semibold text-white shrink-0">
                U
              </div>
              <span className="text-sm text-[#8e8ea0] truncate">You</span>
            </div>
          </div>
        </aside>

        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/60 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── MAIN SCROLL AREA ── */}
        <main className="flex-1 overflow-y-auto flex flex-col min-h-0">

          {/* Top bar */}
          <header className="sticky top-0 z-20 flex items-center gap-3 px-5 py-3.5 bg-[#212121]/90 backdrop-blur border-b border-[#2f2f2f]">
            <button
              className="md:hidden text-[#8e8ea0] hover:text-white transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <div className="flex-1">
              <h1 className="text-white font-semibold text-sm">{greeting()}</h1>
              <p className="text-[#8e8ea0] text-xs">Your personalized music collection</p>
            </div>
          </header>

          {/* Page content */}
          <div className="flex-1 px-5 md:px-8 py-8 flex flex-col gap-10">

            {/* Featured Playlists */}
            <section>
              <h2 className="text-white font-semibold text-base mb-4">Featured Playlists</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {['Chill Vibes', 'Focus Mode', 'Happy Hours', 'Late Night'].map(name => (
                  <div key={name} className="bg-[#2f2f2f] hover:bg-[#3a3a3a] border border-[#3f3f3f] rounded-xl p-4 cursor-pointer transition-colors group">
                    <div className="w-full aspect-square rounded-lg bg-[#3a3a3a] mb-3 flex items-center justify-center group-hover:bg-[#444] transition-colors">
                      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#555]">
                        <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/>
                      </svg>
                    </div>
                    <p className="text-white text-xs font-medium truncate">{name}</p>
                    <p className="text-[#8e8ea0] text-[11px] mt-0.5">Playlist</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Recommended */}
            <section>
              <h2 className="text-white font-semibold text-base mb-4">Recommended For You</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {['Calm', 'Energetic', 'Sad', 'Happy', 'Angry', 'Surprised'].map(mood => (
                  <div key={mood} className="bg-[#2f2f2f] hover:bg-[#3a3a3a] border border-[#3f3f3f] rounded-xl p-3 cursor-pointer transition-colors text-center">
                    <div className="w-full aspect-square rounded-lg bg-[#3a3a3a] mb-2 flex items-center justify-center text-lg">
                      {{ Calm:'😌', Energetic:'⚡', Sad:'😢', Happy:'😊', Angry:'😤', Surprised:'😲' }[mood]}
                    </div>
                    <p className="text-[#8e8ea0] text-[11px]">{mood}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="h-px bg-[#2f2f2f]" />

            {/* Mood Detection */}
            <section className="flex flex-col items-center gap-6 pb-6">
              <div className="text-center">
                <h2 className="text-white font-semibold text-base">Detect Your Mood</h2>
                <p className="text-[#8e8ea0] text-xs mt-1">Let your face choose the music</p>
              </div>
              <div className="w-full max-w-sm bg-[#2f2f2f] border border-[#3f3f3f] rounded-2xl p-4">
                <FaceExpression onClick={(expression) => { handleGetSongs({ mood: expression }) }} />
              </div>
            </section>

          </div>
        </main>
      </div>

      {/* ── BOTTOM PLAYER BAR (Spotify-style, ChatGPT colors) ── */}
      {song && <Player />}

    </div>
  )
}

export default Home