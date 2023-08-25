import queryString from 'query-string'

import { KeywordQueryParams } from './types'

export const getCortarsInfo = async (coords: { x: string, y: string }) => {
  const queryParams = queryString.stringify({
    x: Number(coords.x).toFixed(6),
    y: Number(coords.y).toFixed(6)
  })
  const requestURL = `https://dapi.kakao.com/v2/local/geo/coord2regioncode?${queryParams}`
  const response = await fetch(requestURL, {
    headers: {
      Authorization: `KakaoAK ${process.env.KAKAO_LOCAL_REST_API_KEY}`
    }
  })
  if (!response.ok) {
    throw new Error()
  }

  const data = await response.json()
  return data
}

export const getKakaoAddressSearch = async (query: string) => {
  const queryParams = queryString.stringify({
    query
  })
  const requestURL = `https://dapi.kakao.com/v2/local/search/address?${queryParams}`
  const response = await fetch(requestURL, {
    headers: {
      Authorization: `KakaoAK ${process.env.KAKAO_LOCAL_REST_API_KEY}`
    }
  })
  if (!response.ok) {
    throw new Error()
  }

  const data = await response.json()
  return data
}

export const getKakaoKeywordSearch = async (queryParams: KeywordQueryParams) => {
  const params = queryString.stringify(queryParams)
  const requestURL = `https://dapi.kakao.com/v2/local/search/keyword?${params}`
  const response = await fetch(requestURL, {
    headers: {
      Authorization: `KakaoAK ${process.env.KAKAO_LOCAL_REST_API_KEY}`
    }
  })
  if (!response.ok) {
    throw new Error()
  }

  const data = response.json()
  return data
}
