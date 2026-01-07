import StudioClient from './StudioClient'

// Required for static export mode (GitHub Pages)
// For optional catch-all routes, return an array with an empty object
export function generateStaticParams() {
  return [{ index: [] }]
}

export default function StudioPage() {
  return <StudioClient />
}

