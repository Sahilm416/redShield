import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import './globals.css'
import { Toaster } from 'sonner';


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
      <body className=''>
        <Navbar/>
        {children}
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  )
}
