import { isEmpty, isNil } from 'lodash-es'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { filterState, naverlandResultState } from '@/app/recoil-state'
import { getNaverLandDetailData, getNaverLandFacilityData } from '@/src/data/naverland/queries'
import { NaverLandDetail } from '@/src/data/naverland/type'
import { ArticleItem } from '@/src/data/types'
import LandImageSlider from '@/src/ui/components/LandImageSlider'
import { extractM2andConvertToPyeong } from '@/src/utils/convertAreaUnit'
import styled from '@emotion/styled'
import CloseIcon from '@mui/icons-material/Close'

import DetailAddressMap from './DetailAddressMap'
import NearFacilityItem from './NearFacilities'

type Props = {
  item?: ArticleItem
  closeModal: () => void
}
const NaverLandItemDetailModal = ({ item, closeModal }: Props) => {
  const path = usePathname()
  const conditions = useRecoilValue(filterState)
  const { totalCount, cortarNo } = useRecoilValue(naverlandResultState)
  const [showDescriptionMore, setShowDescriptionMore] = useState(false)
  const [itemDetail, setItemDetail] = useState<NaverLandDetail>()
  const [facilityData, setFacilityData] = useState<any>()
  const [areaUnit, setAreaUnit] = useState<'pyeong' | 'm2'>('m2')


  useEffect(() => {
    if (!item) return

    const fetchDetail = async () => {
      const detailData: NaverLandDetail = await getNaverLandDetailData(item.atclNo)
      const facilityData = await getNaverLandFacilityData(item.atclNo, item.lat, item.lng)
      setItemDetail(detailData)
      setFacilityData(facilityData.nearFacility)
      console.log('[naverlist]', detailData)
      console.log('[facilityData]', facilityData)
    }
    fetchDetail()
  }, [conditions, cortarNo, item, path, totalCount])

  if (!itemDetail) return (<></>)
  return (<>
    <Background onClick={() => {
      closeModal()
    }} />
    <Container>
      <CloseContainer onClick={closeModal}>
        <CloseIcon width={24} height={24} />
      </CloseContainer>
      <Content>
        <HeaderContainer>
          {itemDetail.propertyType === '오피스텔' ? (
            <ServiceType>{itemDetail.propertyType} {itemDetail.location}</ServiceType>
          ) : (
            <ServiceType>{itemDetail.propertyType}</ServiceType>
          )}
          <SalesType>{itemDetail.price}</SalesType>
          <LandTitle>{itemDetail.description}</LandTitle>
          <ImageContainer>
            <LandImageSlider type='naver' images={itemDetail.images} />
          </ImageContainer>
        </HeaderContainer>
        <ItemSaleContainer>
          <LandDetailTitle>매물 정보</LandDetailTitle>
          <LandDetailInfoList>
            <AreaUnitContainer>
              <LandDetailInfoItem>
                <LandDetailInfoLabel>공급/전용면적</LandDetailInfoLabel>
                {areaUnit === 'm2' ? (
                  <LandDetailInfo>{itemDetail.areaUnit.replace('평', '')}</LandDetailInfo>
                ) : (
                  <LandDetailInfo>{extractM2andConvertToPyeong(itemDetail.areaUnit)}</LandDetailInfo>
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
              <LandDetailInfo>{isNil(itemDetail.managementFee) ? '-' : itemDetail.managementFee}</LandDetailInfo>
              {/* TODO: 관리비 포함 항목 */}
            </LandDetailInfoItem>
            <LandDetailInfoItem>
              <LandDetailInfoLabel>해당층 / 총 층수</LandDetailInfoLabel>
              <LandDetailInfo>{isNil(itemDetail.floorInfo) ? itemDetail.floorInfo : '-'}</LandDetailInfo>
            </LandDetailInfoItem>
            <LandDetailInfoItem>
              <LandDetailInfoLabel>방향</LandDetailInfoLabel>
              <LandDetailInfo>{itemDetail.direction}</LandDetailInfo>
            </LandDetailInfoItem>
            <LandDetailInfoItem>
              <LandDetailInfoLabel>방수 / 욕실 수</LandDetailInfoLabel>
              <LandDetailInfo>{isEmpty(itemDetail.roomBathCount) ? '-' : itemDetail.roomBathCount}</LandDetailInfo>
            </LandDetailInfoItem>
            <LandDetailInfoItem>
              <LandDetailInfoLabel>입주 가능일</LandDetailInfoLabel>
              <LandDetailInfo>{itemDetail.approvalDate}</LandDetailInfo>
            </LandDetailInfoItem>
            <LandDetailInfoItem>
              <LandDetailInfoLabel>주차 정보</LandDetailInfoLabel>
              <LandDetailInfo>{itemDetail.parkingCount}</LandDetailInfo>
            </LandDetailInfoItem>
            <LandDetailInfoItem>
              <LandDetailInfoLabel>매물번호</LandDetailInfoLabel>
              <LandDetailInfo>{itemDetail.propertyNumber}</LandDetailInfo>
            </LandDetailInfoItem>
            <LandDetailInfoItem style={{ flexDirection: 'column' }}>
              <LandDetailInfoLabel>상세 설명</LandDetailInfoLabel>
              <LandDescription show={showDescriptionMore}>
                {`${itemDetail.propertyDescription}`}
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
            {facilityData.filter((facility: any) => facility.closestDist <= 1000).map((item: any) => (
              <NearFacilityItem key={item.complexView.cssName} item={item} />
            ))}
          </NearbyPointList>
        </NearbyPointContainer>
        {item && (
          <LocationContainer>
            <LandDetailTitle>위치</LandDetailTitle>
            <DetailAddress>{itemDetail.detailAddress}</DetailAddress>
            <DetailAddressMap position={{ lat: item.lat, lng: item.lng}}/>
          </LocationContainer>
        )}
      </Content>
    </Container>
  </>)
}

export default NaverLandItemDetailModal

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

const CloseContainer = styled.div``

const Content = styled.div`
  display: flex;
  flex-direction: column;
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