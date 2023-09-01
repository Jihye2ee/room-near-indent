'use client'
import { isEmpty } from 'lodash-es'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { filterState } from '@/app/recoil-state'
import styled from '@emotion/styled'

const kakaoMapSource = '//dapi.kakao.com/v2/maps/sdk.js?appkey=73ff0f3832dc2af330ffea582903b997&libraries=services&autoload=false'
const MapComponent = () => {
  const [conditions, setState] = useRecoilState(filterState)
  const [map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<any[]>([])

  useEffect(() => {
    const existingScript = document.querySelector(`script[src='${kakaoMapSource}']`)
    if (existingScript && window && window.kakao) {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map')
        const options = {
          center: new window.kakao.maps.LatLng(conditions.area.y, conditions.area.x),
          level: 3,
        }
        const marker = new window.kakao.maps.Marker({
          position: options.center,
        })
        setMarkers([marker])
        const newMap = new window.kakao.maps.Map(container, options)
        marker.setMap(newMap)
        newMap.panTo(options.center)
        setMap(newMap)
      })
      return
    }

    const kakaoMapScript = document.createElement('script')
    kakaoMapScript.src = kakaoMapSource
    document.head.appendChild(kakaoMapScript)

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map')
        const options = {
          center: new window.kakao.maps.LatLng(37.5445888153751, 127.056066999327),
          level: 3,
        }

        const map = new window.kakao.maps.Map(container, options)
        map.panTo(options.center)
        setMap(map)
      })
    }

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI)

    return () => kakaoMapScript.removeEventListener('load', onLoadKakaoAPI)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!window || !window.kakao) return
    if (!map) return
    const options = {
      center: new window.kakao.maps.LatLng(conditions.area.y, conditions.area.x),
      level: 3,
    }

    if (!isEmpty(markers)) {
      markers.map(marker => marker.setMap(null))
    }

    const marker = new window.kakao.maps.Marker({
      position: options.center,
    })
    setMarkers([marker])

    marker.setMap(map)
    map?.panTo(options.center)
    setMap(map)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conditions.area])

  return (
    <MapContainer id='map' />
  )
}

export default MapComponent

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  @media (max-width: 767px) {
    display: none;
  }
`
