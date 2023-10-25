import { useEffect } from 'react'

import styled from '@emotion/styled'

type Props = {
  position: { lat: number, lng: number },
}

const kakaoMapSource = '//dapi.kakao.com/v2/maps/sdk.js?appkey=73ff0f3832dc2af330ffea582903b997&libraries=services&autoload=false'
const DetailAddressMap = ({ position }: Props) => {
  useEffect(() => {
    const kakaoMapScript = document.createElement('script')
    kakaoMapScript.src = kakaoMapSource
    document.head.appendChild(kakaoMapScript)

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('detailMap')
        const options = {
          center: new window.kakao.maps.LatLng(position.lat, position.lng),
          level: 3,
        }
        const marker = new window.kakao.maps.Marker({
          position: options.center,
        })
        const newMap = new window.kakao.maps.Map(container, options)
        const zoomControl = new window.kakao.maps.ZoomControl()
        newMap.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT)

        marker.setMap(newMap)
        newMap.panTo(options.center)
      })
    }
    kakaoMapScript.addEventListener('load', onLoadKakaoAPI)

    return () => {
      kakaoMapScript.removeEventListener('load', onLoadKakaoAPI)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <MapContainer id='detailMap' />
  )
}

export default DetailAddressMap

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 388px;
  border: 1px solid var(--grey-300);
  @media (max-width: 767px) {
    height: 288px;
  }
`
