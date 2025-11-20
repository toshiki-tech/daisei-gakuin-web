'use client'

import Image from 'next/image'
import { useState } from 'react'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

interface LogoProps {
  size?: number
  className?: string
  invert?: boolean
  variant?: 'header' | 'footer'
}

export default function Logo({ size = 64, className = '', invert = false, variant = 'footer' }: LogoProps) {
  // Header variant: show SVG logo with text
  if (variant === 'header') {
    return <HeaderLogo className={className} />
  }

  // Footer variant: show original image
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return (
      <div className={className} style={{ width: size, height: size }}>
        <LogoSVG size={size} invert={invert} />
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <Image
        src={`${basePath}/images/logo/daisei-logo.jpg`}
        alt="大成学院"
        width={size}
        height={size}
        className="object-contain"
        priority
        onError={() => setImageError(true)}
      />
    </div>
  )
}

// Header Logo with Image + Text
function HeaderLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo Image */}
      <div className="relative flex-shrink-0" style={{ width: 64, height: 64 }}>
        <Image
          src={`${basePath}/images/logo/daisei-logo.png`}
          alt="大成学院"
          width={64}
          height={64}
          className="object-contain"
          priority
        />
      </div>
      
      {/* Text content */}
      <div className="flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-ink leading-[1.1] tracking-tight text-center" style={{ fontFamily: 'serif, "Noto Serif SC", "SimSun", serif', letterSpacing: '-0.02em' }}>
          大成学院
        </span>
        <span className="text-[10px] text-ink/50 font-light leading-tight mt-1 text-center" style={{ letterSpacing: '0.2em', fontVariant: 'small-caps' }}>
           WWW.DCXY.JP
        </span>
      </div>
    </div>
  )
}

// SVG Logo Component (fallback based on the original description)
function LogoSVG({ size, invert }: { size: number; invert: boolean }) {
  const primaryColor = invert ? '#FFFFFF' : '#BB3A2E' // 朱砂红
  const secondaryColor = invert ? '#FFFFFF' : '#1A1A1A' // 墨黑
  const accentColor = invert ? '#FFFFFF' : '#CE3B32' // 赤红
  
  // 根据尺寸调整线条粗细
  const strokeWidth = Math.max(2, size / 32)
  const fontSize = Math.max(24, size * 0.4)

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* 毛笔笔杆 - 加粗，确保清晰 */}
      <rect
        x="65"
        y="20"
        width="70"
        height="100"
        rx="35"
        fill={secondaryColor}
      />
      
      {/* 毛笔笔杆装饰 - 红色竖线，加粗 */}
      <line
        x1="100"
        y1="30"
        x2="100"
        y2="110"
        stroke={primaryColor}
        strokeWidth={strokeWidth * 2}
        opacity="0.7"
      />
      
      {/* 毛笔笔头 - 更大更清晰 */}
      <ellipse
        cx="100"
        cy="125"
        rx="40"
        ry="45"
        fill={secondaryColor}
      />
      
      {/* 毛笔笔尖 - 简化分叉 */}
      <path
        d="M 60 145 Q 80 155 100 160 Q 120 155 140 145 Q 100 180 60 145"
        fill={secondaryColor}
      />

      {/* 武士刀 - 加粗，确保清晰 */}
      {/* 刀尖 - 更大 */}
      <path
        d="M 100 20 L 112 8 L 118 0 L 106 0 L 100 8 Z"
        fill={primaryColor}
      />
      
      {/* 刀身 - 加粗加宽 */}
      <rect
        x="96"
        y="8"
        width={Math.max(6, strokeWidth * 2.5)}
        height="70"
        rx={strokeWidth * 1.5}
        fill={primaryColor}
        transform="rotate(-25 100 43)"
      />
      
      {/* 刀身光泽 - 加粗 */}
      <line
        x1="100"
        y1="15"
        x2="100"
        y2="72"
        stroke={accentColor}
        strokeWidth={strokeWidth * 1.5}
        opacity="0.9"
        transform="rotate(-25 100 43.5)"
      />
      
      {/* 刀柄装饰 - 红色绑带，加粗 */}
      <rect
        x="82"
        y="62"
        width="36"
        height={Math.max(6, strokeWidth * 2.5)}
        rx={strokeWidth * 1.5}
        fill={accentColor}
        transform="rotate(-25 100 62)"
      />

      {/* 文字 "大" - 加粗，确保清晰 */}
      <text
        x="100"
        y="185"
        fontSize={fontSize}
        fontWeight="900"
        fill={primaryColor}
        textAnchor="middle"
        fontFamily="serif, 'Noto Serif SC', 'SimSun', serif"
        letterSpacing="2"
      >
        大
      </text>

      {/* 印章边框 - 加粗 */}
      <rect
        x="15"
        y="15"
        width="170"
        height="170"
        rx="10"
        stroke={primaryColor}
        strokeWidth={strokeWidth * 1.5}
        fill="none"
        opacity="0.6"
      />
      
      {/* 印章四角装饰 - 加粗 */}
      <path
        d="M 15 15 L 30 15 L 15 30 Z"
        fill={primaryColor}
        opacity="0.6"
      />
      <path
        d="M 185 15 L 170 15 L 185 30 Z"
        fill={primaryColor}
        opacity="0.6"
      />
      <path
        d="M 15 185 L 30 185 L 15 170 Z"
        fill={primaryColor}
        opacity="0.6"
      />
      <path
        d="M 185 185 L 170 185 L 185 170 Z"
        fill={primaryColor}
        opacity="0.6"
      />
    </svg>
  )
}
