'use client'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { filterState } from '@/app/recoil-state'
import { Stack } from '@/src/ui/mui'

const MapComponent = () => {
  const [conditions, setState] = useRecoilState(filterState)
  const [map, setMap] = useState<any>(null)

  useEffect(() => {
    const kakaoMapScript = document.createElement("script")
    kakaoMapScript.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=73ff0f3832dc2af330ffea582903b997&libraries=services&autoload=false"
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

    return () => kakaoMapScript.removeEventListener("load", onLoadKakaoAPI)
  }, [])

  useEffect(() => {
    if (!window || !window.kakao) return
    const options = {
      center: new window.kakao.maps.LatLng(conditions.area.y, conditions.area.x),
      level: 3,
    }

    // const marker = new window.kakao.maps.Marker({
    //   position: options.center,
    // })
    // marker.setMap(map)
    map?.panTo(options.center)
    setMap(map)
  }, [conditions.area])

  return (
    <Stack
      position='relative'
      id='map'
      width='100%'
      height='100%'
      // flex={0.7}
      display={{ laptop: 'block', tablet: 'none', mobile: 'none' }}
    />
  )
}

export default MapComponent
