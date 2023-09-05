'use client'
import { isEmpty } from 'lodash-es'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { getCortarsInfo } from '@/src/data/local/queries'
import { CortarInfo } from '@/src/data/local/types'
import { getNaverlandData, getNaverLandDataTotalCount } from '@/src/data/naverland/queries'
import { getOfficetelItemIDs } from '@/src/data/officetel/queries'
import { getLandList } from '@/src/data/queries'
import { ArticleData, ClusterData, PropertyInfo } from '@/src/data/types'
import FilterBox from '@/src/ui/components/FilterBox'
import LandList from '@/src/ui/components/LandList'
import MapComponent from '@/src/ui/components/MapComponent'
import NaverlandList from '@/src/ui/components/NaverlandList'
import styled from '@emotion/styled'

import { filterState, State, zigbangResultState } from '../recoil-state'

const Officetel = () => {
  const path = usePathname()
  const conditions = useRecoilValue(filterState)
  const [zigbangResult, setZigbangResult] = useRecoilState(zigbangResultState)
  const [naverlandList, setNaverlandList] = useState<ArticleData>()
  const [totalCount, setTotalCount] = useState<number>(0)
  const [cortarNo, setCortarNo] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const applySearch = useCallback(async (state: State) => {
    if (state.site === 'zigbang') {
      const { uniqueItemIds, buildings, items } = await getOfficetelItemIDs(state)
      const zigbangList: PropertyInfo[] = await getLandList(uniqueItemIds)
      const newList = zigbangList.filter(item =>
        Number(item.random_location.lng) >= Number(state.area.bounds.leftLon) && Number(item.random_location.lng) < Number(state.area.bounds.rightLon)
        && Number(item.random_location.lat) >= Number(state.area.bounds.bottomLat) && Number(item.random_location.lat) < Number(state.area.bounds.topLat))
      const newBuildingList = buildings.filter(building => building.lng >= Number(state.area.bounds.leftLon) && building.lng < Number(state.area.bounds.rightLon)
        && building.lat >= Number(state.area.bounds.bottomLat) && building.lat < Number(state.area.bounds.topLat))

      setZigbangResult({ items, buildings: newBuildingList, uniqueItemIds, zigbangList, displayedZigbangList: newList })
      setLoading(false)
    } else if (state.site === 'naver') {
      const cortarsInfo: CortarInfo = await getCortarsInfo({ x: state.area.x, y: state.area.y })
      const cortarNo = cortarsInfo.documents.filter(document => document.region_type === 'B')?.[0].code
      const clusterData: ClusterData = await getNaverLandDataTotalCount(path.replace('/', ''), state, cortarNo)
      const totalCount = clusterData.data.ARTICLE.reduce((acc, cur) => acc + cur.count, 0)
      const naverlist: ArticleData = await getNaverlandData(path.replace('/', ''), state, totalCount, cortarNo)
      setNaverlandList(naverlist)
      setTotalCount(totalCount)
      setCortarNo(cortarNo)
      setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePagination = async (page: number) => {
    const naverlist = await getNaverlandData(path.replace('/', ''), conditions, totalCount, cortarNo, page)
    setNaverlandList(naverlist)
  }

  useEffect(() => {
    if (isEmpty(conditions.area.x) || isEmpty(conditions.area.y)) return
    if (isEmpty(conditions.area.bounds.bottomLat)) return
    setLoading(true)
    applySearch(conditions)
  }, [applySearch, conditions])

  return (
    <Container>
      <FilterContainer>
        <FilterBox />
      </FilterContainer>
      <Content>
        <MapContainer>
          <MapComponent />
        </MapContainer>
        <LandListContainer>
          {conditions.site === 'zigbang' ? (
            <LandList items={zigbangResult.displayedZigbangList} loading={loading} />
          ) : (
            <NaverlandList item={naverlandList} totalCount={totalCount} handlePagination={handlePagination} loading={loading} />
          )}
        </LandListContainer>
      </Content>
    </Container>
  )
}

export default Officetel

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 60px);
  overflow: hidden;
`

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--grey-100);
  @media (max-width: 767px) {
    position: relative;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100% - 60px);
  @media (max-width: 767px) {
    flex-direction: column;
  }
`

const MapContainer = styled.div`
  display: flex;
  flex: 0.7;
  @media (max-width: 767px) {
    display: none;
  }
`

const LandListContainer = styled.div`
  display: flex;
  flex: 0.3;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: var(--grey-100);
  border-left: 1px solid var(--grey-200);
  @media (max-width: 767px) {
    flex: 1;
  }
`

