import styled from '@emotion/styled'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import ChildCareIcon from '@mui/icons-material/ChildCare'
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled'
import DirectionsSubwayIcon from '@mui/icons-material/DirectionsSubway'
import LocalCafeIcon from '@mui/icons-material/LocalCafe'
import LocalConvenienceStoreIcon from '@mui/icons-material/LocalConvenienceStore'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService'
import LocalParkingIcon from '@mui/icons-material/LocalParking'
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy'
import SchoolIcon from '@mui/icons-material/School'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

type Props = {
  item: any
}

export const getIconForPoiType = (poiType: string) => {
  switch (poiType) {
    case '지하철역':
      return <DirectionsSubwayIcon width={24} height={24} />
    case '버스정류장':
      return <DirectionsBusFilledIcon width={24} height={24} />
    case '편의점':
      return <LocalConvenienceStoreIcon width={24} height={24} />
    case '세탁소':
      return <LocalLaundryServiceIcon width={24} height={24} />
    case '병원':
      return <LocalHospitalIcon width={24} height={24} />
    case '카페':
      return <LocalCafeIcon width={24} height={24} />
    case '약국':
      return <LocalPharmacyIcon width={24} height={24} />
    case '대형마트':
      return <LocalGroceryStoreIcon width={24} height={24} />
    case '어린이집':
      return <ChildCareIcon width={24} height={24} />
    case '유치원':
      return <ChildCareIcon width={24} height={24} />
    case '학교':
      return <SchoolIcon width={24} height={24} />
    case '주차장':
      return <LocalParkingIcon width={24} height={24} />
    case '마트':
      return <ShoppingCartIcon width={24} height={24} />
    case '은행':
      return <AccountBalanceIcon width={24} height={24} />
    default:
      return null // 기본값 또는 다른 아이콘
  }
}

const NearFacilityItem = ({ item }: Props) => {
  return (
    <Container>
      <Icon>{getIconForPoiType(item.complexView.labelName)}</Icon>
      <PoiType>{`${item.complexView.labelName}`}</PoiType>
      <PoiDistance>{item.closestDist}m</PoiDistance>
    </Container>
  )
}

export default NearFacilityItem

const Container = styled.div`
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
