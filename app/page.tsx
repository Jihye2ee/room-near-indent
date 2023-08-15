'use client'
import Link from 'next/link'
import { useState } from 'react'

import { Button, ToggleButton } from '@/src/ui/atoms'
import AddressSearchInput from '@/src/ui/components/AddressSearchInput'
import { Box, Fade, Stack, ToggleButtonGroup, Typography } from '@/src/ui/mui'

export default function Home() {
  const [type, setType] = useState<string>('')

  return (
    <Stack position='relative' height='100%'>
      <Stack display='inline-flex' position='absolute' top={0} alignItems='center' justifyContent='center' sx={{ backgroundColor: 'grey.100', p: 4, }}>
        <Typography sx={{ fontSize: '20px', fontWeight: 500, lineHeight: '20px', my: 2 }} tabIndex={0} aria-label='회사 근처 집을 찾고 계신가요'>회사 근처 🏠을 찾고 계신가요?</Typography>
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
    </Stack>
  )
}
