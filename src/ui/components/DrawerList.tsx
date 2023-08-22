'use client'
import { useRouter } from 'next/navigation'

import { Box, Divider, List, ListItem, ListItemButton, Stack, Typography } from '@/src/ui/mui'
import BedIcon from '@mui/icons-material/Bed'
import BusinessIcon from '@mui/icons-material/Business'
import CloseIcon from '@mui/icons-material/Close'
import HomeIcon from '@mui/icons-material/Home'

type Props = {
  onClose: () => void
}
const DrawerList = ({ onClose }: Props) => {
  const router = useRouter()
  return (
    <Box role='presentation' sx={{ width: 300 }} onClick={onClose} onKeyDown={(e) => e.key === 'Enter' && onClose()}>
      <List sx={listStyleProps}>
        <ListItem>
          <ListItemButton onClick={() => router.push('/')}>
            <img src='/logo.png' width={30} height={30} alt='' />
            <Typography variant='body2' sx={{ color: 'grey.800', fontWeight: 600, ml: 1.5 }}>FindRoomNearBy</Typography>
          </ListItemButton>
          <Stack
            aria-label='닫기'
            component='button'
            sx={{ cursor: 'pointer', background: 'none', border: 'none' }}
            onClick={onClose}
          >
            <CloseIcon sx={{ color: 'grey.800', mr: 1, fontSize: '1.5rem' }} />
          </Stack>
        </ListItem>
        <Divider />
        <ListItem sx={{ mt: 0.5 }}>
          <ListItemButton onClick={() => router.push('/officetel')}>
            <BusinessIcon aria-hidden='true' sx={{ fontSize: '30px', color: 'grey.600' }} />
            <Typography variant='body2' sx={{ color: 'grey.600', fontWeight: 600, ml: 1.5 }}>오피스텔</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => router.push('/villa')}>
            <HomeIcon aria-hidden='true' sx={{ fontSize: '30px', color: 'grey.600' }} />
            <Typography variant='body2' sx={{ color: 'grey.600', fontWeight: 600, ml: 1.5 }}>빌라, 투룸+</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => router.push('/oneroom')}>
            <BedIcon aria-hidden='true' sx={{ fontSize: '30px', color: 'grey.600' }} />
            <Typography variant='body2' sx={{ color: 'grey.600', fontWeight: 600, ml: 1.5 }}>원룸</Typography>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}

export default DrawerList

const listStyleProps = {
  '.MuiListItem-root': {
    paddingRight: 0,
    paddingLeft: 0
  }
}
