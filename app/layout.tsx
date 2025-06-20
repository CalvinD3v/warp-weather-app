import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Warp Weather App',
  description: 'Traveling in style with your weather companion'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
