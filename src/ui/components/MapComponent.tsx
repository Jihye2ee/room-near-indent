'use client'
import { isEmpty } from 'lodash-es'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { filterState, zigbangResultState } from '@/app/recoil-state'
import styled from '@emotion/styled'

const kakaoMapSource = '//dapi.kakao.com/v2/maps/sdk.js?appkey=73ff0f3832dc2af330ffea582903b997&libraries=services&autoload=false'
const MapComponent = () => {
  const [conditions, setState] = useRecoilState(filterState)
  const [map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<any>(null)
  const [level, setLevel] = useState<number>(5)
  const [position, setPosition] = useState<any>(null)
  const [customOverlays, setCustomOverlays] = useState<any[]>([])
  const [zigbangResult, setZigbangResult] = useRecoilState(zigbangResultState)

  useEffect(() => {
    const existingScript = document.querySelector(`script[src='${kakaoMapSource}']`)
    if (existingScript && window && window.kakao) {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map')
        const options = {
          center: new window.kakao.maps.LatLng(conditions.area.y, conditions.area.x),
          level: 5,
        }
        const marker = new window.kakao.maps.Marker({
          position: options.center,
        })
        setMarkers(marker)
        const newMap = new window.kakao.maps.Map(container, options)
        const zoomControl = new window.kakao.maps.ZoomControl()
        newMap.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT)

        marker.setMap(newMap)
        newMap.panTo(options.center)
        setMap(newMap)

        window.kakao.maps.event.addListener(newMap, 'zoom_changed', () => {
          const chagnedLevel = newMap.getLevel()
          setLevel(chagnedLevel)
        })

        window.kakao.maps.event.addListener(newMap, 'dragend', () => {
          const position = newMap.getCenter()
          setPosition(position)
        })
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
          level: 5,
        }

        const map = new window.kakao.maps.Map(container, options)
        const zoomControl = new window.kakao.maps.ZoomControl()
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT)

        window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
          const chagnedLevel =  map.getLevel()
          setLevel(chagnedLevel)
        })
        window.kakao.maps.event.addListener(map, 'dragend', () => {
          const position = map.getCenter()
          setPosition(position)
        })

        map.panTo(options.center)
        setMap(map)
      })
    }

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI)

    return () => {
      kakaoMapScript.removeEventListener('load', onLoadKakaoAPI)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!window || !window.kakao) return
    if (!map) return
    const options = {
      center: new window.kakao.maps.LatLng(conditions.area.y, conditions.area.x),
      level: 5,
    }

    if (!isEmpty(markers)) {
      markers.setMap(null)
    }

    const marker = new window.kakao.maps.Marker({
      position: options.center,
    })
    marker.setMap(map)
    map.panTo(options.center)
    setMap(map)
    setMarkers(marker)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conditions.area])

  useEffect(() => {
    if (!window || !window.kakao) return
    if (!map) return
    createCustomeOverlay()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zigbangResult, level, position])

  const createCustomeOverlay = () => {
    if (!isEmpty(customOverlays)) {
      customOverlays.map(overlay => overlay.setMap(null))
      setCustomOverlays([])
    }

    const newOverlays = zigbangResult.buildings.map(building => {
      const position = new window.kakao.maps.LatLng(building.lat, building.lng)
      const content = `<div class="container" data-building-id="${building.id}"><div class="name">${building.name}</div><div class="count">${building.count}</div></div>`
      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: position,
        content: content,
      })
      customOverlay.setMap(map)
      return customOverlay
    })

    setCustomOverlays(newOverlays)
    setMap(map)

    Array.from(document.getElementsByClassName('container')).forEach((element) => {
      const container = element as HTMLElement
      container.style.display = 'flex'
      container.style.flexDirection = 'row'
      container.style.flexGrow = '1'
      container.style.cursor = 'pointer'

      container.onclick = () => {
        window.kakao.maps.event.preventMap()
        const buildingId = container.getAttribute('data-building-id') ?? 0
        const buildingItems = zigbangResult.items.filter(item =>
          item.buildingId === Number(buildingId)
        )
        const newZigbangList = zigbangResult.zigbangList.filter(zigbang =>
          buildingItems.some(item => item.itemId === zigbang.item_id)
        )
        setZigbangResult({ ...zigbangResult, displayedZigbangList: newZigbangList })
      }
    })

    Array.from(document.getElementsByClassName('name')).forEach((element) => {
      const name = element as HTMLElement
      name.style.display = 'inline-block'
      name.style.backgroundColor = 'white'
      name.style.padding = '4px'
      name.style.border = '1px solid #C9CFD6'
      name.style.borderRight = 'none'
      name.style.fontSize = '12px'
      name.style.fontWeight = '600'
      name.style.color = '#2C3136'
    })

    Array.from(document.getElementsByClassName('count')).forEach((element) => {
      const count = element as HTMLElement
      count.style.display = 'inline-block'
      count.style.backgroundColor = '#4696ff'
      count.style.color = 'white'
      count.style.padding = '4px 8px'
      count.style.fontSize = '12px'
      count.style.fontWeight = '600'
    })
  }

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
