"use client"
import React from 'react'

interface SefdpLogoProps {
  size?: 'sm' | 'md' | 'lg'
  showWordmark?: boolean
  variant?: 'light' | 'dark'
  className?: string
}

export default function SefdpLogo({ size = 'md', showWordmark = true, variant = 'light', className = '' }: SefdpLogoProps) {
  const dims = { sm: 20, md: 26, lg: 40 }
  const s = dims[size]
  const textSize = { sm: 13, md: 17, lg: 26 }[size]
  const subSize = { sm: 0, md: 8, lg: 11 }[size]

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Top arc — developer side */}
        <path d="M 4 28 A 22 22 0 0 1 26 6" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
        {/* Bottom arc — financier side */}
        <path d="M 14 34 A 22 22 0 0 1 36 12" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
        {/* Center connection node */}
        <circle cx="20" cy="20" r="3.5" fill="#F59E0B"/>
      </svg>
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span style={{
            fontSize: textSize,
            fontWeight: 700,
            color: variant === 'dark' ? '#0A2540' : '#ffffff',
            letterSpacing: '0.05em',
            fontFamily: 'var(--font-sora, system-ui, sans-serif)'
          }}>
            SEF-DP
          </span>
          {size === 'lg' && subSize > 0 && (
            <span style={{
              fontSize: subSize,
              color: '#94a3b8',
              letterSpacing: '0.15em',
              fontFamily: 'system-ui, sans-serif',
              fontWeight: 500
            }}>
              SUSTAINABLE ENERGY FINANCE
            </span>
          )}
        </div>
      )}
    </div>
  )
}
