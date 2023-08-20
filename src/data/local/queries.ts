import queryString from 'query-string'

export const getCortarsInfo = async (coords: { x: string, y: string }) => {
  const queryParams = queryString.stringify({
    x: Number(coords.x).toFixed(6),
    y: Number(coords.y).toFixed(6)
  })
  const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode?${queryParams}`
  const response = await fetch(url, {
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
