'use client'
import Link from 'next/link'

import { useColorModeContext } from '@/src/context/ColorModeContext'
import { DarkIcon, LightIcon } from '@/src/style/icons'
import { Stack } from '@/src/ui/mui'

const ThemeToggle = () => {
  const { colorTheme, setColorTheme } = useColorModeContext()
  const isDarkMode = colorTheme === 'dark'
  return (
    <Stack aria-label='다크모드 선택' sx={{ width: 'fit-content' }}>
      <Link href='#' role="switch" aria-checked={isDarkMode} onClick={() => setColorTheme(isDarkMode ? 'light' : 'dark')}>
        {colorTheme === 'dark' ? <LightIcon fill='white'  /> : <DarkIcon fill='black' />}
      </Link>
    </Stack>
  )
}

export default ThemeToggle
