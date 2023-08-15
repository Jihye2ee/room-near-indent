'use client'
import { isEmpty } from 'lodash-es'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { getNaverLandCortarNo, getNaverlandData } from '@/src/data/naverland/queries'
import { getLandList } from '@/src/data/queries'
import { NaverlandItem, PropertyInfo } from '@/src/data/types'
import { getVillaItmeIDs } from '@/src/data/villa/queries'
import useDeviceType from '@/src/hooks/DeviceType'
import Conditions, { State } from '@/src/ui/components/Conditions'
import LandList from '@/src/ui/components/LandList'
import NaverlandList from '@/src/ui/components/NaverlandList'
import { Box, Fade, Stack, Typography } from '@/src/ui/mui'
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import { filterState } from '../recoil-state'

const Villa = () => {
  const path = usePathname()
  const conditions = useRecoilValue(filterState)
  const [landList, setLandList] = useState<PropertyInfo[]>([])
  const [naverlandList, setNaverlandList] = useState<NaverlandItem>()
  const [totalCount, setTotalCount] = useState<number>(0)
  const { isMobile } = useDeviceType()
  const [isShow, setIsShow] = useState(!isMobile)

  const applySearch = useCallback(async (state: State) => {
    if (state.site === 'naver') {
      const naverlandAddress = await getNaverLandCortarNo({ x: Number(state.area.x), y: Number(state.area.y) })
      const naverlist = await getNaverlandData(path.replace('/', ''), naverlandAddress, state)
      setNaverlandList(naverlist)
      if (state.page === 1) {
        setTotalCount(naverlist.mapExposedCount)
      }
    } else if (state.site === 'zigbang') {
      const itemIDs = await getVillaItmeIDs(state)
      const list: PropertyInfo[] = await getLandList(itemIDs)
      setLandList(list)
    }
  }, [path])

  useEffect(() => {
    if (isEmpty(conditions.area.x) || isEmpty(conditions.area.y)) return
    applySearch(conditions)
  }, [applySearch, conditions])

  return (
    <Stack height='100%' sx={{ flexDirection: { laptop: 'row', mobile: 'column' }, justifyContent: isMobile ? 'flex-start' : 'center' }}>
      {isMobile && (
        <Stack tabIndex={0} px={2} direction='row' justifyContent='space-between' alignItems='center' sx={{ backgroundColor: 'grey.200' }}>
          <Stack aria-label='필터 옵션 선택' role='button' direction='row' alignItems='center' sx={{ backgroundColor: 'grey.200' }}>
            <FilterAltOutlinedIcon sx={{ backgroundColor: 'grey.200', fontSize: 18 }} />
            <Typography display='flex' alignItems='center' variant='body2' height={36} sx={{ backgroundColor: 'grey.200' }}>필터</Typography>
          </Stack>
          {isShow ? (
            <Link role='checkbox' aria-checked={isShow} aria-label='필터 옵션 닫기' href='#' onClick={() => setIsShow(false)}>
              <ExpandLessOutlinedIcon sx={{ backgroundColor: 'grey.200' }} />
            </Link>
          ) : (
            <Link role='checkbox' aria-checked={isShow} aria-label='필터 옵션 열기' href='#' onClick={() => setIsShow(true)}>
              <ExpandMoreOutlinedIcon sx={{ backgroundColor: 'grey.200' }}  />
            </Link>
          )}
        </Stack>
      )}
      {isShow && (
        <Fade in={isShow} timeout={1000}>
          <Stack>
            <Conditions />
          </Stack>
       </Fade>
      )}
      <Box gap={2} sx={{ width: isMobile ? '100%' : 400, height: 400 }}>
        <Fade in={true} timeout={1000}>
          <Stack>
            {conditions.site === 'zigbang' ? (
              <LandList items={landList} />
            ) : (
              <NaverlandList item={naverlandList} totalCount={totalCount} />
            )}
          </Stack>
        </Fade>
      </Box>
    </Stack>
  )
}

export default Villa
