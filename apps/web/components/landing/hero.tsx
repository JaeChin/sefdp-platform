'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const heroPhotos = [
  '/images/image21.jpg',
  '/images/image28.jpg',
  '/images/image27.jpg',
  '/images/image38.jpg',
  '/images/image43.jpg',
  '/images/image23.jpg',
  '/images/image42.jpg',
  '/images/image39.jpg',
  '/images/image21.jpg',
  '/images/image28.jpg',
  '/images/image27.jpg',
  '/images/image38.jpg',
  '/images/image43.jpg',
  '/images/image23.jpg',
  '/images/image42.jpg',
  '/images/image39.jpg',
]

function shuffle<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = arr[i] as T
    arr[i] = arr[j] as T
    arr[j] = tmp
  }
  return arr
}

function generateSquares() {
  return shuffle(heroPhotos).map((src, i) => (
    <motion.div
      key={`${src}-${i}-${Math.random()}`}
      layout
      transition={{ duration: 1.5, type: 'spring' }}
      className="h-full w-full rounded-lg overflow-hidden"
    >
      <div className="relative h-full w-full">
        <Image
          src={src}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 25vw, 12vw"
        />
      </div>
    </motion.div>
  ))
}

function ShuffleGrid() {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [squares, setSquares] = useState(() => generateSquares())

  useEffect(() => {
    const shuffleSquares = () => {
      setSquares(generateSquares())
      timeoutRef.current = setTimeout(shuffleSquares, 3000)
    }
    timeoutRef.current = setTimeout(shuffleSquares, 3000)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div className="grid grid-cols-4 grid-rows-4 gap-1.5 h-[450px]">
      {squares}
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-emerald-500">
              World Bank DARES Programme · Nigeria
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Powering Nigeria&apos;s
              <br />
              <span className="text-emerald-500">Clean Energy</span>{' '}
              Transition
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              The digital backbone for the $750M DARES programme. Track project applications,
              verify claims, calculate disbursements, and report to stakeholders — all in one platform.
            </p>
            <div className="mt-10">
              <Link
                href="/dashboard"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-emerald-600 px-6 text-base font-medium text-white shadow-lg hover:bg-emerald-700 transition-colors"
              >
                Open DARES Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                Access by invitation only. Platform in active development.
              </p>
            </div>
          </div>

          <div className="relative">
            <ShuffleGrid />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
