'use client'
import { isEmpty } from 'lodash-es'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { getCortarsInfo } from '@/src/data/local/queries'
import { CortarInfo } from '@/src/data/local/types'
import { getNaverlandData, getNaverLandDataTotalCount } from '@/src/data/naverland/queries'
import { getLandList } from '@/src/data/queries'
import { ArticleData, ClusterData, NaverlandItem, PropertyInfo } from '@/src/data/types'
import { getVillaItemIDs } from '@/src/data/villa/queries'
import useDeviceType from '@/src/hooks/DeviceType'
import Conditions, { State } from '@/src/ui/components/Conditions'
import FilterBox from '@/src/ui/components/FilterBox'
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
  const [naverlandList, setNaverlandList] = useState<ArticleData>()
  const [totalCount, setTotalCount] = useState<number>(0)
  const [cortarNo, setCortarNo] = useState<string>('')
  const [filterOpen, setFilterOpen] = useState(false)

  const applySearch = useCallback(async (state: State) => {
    if (state.site === 'naver') {
      const cortarsInfo: CortarInfo = await getCortarsInfo({ x: state.area.x, y: state.area.y })
      const cortarNo = cortarsInfo.documents.filter(document => document.region_type === 'B')?.[0].code
      const clusterData: ClusterData = await getNaverLandDataTotalCount(path.replace('/', ''), state, cortarNo)
      const totalCount = clusterData.data.ARTICLE.reduce((acc, cur) => acc + cur.count, 0)
      const naverlist: ArticleData = await getNaverlandData(path.replace('/', ''), state, totalCount, cortarNo)
      setNaverlandList(naverlist)
      setCortarNo(cortarNo)
      setTotalCount(totalCount)
    } else if (state.site === 'zigbang') {
      const itemIDs = await getVillaItemIDs(state)
      const list: PropertyInfo[] = await getLandList(itemIDs)
      const newList = list.filter(item =>
        Number(item.random_location.lng) >= Number(state.area.bounds.leftLon) && Number(item.random_location.lng) < Number(state.area.bounds.rightLon)
        && Number(item.random_location.lat) >= Number(state.area.bounds.bottomLat) && Number(item.random_location.lat) < Number(state.area.bounds.topLat))
      setLandList(newList)
    }
  }, [path])

  const handlePagination = useCallback(async (page: number) => {
    const naverlist: ArticleData = await getNaverlandData(path.replace('/', ''), conditions, totalCount, cortarNo, page)
    setNaverlandList(naverlist)
  }, [])

  useEffect(() => {
    if (isEmpty(conditions.area.x) || isEmpty(conditions.area.y)) return
    applySearch(conditions)
  }, [applySearch, conditions])

  return (
    <Stack sx={{ flexDirection: { laptop: 'row', mobile: 'column' }, height: 'calc(100% - 64px)', overflowX: 'hidden', overflowY: filterOpen ? 'hidden' : 'auto', backgroundColor: 'grey.100' }}>
      <Stack position='relative' id='map' width='100%' height='100%' flex={0.7} display={{ laptop: 'block', tablet: 'none', mobile: 'none' }} />
      <FilterBox isOpen={filterOpen} open={setFilterOpen} />
      <Stack flex={{ laptop: 0.3, mobile: 1 }} gap={2} sx={{ width: { laptop: 400, mobile: '100%' }, height: '100%', overflowY: 'auto', backgroundColor: 'grey.100' }}>
        <Fade in={true} timeout={1000}>
          <Stack mx={1}>
            {conditions.site === 'zigbang' ? (
              <LandList items={landList} />
            ) : (
              <NaverlandList item={naverlandList} totalCount={totalCount} handlePagination={handlePagination}/>
            )}
          </Stack>
        </Fade>
      </Stack>
    </Stack>
  )
}

export default Villa
