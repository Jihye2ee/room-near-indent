'use client'
import { PropsWithChildren } from 'react'
import { RecoilRoot } from 'recoil'

import { useColorModeContext } from '@/src/context/ColorModeContext'
import { darkTheme, globalStyles, lightTheme } from '@/src/style/theme'
import { Global } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const { colorTheme } = useColorModeContext()
  return (
    <RecoilRoot>
      <MuiThemeProvider theme={colorTheme === 'dark' ? darkTheme : lightTheme}>
        <Global styles={globalStyles} />
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </RecoilRoot>
  )
}

export default ThemeProvider
