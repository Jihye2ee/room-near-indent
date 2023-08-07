'use client'
import Link from 'next/link'

import { useColorModeContext } from '@/src/context/ColorModeContext'
import { DarkIcon, LightIcon } from '@/src/style/icons'
import { Stack } from '@/src/ui/mui'

const ThemeToggle = () => {
  const { colorTheme, setColorTheme } = useColorModeContext()
  const isDarkMode = colorTheme === 'dark' ? true : false
  return (
    <Stack tabIndex={0} role='button' aria-label='다크모드 선택' sx={{ width: 'fit-content' }}>
      {colorTheme === 'dark' ? (
        <Link href='#' aria-checked={isDarkMode} onClick={() => setColorTheme('light')}>
          <LightIcon fill='white'  />
        </Link>
      ) : (
        <Link href='#' aria-checked={isDarkMode}  onClick={() => setColorTheme('dark')}>
          <DarkIcon fill='black' />
        </Link>
      )}
    </Stack>
  )
}

export default ThemeToggle
