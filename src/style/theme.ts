
import { css } from '@emotion/react'
import { createTheme } from '@mui/material/styles'

import breakpoints from './breakpoints'

export const baseTheme = createTheme({
  breakpoints: breakpoints,
  palette: {
    grey: {
      '50': '#F8F9FA',
      '100': '#F1F3F5',
      '200': '#DFE4EA',
      '300': '#C9CFD6',
      '400': '#AAB2B9',
      '500': '#7B848D',
      '600': '#4D5359',
      '700': '#3A4046',
      '800': '#2C3136',
      '900': '#1F2124',
    },
  },
  typography: {
    body2: {
      color: 'var(--text-color)',
    },
    body1: {
      color: 'var(--text-color)',
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        },
        html: {
          height: '100%',
          width: "100%"
        },
        body: {
          height: '100%',
          width: "100%",
          background: 'var(--background)',
          color: 'var(--text-color)',
        },
        a: {
          color: 'inherit',
          textDecoration: 'none'
        },
        // button: {
        //   color: 'var(--text-color)',
        // }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // color: 'var(--text-color)',
          // '&.Mui-disabled': {
          //   color: 'var(--text-color)',
          //   background: 'var(--background)',
          // },
          // boxShadow: 'none',
          // ':hover': {
          //   boxShadow: 'none',
          // },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
  },
})

export const lightTheme = createTheme(baseTheme)

export const darkTheme = createTheme(baseTheme, {
  palette: {
    mode: 'dark',
    grey: {
      '50': '#1F2124', // 블랙에 가까운
      '100': '#2C3136',
      '200': '#3A4046',
      '300': '#4D5359',
      '400': '#7B848D',
      '500': '#AAB2B9',
      '600': '#C9CFD6',
      '700': '#DFE4EA',
      '800': '#F1F3F5',
      '900': '#F8F9FA', // 흰색에 가까운
    },
  },
})

export const globalStyles = css`
  :root {
    --background: white;
    --text-color: black;
  }

  .dark {
    --background: black;
    --text-color: white;
  }
`
