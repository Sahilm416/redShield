import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import './globals.css'



export const metadata: Metadata = {
  title: 'xauth',
  description: 'authentication library',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  )
}
