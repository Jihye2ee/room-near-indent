'use client'
import { isEmpty } from 'lodash-es'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { getCortarsInfo } from '@/src/data/local/queries'
import { CortarInfo } from '@/src/data/local/types'
import { getNaverlandData, getNaverLandDataTotalCount } from '@/src/data/naverland/queries'
import { getOneroomIDs } from '@/src/data/oneroom/queries'
import { getLandList } from '@/src/data/queries'
import { ArticleData, ClusterData, PropertyInfo } from '@/src/data/types'
import useDeviceType from '@/src/hooks/DeviceType'
import Conditions, { State } from '@/src/ui/components/Conditions'
import LandList from '@/src/ui/components/LandList'
import NaverlandList from '@/src/ui/components/NaverlandList'
import { Box, Fade, Stack, Typography } from '@/src/ui/mui'
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import { filterState } from '../recoil-state'

const Oneroom = () => {
  const path = usePathname()
  const conditions = useRecoilValue(filterState)
  const [landList, setLandList] = useState<PropertyInfo[]>([])
  const [naverlandList, setNaverlandList] = useState<ArticleData>()
  const [totalCount, setTotalCount] = useState<number>(0)
  const { isMobile } = useDeviceType()
  const [isShow, setIsShow] = useState(!isMobile)

  const applySearch = useCallback(async (state: State) => {
    if (state.site === 'naver') {
      const cortarsInfo: CortarInfo = await getCortarsInfo({ x: state.area.x, y: state.area.y })
      const cortarNo = cortarsInfo.documents.filter(document => document.region_type === 'B')?.[0].code
      const clusterData: ClusterData = await getNaverLandDataTotalCount(path.replace('/', ''), state, cortarNo)
      const totalCount = clusterData.data.ARTICLE.reduce((acc, cur) => acc + cur.count, 0)
      const naverlist: ArticleData = await getNaverlandData(path.replace('/', ''), state, totalCount, cortarNo)
      setNaverlandList(naverlist)
      if (state.page === 1) {
        setTotalCount(totalCount)
      }
    } else if (state.site === 'zigbang') {
      const itemIDs = await getOneroomIDs(state)
      const list: PropertyInfo[] = await getLandList(itemIDs)
      const newList = list.filter(item =>
        Number(item.random_location.lng) >= Number(state.area.bounds.leftLon) && Number(item.random_location.lng) < Number(state.area.bounds.rightLon)
        && Number(item.random_location.lat) >= Number(state.area.bounds.bottomLat) && Number(item.random_location.lat) < Number(state.area.bounds.topLat))
      setLandList(newList)
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

export default Oneroom
