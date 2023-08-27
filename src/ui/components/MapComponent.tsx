'use client'
import { isEmpty } from 'lodash-es'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { filterState } from '@/app/recoil-state'
import { Stack } from '@/src/ui/mui'

const kakaoMapSource = '//dapi.kakao.com/v2/maps/sdk.js?appkey=73ff0f3832dc2af330ffea582903b997&libraries=services&autoload=false'
const MapComponent = () => {
  const [conditions, setState] = useRecoilState(filterState)
  const [map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<any[]>([])

  useEffect(() => {
    const existingScript = document.querySelector(`script[src='${kakaoMapSource}']`);
    if (existingScript) return

    const kakaoMapScript = document.createElement('script')
    kakaoMapScript.src = kakaoMapSource
    document.head.appendChild(kakaoMapScript)

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map')
        const options = {
          center: new window.kakao.maps.LatLng(conditions.area.x, conditions.area.y),
          level: 3,
        }

        const map = new window.kakao.maps.Map(container, options)
        const markerPosition = new window.kakao.maps.LatLng(options.center)

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        })
        marker.setMap(map)
        map.panTo(options.center)
        setMap(map)
      })
    }

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI)

    return () => kakaoMapScript.removeEventListener('load', onLoadKakaoAPI)
  }, [])

  useEffect(() => {
    if (!window || !window.kakao) return
    const container = document.getElementById('map')
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

    if (!map) {
      const newMap = new window.kakao.maps.Map(container, options)
      marker.setMap(map)
      newMap.panTo(options.center)
      setMap(newMap)
    } else {
      marker.setMap(map)
      map?.panTo(options.center)
      setMap(map)
    }
  }, [conditions.area])

  return (
    <Stack
      position='relative'
      id='map'
      width='100%'
      height='100%'
      display={{ laptop: 'block', tablet: 'none', mobile: 'none' }}
    />
  )
}

export default MapComponent
