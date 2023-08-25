import { Bounds, KaKaoAddressItem } from '../address/types'

export type KakaoItem = KaKaoAddressItem | KakaoKeywordItem

export type CortarInfo = {
  documents: Cortar[]
  meta: Meta
}

export type Cortar = {
  address_name: string
  code: string
  region_1depth_name: string
  region_2depth_name: string
  region_3depth_name: string
  region_4depth_name: string
  region_type: string // "B": 법정동 코드, "H": 행정동 코드
  x: number
  y: number
}

export type KakaoAddressResult = {
  meta: Meta
  documents: KaKaoAddressItem[] | KakaoKeywordItem[]
}

type Meta = {
  total_count: number
  pageable_count: number
  is_end: boolean
  same_name?: SameName // query 정보로 얻을 수 있는 지역 및 키워드 분석 정보
}

type SameName = {
  region: string[]
  keyword: string
  selected_region: string
}

export type KeywordQueryParams = {
  query: string
  category_group_code?: string
  x?: string
  y?: string
  radius?: number // 2000 -> 2km
  rect?: string
  page?: number
  size?: number
  sort?: number
}

export type KakaoKeywordItem = {
  id:	string // 장소 ID
  place_name:	string // 장소명, 업체명
  category_name: string // 카테고리 이름
  category_group_code: string // 중요 카테고리만 그룹핑한 카테고리 그룹 코드
  category_group_name: string // 중요 카테고리만 그룹핑한 카테고리 그룹명
  phone: string // 전화번호
  address_name:	string	// 전체 지번 주소
  road_address_name:	string	//전체 도로명 주소
  x: string // X 좌표값, 경위도인 경우 longitude (경도)
  y: string // Y 좌표값, 경위도인 경우 latitude(위도)
  place_url: string	// 장소 상세페이지 URL
  distance:	string	// 중심좌표까지의 거리 (단, x,y 파라미터를 준 경우에만 존재) 단위 meter
  bounds: Bounds
}
