import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

type DeviceType = 'mobile' | 'laptop' | 'desktop' | 'tablet'

function useDeviceType() {
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('tablet'))
  const isTablet = useMediaQuery<Theme>((theme) => theme.breakpoints.down('laptop')) && !isMobile
  const isLaptop = !isTablet && !isMobile

  const deviceType: DeviceType = isMobile ? 'mobile' : isTablet ? 'tablet' : isLaptop ? 'laptop' : 'desktop'

  return { deviceType: deviceType, isMobile, isTablet, isLaptop }
}

export default useDeviceType
