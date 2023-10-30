'use client'
import { isEmpty } from 'lodash-es'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { getCortarsInfo } from '@/src/data/local/queries'
import { CortarInfo } from '@/src/data/local/types'
import { getNaverLandArticleData, getNaverlandData } from '@/src/data/naverland/queries'
import { getOneroomIDs } from '@/src/data/oneroom/queries'
import { getLandList } from '@/src/data/queries'
import { ArticleData, ClusterData, PropertyInfo } from '@/src/data/types'
import FilterBox from '@/src/ui/components/FilterBox'
import LandList from '@/src/ui/components/LandList'
import MapComponent from '@/src/ui/components/MapComponent'
import NaverlandList from '@/src/ui/components/NaverlandList'
import styled from '@emotion/styled'

import { filterState, naverlandResultState, State, zigbangResultState } from '../recoil-state'

const Oneroom = () => {
  const path = usePathname()
  const conditions = useRecoilValue(filterState)
  const setZigbangResult = useSetRecoilState(zigbangResultState)
  const [naverlandResult, setNaverlandResult] = useRecoilState(naverlandResultState)
  const [loading, setLoading] = useState(false)

  const applySearch = useCallback(async (state: State) => {
    if (state.site === 'naver') {
      try {
        const cortarsInfo: CortarInfo = await getCortarsInfo({ x: state.area.x, y: state.area.y })
        const cortarNo = cortarsInfo.documents.filter(document => document.region_type === 'B')?.[0].code
        const clusterData: ClusterData = await getNaverLandArticleData(path.replace('/', ''), state, cortarNo)
        const totalCount = clusterData.data.ARTICLE.reduce((acc, cur) => acc + cur.count, 0)
        const naverlist: ArticleData = await getNaverlandData(path.replace('/', ''), state, totalCount, cortarNo)

        setNaverlandResult({ totalCount: totalCount, ariticles: clusterData.data.ARTICLE, cortarNo: cortarNo, naverList: naverlist })
        setLoading(false)
      } catch {
        alert('조회 중 에러가 발생했습니다')
        setLoading(false)
      }
    } else if (state.site === 'zigbang') {
      try {
        const { uniqueItemIds, clusters, items } = await getOneroomIDs(state)
        const list: PropertyInfo[] = await getLandList(uniqueItemIds)
        const filteredList = list.filter(item =>
          Number(item.random_location.lng) >= Number(state.area.bounds.leftLon) && Number(item.random_location.lng) < Number(state.area.bounds.rightLon)
          && Number(item.random_location.lat) >= Number(state.area.bounds.bottomLat) && Number(item.random_location.lat) < Number(state.area.bounds.topLat))
        const newClusters = clusters?.filter(cluster =>
          cluster.lat >= Number(state.area.bounds.bottomLat) && cluster.lat < Number(state.area.bounds.topLat)
          && cluster.lng >= Number(state.area.bounds.leftLon) && cluster.lng < Number(state.area.bounds.rightLon)
        )
        setZigbangResult({ items, clusterList: newClusters, uniqueItemIds, zigbangList: list, displayedZigbangList: filteredList })
        setLoading(false)
      } catch {
        alert('조회 중 에러가 발생했습니다')
        setLoading(false)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])

  const handlePagination = async (page: number) => {
    const naverlist: ArticleData = await getNaverlandData(path.replace('/', ''), conditions, naverlandResult.totalCount, naverlandResult.cortarNo, page)
    setNaverlandResult({ ...naverlandResult, naverList: naverlist })
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
            <LandList loading={loading} />
          ) : (
            <NaverlandList handlePagination={handlePagination} loading={loading} />
          )}
        </LandListContainer>
      </Content>
    </Container>
  )
}

export default Oneroom

const Container = styled.main`
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
