'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Drawer, Stack, SxProps, Typography } from '@/src/ui/mui'
import MenuIcon from '@mui/icons-material/Menu'

import DrawerList from './DrawerList'
import ThemeToggle from './ThemeToggle'

const Header = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  return (
    <nav aria-label='Main Navigation' style={{ position: 'sticky', top: 0 }}>
      <Stack direction='row' flexWrap='wrap' alignItems='center' justifyContent='space-between' width='100%' p={1.5} sx={{ backgroundColor: 'grey.100' }}>
        <Stack direction='row' alignItems='center' spacing={3} sx={{ display: { laptop: 'flex', mobile: 'none' } }}>
          <Stack
            aria-label='Home'
            component='button'
            p={1}
            sx={{ border: 'none', textAlign: 'center',  cursor: 'pointer', backgroundColor: 'grey.100' }}
            onClick={() => router.push('/')}
          >
            <img src='/logo.png' width={30} height={30} alt='logo' />
          </Stack>
          <Stack
            aria-label='Officetel'
            component='button'
            p={1}
            sx={{ border: 'none', textAlign: 'center', cursor: 'pointer', backgroundColor: 'grey.100' }}
            onClick={() => router.push('/officetel')}
          >
            <Typography sx={menuName}>오피스텔</Typography>
          </Stack>
          <Stack
            aria-label='villa'
            component='button'
            p={1}
            sx={{ border: 'none', textAlign: 'center', cursor: 'pointer', backgroundColor: 'grey.100' }}
            onClick={() => router.push('/villa')}
          >
            <Typography sx={menuName}>빌라, 투룸+</Typography>
          </Stack>
          <Stack
            aria-label='oneroom'
            component='button'
            p={1}
            sx={{ border: 'none', textAlign: 'center', cursor: 'pointer', backgroundColor: 'grey.100' }}
            onClick={() => router.push('/oneroom')}
          >
            <Typography sx={menuName}>원룸</Typography>
          </Stack>
        </Stack>
        <Stack direction='row' alignItems='center' spacing={1} sx={{ display: { laptop: 'none', mobile: 'flex' } }}>
          <Stack
            aria-label='메뉴 열기'
            component='button'
            p={1}
            sx={{ border: 'none', textAlign: 'center',  cursor: 'pointer', backgroundColor: 'grey.100' }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon aria-hidden='true' width={30} height={30} sx={{ color: 'grey.800' }} />
          </Stack>
        </Stack>
        <ThemeToggle />
        <Drawer
          anchor='left'
          open={open}
          onClose={() => setOpen(!open)}
          sx={drawerStyleProp}
        >
          <DrawerList onClose={() => setOpen(false)}/>
        </Drawer>
      </Stack>
    </nav>
  )
}

export default Header

const menuName: SxProps = {
  fontSize: '1rem',
  fontWeight: 600,
  color: 'grey.600',
}

const drawerStyleProp: SxProps = {
  '.css-10cyd05-MuiPaper-root-MuiDrawer-paper': {
    backgroundColor: 'grey.200',
  }
}
