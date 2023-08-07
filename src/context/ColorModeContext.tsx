'use client'
import { createContext, useContext, useEffect, useRef, useState } from 'react'

interface ColorModeContextProps {
  colorTheme: 'dark' | 'light'
  setColorTheme: (value: 'dark' | 'light') => void
}

const ColorModeContext = createContext<ColorModeContextProps | null>(null)

const ColorModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorTheme, setDefaultColorTheme] = useState<'dark' | 'light'>('light')
  const firstRender = useRef(true)
  const setColorTheme = (value: 'dark' | 'light') => {
    setDefaultColorTheme(value)
    localStorage.setItem('theme', value === 'light' ? 'light' : 'dark')

    if (value === 'light') {
      document.body.classList.remove('dark')
    } else {
      document.body.classList.add('dark')
    }
  }

  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    if (firstRender.current) {
      const localStorageTheme = localStorage.getItem('theme') as 'light' | 'dark'
      const theme = localStorageTheme || systemTheme
      setColorTheme(theme === 'light' ? 'light' : 'dark')
      firstRender.current = false
    } else {
      setColorTheme(systemTheme === 'light' ? 'light' : 'dark')
    }
  }, [])

  return (
    <ColorModeContext.Provider value={{ colorTheme, setColorTheme }}>
      {children}
    </ColorModeContext.Provider>
  )
}

const useColorModeContext = () => {
  const context = useContext(ColorModeContext)
  if (context === null) {
    throw new Error('useColorModeContext must be used within a ThemeProvider')
  }

  return context
}

export { ColorModeProvider, useColorModeContext }
