import React, { useContext, useRef, useState, useEffect } from 'react'
import { SongContext } from '../Context'

const Player = () => {
  const { song } = useContext(SongContext)
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [speed, setSpeed] = useState(1)
  const [showVolume, setShowVolume] = useState(false)
  const [showSpeed, setShowSpeed] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => setCurrentTime(audio.currentTime)
    const onMeta = () => setDuration(audio.duration)
    const onEnd  = () => setIsPlaying(false)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('ended', onEnd)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('ended', onEnd)
    }
  }, [])

  // Auto-play when a new song loads
  useEffect(() => {
    if (song?.url && audioRef.current) {
      audioRef.current.load()
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }, [song?.url])

  const togglePlay = () => {
    if (!audioRef.current) return
    isPlaying ? audioRef.current.pause() : audioRef.current.play()
    setIsPlaying(!isPlaying)
  }

  const seek = (e) => {
    const t = parseFloat(e.target.value)
    if (audioRef.current) { audioRef.current.currentTime = t; setCurrentTime(t) }
  }

  const changeVolume = (e) => {
    const v = parseFloat(e.target.value)
    setVolume(v)
    if (audioRef.current) audioRef.current.volume = v
  }

  const changeSpeed = (s) => {
    setSpeed(s)
    if (audioRef.current) audioRef.current.playbackRate = s
    setShowSpeed(false)
  }

  const fmt = (t) => {
    if (!t || isNaN(t)) return '0:00'
    return `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`
  }

  const pct = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="w-full bg-[#171717] border-t border-[#2f2f2f] px-4 py-2.5 flex items-center gap-4 select-none">
      <audio ref={audioRef} src={song?.url} />

      {/* ── LEFT: album art + song info ── */}
      <div className="flex items-center gap-3 w-[22%] min-w-0">
        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[#2f2f2f]">
          {song?.posterUrl && (
            <img src={song.posterUrl} alt={song.title} className="w-full h-full object-cover" />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-white text-xs font-medium truncate">{song?.title || '—'}</p>
          <p className="text-[#8e8ea0] text-[11px] capitalize truncate">{song?.mood || ''}</p>
        </div>
      </div>

      {/* ── CENTRE: controls + progress ── */}
      <div className="flex-1 flex flex-col items-center gap-1.5 min-w-0">

        {/* Buttons row */}
        <div className="flex items-center gap-5">
          {/* −5s */}
          <button
            onClick={() => { if (audioRef.current) audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5) }}
            className="text-[#8e8ea0] hover:text-white transition-colors"
            title="-5s"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
            </svg>
          </button>

          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-[#ececec] active:scale-95 transition-all"
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#212121]">
                <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#212121] ml-0.5">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>

          {/* +5s */}
          <button
            onClick={() => { if (audioRef.current) audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 5) }}
            className="text-[#8e8ea0] hover:text-white transition-colors"
            title="+5s"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z"/>
            </svg>
          </button>
        </div>

        {/* Progress row */}
        <div className="flex items-center gap-2 w-full max-w-lg">
          <span className="text-[#8e8ea0] text-[10px] tabular-nums w-7 text-right">{fmt(currentTime)}</span>
          <div className="relative flex-1 h-1 bg-[#3f3f3f] rounded-full group cursor-pointer">
            <div className="absolute left-0 top-0 h-full bg-white rounded-full pointer-events-none" style={{ width: `${pct}%` }} />
            <input
              type="range" min="0" max={duration || 0} value={currentTime} step="0.1"
              onChange={seek}
              className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
            />
          </div>
          <span className="text-[#8e8ea0] text-[10px] tabular-nums w-7">{fmt(duration)}</span>
        </div>
      </div>

      {/* ── RIGHT: volume + speed ── */}
      <div className="flex items-center gap-3 w-[22%] justify-end">

        {/* Volume */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setShowVolume(!showVolume); setShowSpeed(false) }}
            className="text-[#8e8ea0] hover:text-white transition-colors"
          >
            {volume === 0 ? (
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2">
                <path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2">
                <path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
            )}
          </button>
          {showVolume && (
            <input
              type="range" min="0" max="1" step="0.01" value={volume}
              onChange={changeVolume}
              className="w-20 h-1 accent-white cursor-pointer"
            />
          )}
        </div>

        {/* Speed */}
        <div className="relative">
          <button
            onClick={() => { setShowSpeed(!showSpeed); setShowVolume(false) }}
            className="text-[#8e8ea0] hover:text-white text-[11px] font-semibold bg-[#2f2f2f] hover:bg-[#3a3a3a] border border-[#3f3f3f] rounded-lg px-2 py-1 transition-colors"
          >
            {speed}x
          </button>
          {showSpeed && (
            <div className="absolute bottom-9 right-0 bg-[#2f2f2f] border border-[#3f3f3f] rounded-xl overflow-hidden shadow-xl z-50">
              {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map(s => (
                <button
                  key={s}
                  onClick={() => changeSpeed(s)}
                  className={`block w-full px-4 py-2 text-xs text-left transition-colors
                    ${speed === s ? 'bg-[#3a3a3a] text-white' : 'text-[#8e8ea0] hover:bg-[#3a3a3a] hover:text-white'}`}
                >
                  {s}x
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Player