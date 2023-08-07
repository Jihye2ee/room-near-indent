'use client'
import { PropsWithChildren } from 'react'

import { useColorModeContext } from '@/src/context/ColorModeContext'
import { darkTheme, globalStyles, lightTheme } from '@/src/style/theme'
import { Global } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'

const RootProvider = ({ children }: PropsWithChildren) => {
  const { colorTheme } = useColorModeContext()
  return (
    <MuiThemeProvider theme={colorTheme === 'dark' ? darkTheme : lightTheme}>
      <Global styles={globalStyles} />
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

export default RootProvider
