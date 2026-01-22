import './globals.css'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Favicon and Icons */}
        <link rel="icon" type="image/x-icon" href={`${basePath}/favicon.ico`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${basePath}/daisei-icons/favicon-32.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${basePath}/daisei-icons/favicon-16.png`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${basePath}/daisei-icons/apple-touch-icon-180.png`} />
        <link rel="manifest" href={`${basePath}/manifest.json`} />
      </head>
      <body>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
