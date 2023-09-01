import localFont from 'next/font/local'

import { ColorModeProvider } from '@/src/context/ColorModeContext'
import Header from '@/src/ui/components/Header'

import ThemeProvider from './ThemeProvider'

import type { Metadata } from 'next'
const pretendard = localFont({ src: '../public/fonts/PretendardVariable.woff2', variable: '--font-pretendard' })

export const metadata: Metadata = {
  title: 'Find room nearby - 원하는 곳 주변 매물 검색',
  description: '회사 근처 집을 알아보고 계신가요? 여러 부동산 매물 검색 사이트를 한 곳에서 편하게 검색하세요!',
  keywords: '주변 원룸, 주변 오피스텔, 주변 빌라, 주변 전세, 주변 월세, 매물 찾기, 주거 환경 검색',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'Find room nearby',
    url: 'https://findroomnearby.com',
    title: 'Find room nearby - 원하는 곳 주변 매물 검색',
    description:
      '회사 근처 집을 알아보고 계신가요? 여러 부동산 매물 검색 사이트를 한 곳에서 편하게 검색하세요!',
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
      </head>
      <body className={pretendard.className}>
        <script dangerouslySetInnerHTML={{ __html: ColorModeScript }} />
        <ColorModeProvider>
          <ThemeProvider>
            <Header />
            {children}
          </ThemeProvider>
        </ColorModeProvider>
      </body>
    </html>
  )
}
