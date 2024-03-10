import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MetroRoutesConfigProvider } from './context/metro-routes-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Metro Transit Routes',
  description: 'Web App for viewing and managing your commonly used routes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MetroRoutesConfigProvider>
          {children}
        </MetroRoutesConfigProvider>
      </body>
    </html>
  )
}
