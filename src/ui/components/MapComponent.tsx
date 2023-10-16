'use client'
import { isEmpty, set } from 'lodash-es'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { filterState, naverlandResultState, zigbangResultState } from '@/app/recoil-state'
import { getKakaoKeywordSearch } from '@/src/data/local/queries'
import { KakaoAddressResult, KakaoKeywordItem } from '@/src/data/local/types'
import { getNaverlandData } from '@/src/data/naverland/queries'
import { ArticleData, ArticleItem, PropertyInfo } from '@/src/data/types'
import styled from '@emotion/styled'

const kakaoMapSource = '//dapi.kakao.com/v2/maps/sdk.js?appkey=73ff0f3832dc2af330ffea582903b997&libraries=services&autoload=false'
const MapComponent = () => {
  const path = usePathname()
  const conditions = useRecoilValue(filterState)
  const [map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<any>(null)
  const [level, setLevel] = useState<number>(5)
  const [position, setPosition] = useState<any>(null)
  const [customOverlays, setCustomOverlays] = useState<any[]>([])

  const [zigbangResult, setZigbangResult] = useRecoilState(zigbangResultState)
  const [naverlandResult, setNaverlanResult] = useRecoilState(naverlandResultState)

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
  }, [zigbangResult, level, position, naverlandResult])

  const createCustomeOverlay = () => {
    if (!isEmpty(customOverlays)) {
      customOverlays.map(overlay => overlay.setMap(null))
      setCustomOverlays([])
    }

    if (conditions.site === 'zigbang') {
      if (path === '/officetel') {
        const newOverlays = zigbangResult.buildings!.map(building => {
          const position = new window.kakao.maps.LatLng(building.lat, building.lng)
          const content = `<div class="container" data-building-id="${building.id}">${building.count}</div>`
          const customOverlay = new window.kakao.maps.CustomOverlay({
            position: position,
            content: content,
          })
          customOverlay.setMap(map)
          return customOverlay
        })
        setCustomOverlays(newOverlays)
        setMap(map)
      } else {
        const newOverlays = zigbangResult.clusterList?.map(cluster => {
          const position = new window.kakao.maps.LatLng(cluster.lat, cluster.lng)
          const count = cluster.items.length
          const content = `<div class="container" data-building-id="${cluster.lat}-${cluster.lng}">${count}</div>`

          const customOverlay = new window.kakao.maps.CustomOverlay({
            position: position,
            content: content,
          })
          customOverlay.setMap(map)
          return customOverlay
        })
        setCustomOverlays(newOverlays ?? [])
        setMap(map)
      }
    } else {
      if (!naverlandResult.ariticles) return
      const newOverlays = naverlandResult.ariticles.map(article => {
        const position = new window.kakao.maps.LatLng(article.lat, article.lon)
        const content = `<div class="container" data-building-id="${article.lgeo}">${article.count}</div>`
        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: position,
          content: content,
        })
        customOverlay.setMap(map)
        return customOverlay
      })
      setCustomOverlays(newOverlays)
      setMap(map)
    }

    Array.from(document.getElementsByClassName('container')).forEach((element) => {
      const container = element as HTMLElement
      container.style.display = 'flex'
      container.style.justifyContent = 'center'
      container.style.alignItems = 'center'
      container.style.textAlign = 'center'
      container.style.width = '60px'
      container.style.height = '60px'
      container.style.backgroundColor = '#4696ff'
      container.style.borderRadius = '80px'
      container.style.padding = '16px'
      container.style.color = 'white'
      container.style.fontSize = '22px'
      container.style.fontWeight = '600'
      container.style.boxShadow = '2px 2px 4px rgba(0, 0, 0, 0.2)'

      container.onclick = async () => {
        window.kakao.maps.event.preventMap()
        const buildingId = container.getAttribute('data-building-id') ?? ''
        if (conditions.site === 'zigbang') {
          if (path === '/officetel') {
            const buildingItems = zigbangResult.items.filter(item =>
              item.buildingId === Number(buildingId)
            )
            const newZigbangList = zigbangResult.zigbangList.filter(zigbang =>
              buildingItems.some(item => item.itemId === zigbang.item_id)
            )

            const newList = await getConvinientStoreList(newZigbangList) as PropertyInfo[]
            setZigbangResult({ ...zigbangResult, displayedZigbangList: newList })
          } else {
            const buildingId = container.getAttribute('data-building-id') ?? ''
            const cluster = zigbangResult.clusterList!.find(cluster =>
              cluster.lat + '-' + cluster.lng === buildingId
            )
            const newZigbangList = zigbangResult.zigbangList.filter(zigbang => {
              return cluster?.items.some(item => Number(item.itemId) === zigbang.item_id)
            })
            const newList = await getConvinientStoreList(newZigbangList) as PropertyInfo[]
            setZigbangResult({ ...zigbangResult, displayedZigbangList: newList })
          }
        } else {
          if (!naverlandResult.ariticles) return
          const articleItem = naverlandResult.ariticles.find(article => article.lgeo === buildingId)

          const naverItems: ArticleData = await getNaverlandData(path.replace('/', ''), conditions, naverlandResult.totalCount, naverlandResult.cortarNo, 1, buildingId)

          const newList = await getConvinientStoreList(naverItems.body) as ArticleItem[]
          naverItems.body = newList
          setNaverlanResult({ ...naverlandResult, totalCount: articleItem?.count ?? 0, naverList: naverItems })
        }
      }
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
