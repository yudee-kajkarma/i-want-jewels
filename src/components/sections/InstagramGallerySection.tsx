'use client'

import { useEffect, useState } from 'react'
import { getReels, type Reel } from '../../services/reelsService'

type InstagramGallerySectionProps = {
  title?: string
  subtitle?: string
}

export default function InstagramGallerySection({
  title = 'I Want Jewel On Instagram',
  subtitle = '#Atvoguetheme',
}: InstagramGallerySectionProps) {
  const [videos, setVideos] = useState<Reel[]>([])
  const [loading, setLoading] = useState(true)
  const [slideIndex, setSlideIndex] = useState(0)
  const [videoLoaded, setVideoLoaded] = useState(false)

  const visibleCount = 6
  const instaLink = 'https://www.instagram.com/iwantjewels/'

  useEffect(() => {
    async function loadVideos() {
      try {
        const response = await getReels()
        setVideos(response)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    loadVideos()
  }, [])

  // smooth auto slider
  useEffect(() => {
    if (videos.length <= visibleCount) return

    const maxIndex = videos.length - visibleCount

    const timer = setInterval(() => {
      setSlideIndex((prev) => {
        if (prev >= maxIndex) return 0
        return prev + 1
      })

      setVideoLoaded(false)
    }, 2500)

    return () => clearInterval(timer)
  }, [videos])

  const openInstagram = () => {
    window.open(instaLink, '_blank')
  }

  return (
    <section className="overflow-hidden px-0 py-0">
      {/* Heading */}
      <div className="mx-auto max-w-6xl px-4 py-10 text-center">
        <h2 className="text-3xl font-semibold md:text-4xl">{title}</h2>
        <p className="mt-3 text-sm text-zinc-500 md:text-base">{subtitle}</p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-screen animate-pulse bg-gradient-to-r from-zinc-200 via-zinc-100 to-zinc-200"
            />
          ))}
        </div>
      )}

      {/* Mobile */}
      {!loading && videos.length > 0 && (
        <div className="sm:hidden">
          <button
            onClick={openInstagram}
            className="relative block h-screen w-full overflow-hidden"
          >
            {!videoLoaded && (
              <div className="absolute inset-0 z-10 animate-pulse bg-gradient-to-r from-zinc-300 via-zinc-100 to-zinc-300" />
            )}

            <video
              src={videos[slideIndex].url}
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
              onLoadedData={() => setVideoLoaded(true)}
              className={`h-screen w-full object-cover transition-opacity duration-700 ${
                videoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl shadow-xl">
                ▶
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Desktop */}
      {!loading && videos.length > 0 && (
        <div className="hidden h-[70vh] overflow-hidden sm:block py-4">
          <div
            className="flex h-[70vh] transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${slideIndex * (100 / visibleCount)}%)`,
              width: `${(videos.length / visibleCount) * 100}%`,
            }}
          >
            {videos.map((video, index) => (
              <button
                key={index}
                onClick={openInstagram}
                className="relative h-[70vh] w-1/6 flex-shrink-0 overflow-hidden"
              >
                {!videoLoaded && (
                  <div className="absolute inset-0 z-10 animate-pulse bg-gradient-to-r from-zinc-300 via-zinc-100 to-zinc-300" />
                )}

                <video
                  src={video.url}
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                  onLoadedData={() => setVideoLoaded(true)}
                  className={`h-[70vh] w-full object-fill transition duration-500 hover:scale-105 ${
                    videoLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition hover:opacity-100">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl shadow-xl">
                    ▶
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}