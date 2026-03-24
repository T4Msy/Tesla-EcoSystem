import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tesla Ecosystem',
  description: 'Intelligent Energy Management Platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="noise-overlay">{children}</body>
    </html>
  )
}
