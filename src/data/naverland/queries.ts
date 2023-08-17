import queryString from 'query-string'

import { State } from '@/src/ui/components/Conditions'

import { NaverlandAddressItem } from '../address/types'

export const getNaverLandCortarNo = async (coords: { x: number, y: number }): Promise<NaverlandAddressItem> => {
  try {
    const queryParams = queryString.stringify({
      zoom: 16,
      centerLat: coords.y,
      centerLon: coords.x,
    })
    const naverURL = `https://new.land.naver.com/api/cortars?${queryParams}`
    const url = `/api/naverland?url=${encodeURIComponent(naverURL)}`
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch(error) {
    throw error
  }
}

export const getNaverLandList = async (item: NaverlandAddressItem, state: State) => {
  try {
    const queryParams = queryString.stringify({
      cortarNo: item.cortarNo,
      zoom: 16,
      priceType: 'RETAIL',
      markerId: '',
      markerType: '',
      selectedComplexNo: '',
      selectedComplexBuildingNo: '',
      fakeComplexMarker: '',
      realEstateType: 'OPST',
      tradeType: state.type === 'deposit' ? 'B1' : 'B2',
      tag: '::::::::',
      rentPriceMin: state.deposit[0],
      rentPriceMax: state.deposit[1],
      priceMin: 0,
      priceMax: 900000000,
      areaMin: 0,
      areaMax: 900000000,
      oldBuildYears: '',
      recentlyBuildYears: '',
      minHouseHoldCount: '',
      maxHouseHoldCount: '',
      showArticle: false,
      sameAddressGroup: false,
      minMaintenanceCost: '',
      maxMaintenanceCost: '',
      directions: '',
      leftLon: state.area.bounds.leftLon,
      rightLon: state.area.bounds.rightLon,
      topLat: state.area.bounds.topLat,
      bottomLat: state.area.bounds.bottomLat,
      isPresale: true
    })
    const naverURL = `https://new.land.naver.com/api/complexes/single-markers/2.0?${queryParams}`
    const url = `/api/naverland?url=${encodeURIComponent(naverURL)}`

    const response = await fetch(url)
    if (!response.ok) throw new Error()

    const data = await response.json()

    return data
  } catch {
    return []
  }
}

export const getNaverlandData = async (path: string, naverlandAddress: NaverlandAddressItem, state: State) => {
  const params = queryString.stringify({
    cortarNo: naverlandAddress.cortarNo,
    order: 'rank',
    realEstateType: path === 'officetel' ? 'OPST' : path === 'villa' ? 'VL' : 'APT:OPST:ABYG:OBYG:GM:OR:VL:DDDGG:JWJT:SGJT:HOJT',
    tradeType: state.type === 'deposit' ? 'B1' : 'B2',
    tag: path === 'oneroom' ? ':::::::SMALLSPCRENT:ONEROOM' : '::::::::',
    rentPriceMin: state.rent[0],
    rentPriceMax: state.rent[1],
    priceMin: state.deposit[0],
    priceMax: state.deposit[1],
    areaMin: 0,
    areaMax: 900000000,
    showArticle: false,
    sameAddressGroup: true,
    priceType: 'RETAIL',
    directions: '',
    page: state.page ? state.page : 1
  })

  try {
    const naverURL = `https://new.land.naver.com/api/articles?${params}&articleState&oldBuildYears&recentlyBuildYears&minHouseHoldCount&maxHouseHoldCount&minMaintenanceCost&maxMaintenanceCost`
    const url = `${process.env.NEXT_PUBLIC_WEB_BASE_URL}/api/naverland?url=${encodeURIComponent(naverURL)}`
    const response = await fetch(url)

    if (!response.ok) throw new Error()
    const data = await response.json()

    return data
  } catch(error) {
    return {}
  }
}
