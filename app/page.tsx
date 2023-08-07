'use client'
import Link from 'next/link'
import { useState } from 'react'

import { Button, ToggleButton } from '@/src/ui/atoms'
import { ToggleButtonGroup } from '@/src/ui/mui'
import { Fade, Stack, Typography } from '@mui/material'

export default function Home() {
  const [type, setType] = useState<string>('')

  return (
    <Stack alignItems='center' justifyContent='center' height='100%'>
      <Typography sx={{ fontSize: '20px', fontWeight: 500, lineHeight: '20px' }} tabIndex={0} aria-label='회사 근처 집을 찾고 계신가요'>회사 근처 🏠을 찾고 계신가요?</Typography>
      <Typography sx={{ fontSize: '16px', fontWeight: 500, my: 2 }}>👇</Typography>
      <Stack>
        <Fade in={true} timeout={1000}>
          <Stack>
            <ToggleButtonGroup
              value={type}
              exclusive
              sx={{
                mb: 2,
                width: '300px',
              }}
              onChange={(_, value: string) => setType(value)}
              aria-label='원하는 타입 선택'
            >
              <ToggleButton value='officetel' aria-label='오피스텔' sx={{ width: '100%'  }}>
                <Typography variant='body2'>오피스텔</Typography>
              </ToggleButton>
              <ToggleButton value='villa' aria-label='빌라, 투룸+' sx={{ width: '100%' }}>
                <Typography variant='body2'>빌라, 투룸+</Typography>
              </ToggleButton>
              <ToggleButton value='oneroom' aria-label='원룸' sx={{ width: '100%' }}>
                <Typography variant='body2'>원룸</Typography>
              </ToggleButton>
            </ToggleButtonGroup>
            <Link href={`/${type ?? 'officetel'}`}>
              <Button role='button' sx={{ width: '100%' }}>집 찾기 go</Button>
            </Link>
          </Stack>
        </Fade>
      </Stack>
    </Stack>
  )
}
