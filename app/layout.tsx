import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import './globals.css'
import { Lato } from 'next/font/google'
import { Toaster } from 'sonner';

const lato = Lato({
  subsets: ["latin"],
  weight: '700'
})
export const metadata: Metadata = {
  title: 'Red Shield',
  description: 'Redis authentication library',
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
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  )
}
