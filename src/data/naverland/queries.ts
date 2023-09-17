import queryString from 'query-string'

import { State } from '@/app/recoil-state'

export const getNaverLandArticleData = async (path: string, state: State, cortarNo: string) => {
  const queryParams = queryString.stringify({
    view: 'atcl',
    rletTpCd: path === 'officetel' ? 'OPST' : path === 'villa' ? 'VL' : 'OR',
    tradTpCd: state.type === 'deposit' ? 'B1' : 'B2',
    z: 16,
    addon: 'COMPLEX',
    bAddon: 'COMPLEX',
    isOnlyIsale: false,
    lat: Number(state.area.y).toFixed(6),
    lon: Number(state.area.x).toFixed(6),
    btm: state.area.bounds.bottomLat,
    lft: state.area.bounds.leftLon,
    top: state.area.bounds.topLat,
    rgt: state.area.bounds.rightLon,
    wprcMin: state.deposit[0],
    wprcMax: state.deposit[1],
    cortarNo: cortarNo,
  })
  const naverURL = `https://m.land.naver.com/cluster/clusterList?${queryParams}`
  const url = `${process.env.NEXT_PUBLIC_WEB_BASE_URL}/api/naverland?url=${encodeURIComponent(naverURL)}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error()
  }

  const data = await response.json()
  return data
}

export const getNaverlandData = async (path: string, state: State, totalCount: number, cortarNo: string, page?: number, itemId?: string) => {
  const queryParams = queryString.stringify({
    rletTpCd: path === 'officetel' ? 'OPST' : path === 'villa' ? 'VL' : 'OR',
    tradTpCd: state.type === 'deposit' ? 'B1' : 'B2',
    z: 16,
    lat: Number(state.area.y).toFixed(6),
    lon: Number(state.area.x).toFixed(6),
    btm: state.area.bounds.bottomLat,
    lft: state.area.bounds.leftLon,
    top: state.area.bounds.topLat,
    rgt: state.area.bounds.rightLon,
    wprcMin: state.deposit[0],
    wprcMax: state.deposit[1],
    cortarNo: cortarNo,
    totCnt: totalCount,
    page: page ? page : 1,
    itemId: itemId ? itemId : undefined,
    lgeo: itemId ? itemId : undefined,
  })
  const naverURL = `https://m.land.naver.com/cluster/ajax/articleList?${queryParams}`
  const url = `${process.env.NEXT_PUBLIC_WEB_BASE_URL}/api/naverland?url=${encodeURIComponent(naverURL)}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error()
  }

  const data = await response.json()
  return data
}
