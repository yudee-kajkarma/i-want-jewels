'use client'

import { useEffect, useState } from 'react'
import type { StaticImageData } from 'next/image'
import braceletImage from '../../assets/image/bracelet.jpeg'
import braceletCloseupImage from '../../assets/image/bracelet1.jpeg'
import earringImage from '../../assets/image/earing.jpeg'
import earringProductImage from '../../assets/image/earing1.jpeg'
import necklaceImage from '../../assets/image/nackwear.jpeg'
import necklaceModelImage from '../../assets/image/nackwear1.jpeg'
import ringImage from '../../assets/image/ring.jpeg'
import ringModelImage from '../../assets/image/ring1.jpeg'

type InstagramImage = string | StaticImageData

const defaultImages = [
  braceletImage,
  braceletCloseupImage,
  ringImage,
  ringModelImage,
  earringImage,
  earringProductImage,
  necklaceImage,
  necklaceModelImage,
]

type InstagramGallerySectionProps = {
  title?: string
  subtitle?: string
  images?: InstagramImage[]
}

function visibleInstagramImages(sourceImages: InstagramImage[], startIndex: number) {
  return Array.from({ length: 6 }, (_, index) => sourceImages[(startIndex + index) % sourceImages.length])
}

function imageSrc(image: InstagramImage) {
  return typeof image === 'string' ? image : image.src
}

export default function InstagramGallerySection({
  title = 'I Want Jewel On Instagram',
  subtitle = '#Atvoguetheme',
  images = defaultImages,
}: InstagramGallerySectionProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveImageIndex((currentIndex) => (currentIndex + 1) % images.length)
    }, 2400)

    return () => {
      window.clearInterval(timer)
    }
  }, [images])

  const rotatingImages = visibleInstagramImages(images, activeImageIndex)
  const mobileImage = rotatingImages[0]

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-3xl font-semibold md:text-4xl">{title}</h2>
        <p className="mt-3 text-sm text-zinc-500 md:text-base">{subtitle}</p>
      </div>

      <div className="mx-auto mt-10 overflow-hidden bg-zinc-100 sm:hidden">
        <img
          src={imageSrc(mobileImage)}
          alt="Instagram jewellery inspiration"
          className="h-[320px] w-full object-cover transition duration-700"
        />
      </div>

      <div className="mx-auto mt-10 hidden max-w-[1860px] gap-0 sm:grid sm:grid-cols-2 lg:grid-cols-6">
        {rotatingImages.map((image, index) => (
          <div key={`${activeImageIndex}-${index}-${imageSrc(image)}`} className="overflow-hidden bg-zinc-100">
            <img
              src={imageSrc(image)}
              alt={`Instagram jewellery inspiration ${index + 1}`}
              className="h-[260px] w-full object-cover transition duration-700 hover:scale-105 md:h-[320px] lg:h-[435px]"
            />
          </div>
        ))}
      </div>
    </section>
  )
}