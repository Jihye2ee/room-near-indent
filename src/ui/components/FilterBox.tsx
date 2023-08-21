'use client'
import { useEffect, useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'

import { filterState } from '@/app/recoil-state'
import { KaKaoAddressItem } from '@/src/data/address/types'
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

  useEffect(() => {
    const kakaoMapScript = document.createElement("script")
    kakaoMapScript.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=73ff0f3832dc2af330ffea582903b997&libraries=services&autoload=false"
    document.head.appendChild(kakaoMapScript)

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map')
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        }

        const map = new window.kakao.maps.Map(container, options)
        map.panTo(options.center)
      })
    }

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI)
  }, [])

  useEffect(() => {
    if (!window || !window.kakao) return
    const container = document.getElementById('map')
    const options = {
      center: new window.kakao.maps.LatLng(conditions.area.y, conditions.area.x),
      level: 5,
    }

    const map = new window.kakao.maps.Map(container, options)
    map.panTo(options.center)
  }, [conditions.area])

  return (
    <Stack position={{ laptop: 'absolute', mobile: 'sticky' }} direction='column' sx={{ top: { laptop: 100, mobile: -1 }, left: { laptop: 20, mobile: 0 }, zIndex: 9999, backgroundColor: 'grey.100' }} width={400}>
      <Stack>
        <AddressSearchInput onChange={(value: KaKaoAddressItem) => setState({ ...conditions, area: value })}/>
      </Stack>
      <Stack position='relative' direction='row' ml={2} mb={1} spacing={1}>
        <Typography
          variant='body2'
          sx={{ p: 1, border: '0.5px solid', borderColor: 'grey.500', borderRadius: 1, }}
          onClick={() => open(!isOpen)}
        >
            {conditions.site}
        </Typography>
        <Typography
          variant='body2'
          sx={{ p: 1, border: '0.5px solid', borderColor: 'grey.500', borderRadius: 1, }}
          onClick={() => open(!isOpen)}
        >
            {conditions.type === 'deposit'
              ? `전세${depositMaxText && `(~${depositMaxText})`}`
              : `월세${!depositMaxText && !rentMaxText ? '' : !depositMaxText ? '(' : ''} ${depositMaxText && `(~${depositMaxText}${rentMaxText && '/'}`}${rentMaxText && `~${rentMaxText})`}${!depositMaxText && !rentMaxText ? '' : !rentMaxText ? ')' : ''}`
            }
        </Typography>
      </Stack>
      <Box position='relative' onClick={() => open(!isOpen)} sx={{ cursor: 'pointer' }}>
        {isOpen && (<>
          {isMobile && <Stack position='fixed' sx={{ zIndex: 10, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.7)', overflow: 'hidden' }} />}
          <Stack position='absolute' sx={{ top: '-1px', left: 0, right: 0, bottom: 0, zIndex: 99 }} onClick={(event) => event.stopPropagation()}>
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
