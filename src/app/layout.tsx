import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Providers } from '@/app/providers'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { ThemeProvider } from 'next-themes'
import { ViewTransitions } from 'next-view-transitions'
import type { ReactNode } from 'react'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

// ToDo: description
export const metadata: Metadata = {
  title: {
    template: '%s | Kloda',
    default: 'Kloda | Клода',
  },
  description: 'Kloda | Клода',
  generator: 'Next.js',
  applicationName: 'Kloda',
  keywords: ['Kloda', 'Клода'],
  creator: 'Sergei Fediaev',
  icons:
    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".8em" font-size="120">♤</text></svg>',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <ViewTransitions>
      <html lang='en' suppressHydrationWarning>
        <body
          className={`${geistSans.variable}${geistMono.variable} antialiased`}
        >
          <ThemeProvider attribute='class'>
            <div className='flex min-h-svh flex-col bg-ground text-primary dark:bg-ground-dark dark:text-primary-dark'>
              <Header />
              <main className='flex flex-grow'>
                <Providers>{children}</Providers>
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  )
}
