import { BreakpointsOptions } from '@mui/material'

declare module '@mui/material' {
  interface BreakpointOverrides {
    xs: false
    sm: false
    md: false
    lg: false
    xl: false
    mobile: true
    tablet: true
    laptop: true
    desktop: true
  }
}

const breakpoints: BreakpointsOptions = {
  values: {
    mobile: 0,
    tablet: 600,
    laptop: 860,
    desktop: 1200,
  },
}

export default breakpoints
