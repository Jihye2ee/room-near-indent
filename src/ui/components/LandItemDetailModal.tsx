'use client'
import { isNil } from 'lodash-es'
import { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'

import { detailModalState } from '@/app/recoil-state'
import { getLandDetail, LandDetailItem } from '@/src/data/detail'
import { LoaderIcon } from '@/src/style/icons'
import LandImageSlider from '@/src/ui/components/LandImageSlider'
import { m2ToPyeong } from '@/src/utils/convertAreaUnit'
import { getPriceText } from '@/src/utils/getPriceText'
import styled from '@emotion/styled'
import CloseIcon from '@mui/icons-material/Close'

import DetailAddressMap from './DetailAddressMap'
import ImageSlider from './ImageSlider'
import { getIconForPoiType } from './NearFacilities'

type ModalProps = {
  itemId: number
  closeModal: () => void
}

const LandItemDetailModal = ({ itemId, closeModal }: ModalProps) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [itemDetail, setItemDetail] = useState<LandDetailItem>()
  const [showDescriptionMore, setShowDescriptionMore] = useState(false)
  const [areaUnit, setAreaUnit] = useState<'pyeong' | 'm2'>('m2')
  const containerRef = useRef<HTMLDivElement>(null)
  const [detailModalOpenState, setDetailModalState] = useRecoilState(detailModalState)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)
  const roomDirectionDisplay = () => {
    switch (itemDetail?.room_direction) {
      case 'W':
        return '서향'
      case 'E':
        return '동향'
      case 'S':
        return '남향'
      case 'N':
        return '북향'
      case 'NW':
        return '북서향'
      case 'NE':
        return '북동향'
      case 'SW':
        return '남서향'
      case 'SE':
        return '남동향'
      default:
        return ''
    }
  }

  const openImageSlider = (index: number) => {
    if (!containerRef.current) return
    containerRef.current.style.overflow = 'hidden'
    setSelectedImageIndex(index)
    setDetailModalState({ ...detailModalOpenState, imageDetailModalOpen: true })
  }

  const closeImageSlider = () => {
    if (!containerRef.current) return
    containerRef.current.style.overflow = 'auto'
    setSelectedImageIndex(0)
    setDetailModalState({ ...detailModalOpenState, imageDetailModalOpen: false })
  }

  useEffect(() => {
    if (!itemId) return
    const fetchDetail = async () => {
      const { item } = await getLandDetail(itemId)
      setItemDetail(item)
      setLoading(false)
    }

    fetchDetail()
  }, [itemId])

  return (<>
    <Background onClick={() => closeModal()} />
    <Container ref={containerRef} onClick={e => e.stopPropagation()}>
      <CloseContainer onClick={closeModal}>
        <CloseIcon width={24} height={24} />
      </CloseContainer>
      {loading && (
        <LoadingContainer>
        <LoaderIcon width={40} height={40} />
      </LoadingContainer>
      )}
      {!loading && itemDetail && (
        <Content>
          <HeaderContainer>
            <FlagsContainer>
              <Flag>{itemDetail.sales_type}</Flag>
              <Flag>{itemDetail.service_type}</Flag>
            </FlagsContainer>
            {itemDetail.service_type === '오피스텔' ? (
              <ServiceType>{itemDetail.service_type}</ServiceType>
            ) : (
              <ServiceType>{itemDetail.service_type}</ServiceType>
            )}
            {itemDetail.sales_type === '전세' ? (
              <SalesType>{getPriceText(itemDetail.보증금액 ?? 0)}</SalesType>
            ) : (
              <SalesType>{getPriceText(itemDetail.보증금액 ?? 0)} / {getPriceText(itemDetail.월세금액 ?? 0)}</SalesType>
            )}
            <LandTitle>{itemDetail.title}</LandTitle>
            <ImageContainer>
              <LandImageSlider type='zigbang' images={itemDetail.images} openImageSlider={openImageSlider} />
            </ImageContainer>
          </HeaderContainer>
          <ItemSaleContainer>
            <LandDetailTitle>매물 정보</LandDetailTitle>
            <LandDetailInfoList>
              <AreaUnitContainer>
                <LandDetailInfoItem>
                  <LandDetailInfoLabel>공급/전용면적</LandDetailInfoLabel>
                  {areaUnit === 'm2' ? (
                    <LandDetailInfo>{itemDetail.공급면적_m2} / {itemDetail.전용면적_m2}m&#178;</LandDetailInfo>
                  ) : (
                    <LandDetailInfo>{m2ToPyeong(itemDetail.공급면적_m2)} / {m2ToPyeong(itemDetail.전용면적_m2)} 평</LandDetailInfo>
                  )}
                </LandDetailInfoItem>
                <ConvertAreaUnitButton onClick={() => {
                  setAreaUnit(areaUnit === 'pyeong' ? 'm2' : 'pyeong')
                }}>
                  {areaUnit === 'pyeong' ? `↻ ㎡`: '↻ 평'}
                </ConvertAreaUnitButton>
              </AreaUnitContainer>
              <LandDetailInfoItem>
                <LandDetailInfoLabel>관리비</LandDetailInfoLabel>
                <LandDetailInfo>{isNil(itemDetail.manage_cost) ? '-' : itemDetail.manage_cost} 만원</LandDetailInfo>
              </LandDetailInfoItem>
              <LandDetailInfoItem>
                <LandDetailInfoLabel>해당층 / 총 층수</LandDetailInfoLabel>
                <LandDetailInfo>{isNil(itemDetail.floor) ? itemDetail.floor_string : itemDetail.floor} / {itemDetail.floor_all}</LandDetailInfo>
              </LandDetailInfoItem>
              <LandDetailInfoItem>
                <LandDetailInfoLabel>방향</LandDetailInfoLabel>
                <LandDetailInfo>{roomDirectionDisplay()} {`(${itemDetail.direction_criterion} 기준)`}</LandDetailInfo>
              </LandDetailInfoItem>
              <LandDetailInfoItem>
                <LandDetailInfoLabel>방수 / 욕실 수</LandDetailInfoLabel>
                <LandDetailInfo>- / {itemDetail.bathroom_count}</LandDetailInfo>
              </LandDetailInfoItem>
              <LandDetailInfoItem>
                <LandDetailInfoLabel>입주 가능일</LandDetailInfoLabel>
                <LandDetailInfo>{itemDetail.movein_date}</LandDetailInfo>
              </LandDetailInfoItem>
              <LandDetailInfoItem>
                <LandDetailInfoLabel>주차 가능여부</LandDetailInfoLabel>
                <LandDetailInfo>{itemDetail.parking}</LandDetailInfo>
              </LandDetailInfoItem>
              <LandDetailInfoItem>
                <LandDetailInfoLabel>매물번호</LandDetailInfoLabel>
                <LandDetailInfo>{itemDetail.item_id}</LandDetailInfo>
              </LandDetailInfoItem>
              <LandDetailInfoItem style={{ flexDirection: 'column' }}>
                <LandDetailInfoLabel>상세 설명</LandDetailInfoLabel>
                <LandDescription show={showDescriptionMore}>
                  {`${itemDetail.description}`}
                </LandDescription>
                <ShowMoreButton onClick={() => setShowDescriptionMore(!showDescriptionMore)}>
                  {showDescriptionMore ? '닫기' : '더보기'}
                </ShowMoreButton>
              </LandDetailInfoItem>
            </LandDetailInfoList>
          </ItemSaleContainer>
          <NearbyPointContainer>
            <LandDetailTitle>주변 편의시설 (1km 이내)</LandDetailTitle>
            <NearbyPointList>
            {itemDetail.neighborhoods.nearbyPois.filter((poi) => poi.distance <= 1000).map(poi => (
              <NearbyPointItem key={poi.poiType}>
                <Icon>{getIconForPoiType(poi.poiType)}</Icon>
                <PoiType>{`${poi.poiType}`}</PoiType>
                <PoiDistance>{poi.distance}m</PoiDistance>
              </NearbyPointItem>
            ))}
            </NearbyPointList>
          </NearbyPointContainer>
          <LocationContainer>
            <LandDetailTitle>위치</LandDetailTitle>
            <DetailAddress>{itemDetail.jibunAddress}</DetailAddress>
            <DetailAddressMap position={{ lat: Number(itemDetail.random_location.split(',')[0]), lng: Number(itemDetail.random_location.split(',')[1]) }}/>
          </LocationContainer>
          {detailModalOpenState.imageDetailModalOpen && <ImageSlider type='zigbang' images={itemDetail.images} selectedIndex={selectedImageIndex} closeModal={closeImageSlider} />}
        </Content>
      )}
    </Container>
  </>)
}

export default LandItemDetailModal

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: rgba(0,0,0,0.5);
`

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--grey-300);
  border-radius: 8px;
  overflow: auto;
  padding: 20px;
  width: calc(100% - 500px);
  height: calc(100% - 40px);
  ::-webkit-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    display: none; /* Chrome, Safari, Opera */
  }
  @media (max-width: 1023px) {
    width: calc(100% - 200px);
  }
  @media (max-width: 767px) {
    top: 0;
    left: 0;
    transform: translate(0, 0);
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const CloseContainer = styled.div``

const Content = styled.div`
  display: flex;
  flex-direction: column;
`

const FlagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-bottom: 16px;
`

const Flag = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: var(--grey-300);
  font-size: 12px;
  font-weight: 400;
  color: var(--grey-700);
`

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
  background-color: var(--grey-50);
  border-radius: 4px;
  padding: 16px;
  overflow-x: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`

const ServiceType = styled.h1`
  font-size: 22px;
  font-weight: 600;
  color: var(--grey-900);
`

const SalesType = styled.h2`
  font-size: 16px;
  font-weight: 400;
  color: var(--grey-700);
`

const LandTitle = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: var(--grey-700);
`

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: auto;
`

const ItemSaleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  background-color: var(--grey-50);
  border-radius: 4px;
  margin-top: 16px;
`

const LandDetailInfoList = styled.div`

`

const LandDescription = styled.div<{ show: boolean }>`
  display: -webkit-box;
  -webkit-line-clamp: ${props => props.show ? 'unset' : 3};
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const ShowMoreButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 8px;
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  background-color: var(--grey-100);
  font-size: 12px;
  font-weight: 400;
  color: var(--grey-600);
  cursor: pointer;
  &:hover {
    background-color: var(--grey-200);
  }
`

const LandDetailInfoItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid var(--grey-200);
  &:first-of-type {
    border-top: none;
  }
  &:last-of-type {
    border-bottom: none;
  }
`

const LandDetailInfoLabel = styled.div`
  font-size: 15px;
  font-weight: 400;
  color: var(--grey-600);
`

const LandDetailInfo = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: var(--grey-900);
`

const NearbyPointContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: var(--grey-50);
  border-radius: 4px;
  margin-top: 16px;
`

const LandDetailTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: var(--grey-900);
  margin-bottom: 16px;
`

const NearbyPointList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
  overflow-x: auto;
`

const NearbyPointItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
`

const Icon = styled.div`
  width: 24px;
  height: 24px;
`

const PoiType = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: var(--grey-600);
  text-align: center;
`

const PoiDistance = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: var(--grey-600);
  text-align: center;
`

const AreaUnitContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid var(--grey-200);
  border-top: 1px solid var(--grey-200);
`

const ConvertAreaUnitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 24px;
  padding: 4px;
  border: none;
  border-radius: 4px;

  font-size: 14px;
  font-weight: 400;
  color: var(--grey-600);
  background-color: var(--grey-200);
  cursor: pointer;
  &:hover {
    background-color: var(--grey-300);
  }
`

const LocationContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  margin-bottom: 16px;
  background-color: var(--grey-50);
  border-radius: 4px;
  padding: 16px;
`

const DetailAddress = styled.p`
  font-size: 15px;
  font-weight: 400;
  color: var(--grey-900);
  line-height: 22px;
  letter-spacing: -0.3px;
  margin-bottom: 16px;
`
