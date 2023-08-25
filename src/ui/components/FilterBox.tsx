'use client'
import { useMemo } from 'react'
import { useRecoilState } from 'recoil'

import { filterState } from '@/app/recoil-state'
import { KakaoItem } from '@/src/data/local/types'
import useDeviceType from '@/src/hooks/DeviceType'
import { Box, Fade, Stack, Typography } from '@/src/ui/mui'

import AddressSearchInput from './AddressSearchInput'
import Conditions from './Conditions'
import { depositMarks } from './DepositPriceSlider'
import { rentMarks } from './RentPriceSlider'

type Props = {
  isOpen: boolean
  open: (isOpen: boolean) => void
}
const FilterBox = ({ isOpen, open }: Props) => {
  const { isMobile } = useDeviceType()
  const [conditions, setState] = useRecoilState(filterState)

  const depositMaxText = useMemo(() =>
    conditions.deposit[1] === 40000? '' : depositMarks.find(mark => mark.value === conditions.deposit[1])?.label ?? ''
  , [conditions.deposit])

  const rentMaxText = useMemo(() =>
    conditions.rent[1] === 150 ? '' : rentMarks.find(mark => mark.value === conditions.rent[1])?.label ?? ''
  , [conditions.rent])

  return (
    <Stack position={{ laptop: 'absolute', mobile: 'sticky' }} direction='column' sx={{ top: { laptop: 100, mobile: -1 }, left: { laptop: 20, mobile: 0 }, zIndex: 9999, backgroundColor: 'grey.100' }} width={{ laptop: 400, tablet: '100%', mobile: '100%' }}>
      <Stack>
        <AddressSearchInput onChange={(value: KakaoItem) => setState({ ...conditions, area: value })}/>
      </Stack>
      <Stack position='relative' direction='row' ml={2} mb={1} spacing={1}>
        <Typography
          component='button'
          variant='body2'
          sx={{ p: 1, border: '0.5px solid', borderColor: 'grey.500', borderRadius: 1, backgroundColor: 'grey.100', cursor: 'pointer', ':hover': { opacity: 0.6 } }}
          onClick={() => open(!isOpen)}
        >
          {conditions.site === 'zigbang' ? '직방' : '네이버 부동산'}
        </Typography>
        <Typography
          variant='body2'
          component='button'
          sx={{ p: 1, border: '0.5px solid', borderColor: 'grey.500', borderRadius: 1, backgroundColor: 'grey.100', cursor: 'pointer', ':hover': { opacity: 0.6 }  }}
          onClick={() => open(!isOpen)}
        >
          {conditions.type === 'deposit'
            ? `전세${depositMaxText && `(~${depositMaxText})`}`
            : `월세${!depositMaxText && !rentMaxText ? ' ･ 금액' : !depositMaxText ? '(' : ''} ${depositMaxText && `(~${depositMaxText}${rentMaxText && '/'}`}${rentMaxText && `~${rentMaxText})`}${!depositMaxText && !rentMaxText ? '' : !rentMaxText ? ')' : ''}`
          }
        </Typography>
      </Stack>
      <Box role='dialog' aria-hidden={!isOpen} position='relative' onClick={() => open(!isOpen)} sx={{ cursor: 'pointer' }} width={{ laptop: 400, tablet: '100%', mobile: '100%' }}>
        {isOpen && (<>
          {isMobile && <Stack position='fixed' sx={{ zIndex: 10, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.7)', overflow: 'hidden' }} />}
          <Stack position='absolute' sx={{ top: '-1px', left: 0, right: 0, bottom: 0, zIndex: 99, }} width={{ laptop: 400, tablet: '100%', mobile: '100%' }} onClick={(event) => event.stopPropagation()}>
            <Fade in={true} timeout={1000}>
              <Stack sx={{ backgroundColor: 'grey.100' }}>
                <Conditions />
              </Stack>
            </Fade>
          </Stack>
        </>)}
      </Box>
    </Stack>
  )
}

export default FilterBox
