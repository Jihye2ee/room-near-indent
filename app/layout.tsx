import localFont from 'next/font/local'

import { ColorModeProvider } from '@/src/context/ColorModeContext'
import Header from '@/src/ui/components/Header'

import RootProvider from './Provider'

import type { Metadata } from 'next'
const pretendard = localFont({ src: '../public/fonts/PretendardVariable.woff2', variable: '--font-pretendard' })

export const metadata: Metadata = {
  title: 'Room for Indenter - 인덴터를 위한 방',
  description: '회사 근처 집을 알아보고 계신가요? 편하게 검색하실 수 있습니다.',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'Room for Indenter',
    url: 'https://jamie-playground.com',
    title: 'Room for Indenter - 인덴터를 위한 방',
    description:
      '회사 근처 집을 알아보고 계신가요? 편하게 검색하실 수 있습니다.',
  },
}

const ColorModeScript = `
  (function() {
    const systemColorMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const localStorageColorMode = localStorage.getItem('theme')
    const userColorMode = localStorageColorMode || systemColorMode
    if (userColorMode === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  })();
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <meta name="google-site-verification" content="CpVCplc-3RTh-cY6hgJPKyvXgKzLn97p98WDCKHfQbs" />
      </head>
      <body className={pretendard.className}>
        <script dangerouslySetInnerHTML={{ __html: ColorModeScript }} />
        <ColorModeProvider>
          <RootProvider>
            <Header />
            {children}
          </RootProvider>
        </ColorModeProvider>
      </body>
    </html>
  )
}
