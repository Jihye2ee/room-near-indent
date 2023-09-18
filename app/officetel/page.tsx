'use client'
import { isEmpty } from 'lodash-es'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { getCortarsInfo, getKakaoKeywordSearch } from '@/src/data/local/queries'
import { CortarInfo, KakaoAddressResult, KakaoKeywordItem } from '@/src/data/local/types'
import { getNaverLandArticleData, getNaverlandData } from '@/src/data/naverland/queries'
import { getOfficetelItemIDs } from '@/src/data/officetel/queries'
import { getLandList } from '@/src/data/queries'
import { ArticleData, ArticleItem, ClusterData, PropertyInfo } from '@/src/data/types'
import FilterBox from '@/src/ui/components/FilterBox'
import LandList from '@/src/ui/components/LandList'
import MapComponent from '@/src/ui/components/MapComponent'
import NaverlandList from '@/src/ui/components/NaverlandList'
import styled from '@emotion/styled'

import { filterState, naverlandResultState, State, zigbangResultState } from '../recoil-state'

const Officetel = () => {
  const path = usePathname()
  const conditions = useRecoilValue(filterState)

  const setZigbangResult = useSetRecoilState(zigbangResultState)
  const [naverlandResult, setNaverlandResult] = useRecoilState(naverlandResultState)
  const [loading, setLoading] = useState<boolean>(false)

  const applySearch = useCallback(async (state: State) => {
    if (state.site === 'zigbang') {
      const { uniqueItemIds, buildings, items } = await getOfficetelItemIDs(state)
      const zigbangList: PropertyInfo[] = await getLandList(uniqueItemIds)
      const filteredList = zigbangList.filter(item =>
        Number(item.random_location.lng) >= Number(state.area.bounds.leftLon) && Number(item.random_location.lng) < Number(state.area.bounds.rightLon)
        && Number(item.random_location.lat) >= Number(state.area.bounds.bottomLat) && Number(item.random_location.lat) < Number(state.area.bounds.topLat))
      const newBuildingList = buildings.filter(building => building.lng >= Number(state.area.bounds.leftLon) && building.lng < Number(state.area.bounds.rightLon)
        && building.lat >= Number(state.area.bounds.bottomLat) && building.lat < Number(state.area.bounds.topLat))

      const newList = await getConvinientStoreList(filteredList) as PropertyInfo[]
      setZigbangResult({ items, buildings: newBuildingList, uniqueItemIds, zigbangList, displayedZigbangList: newList })
      setLoading(false)
    } else if (state.site === 'naver') {
      const cortarsInfo: CortarInfo = await getCortarsInfo({ x: state.area.x, y: state.area.y })
      const cortarNo = cortarsInfo.documents.filter(document => document.region_type === 'B')?.[0].code
      const clusterData: ClusterData = await getNaverLandArticleData(path.replace('/', ''), state, cortarNo)
      if (!clusterData.data.ARTICLE) {
        setLoading(false)
        return
      }
      const totalCount = clusterData.data.ARTICLE.reduce((acc, cur) => acc + cur.count, 0)
      const naverlist: ArticleData = await getNaverlandData(path.replace('/', ''), state, totalCount, cortarNo)

      const newList = await getConvinientStoreList(naverlist.body) as ArticleItem[]
      naverlist.body = newList
      setNaverlandResult({ totalCount: totalCount, ariticles: clusterData.data.ARTICLE, cortarNo: cortarNo, naverList: naverlist })
      setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getConvinientStoreList =  async (filteredList: PropertyInfo[] | ArticleItem[]) => {
    const results = await Promise.all(
      filteredList.map(async listItem => {
        const x = 'random_location' in listItem ? listItem.random_location.lng.toString() : listItem.lng.toString()
        const y = 'random_location' in listItem ? listItem.random_location.lat.toString() : listItem.lat.toString()

        const keywordResult: KakaoAddressResult = await getKakaoKeywordSearch({ query: '편의점', x, y, radius: 200 })
        return {
          ...listItem,
          category_group: {
            ...listItem.category_group,
            convenience_store: keywordResult.documents as KakaoKeywordItem[]
          }
        }
      })
    )

    return results
  }

  const handlePagination = async (page: number) => {
    const naverlist = await getNaverlandData(path.replace('/', ''), conditions, naverlandResult.totalCount, naverlandResult.cortarNo, page)
    const newList = await getConvinientStoreList(naverlist.body) as ArticleItem[]
    naverlist.body = newList
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

