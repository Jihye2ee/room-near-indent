import { useColorModeContext } from '@/src/context/ColorModeContext'
import { DarkIcon, LightIcon } from '@/src/style/icons'
import { Stack } from '@/src/ui/mui'

const ThemeToggle = () => {
  const { colorTheme, setColorTheme } = useColorModeContext()
  const isDarkMode = colorTheme === 'dark'
  return (
    <Stack
      tabIndex={0}
      aria-label='다크모드 선택'
      sx={{ width: 'fit-content', background: 'none', border: 'none', cursor: 'pointer' }}
      component='switch'
      role='switch'
      aria-checked={isDarkMode}
      onClick={() => setColorTheme(isDarkMode ? 'light' : 'dark')}
      onKeyDown={(e) => e.key === 'Enter' && setColorTheme(isDarkMode ? 'light' : 'dark')}
    >
      {colorTheme === 'dark' ? <LightIcon fill='white' /> : <DarkIcon fill='black' />}
    </Stack>
  )
}

export default ThemeToggle
