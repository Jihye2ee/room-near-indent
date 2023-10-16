export type LandDetail = {
  item: LandDetailItem
}

export type LandDetailItem = {
  item_id: number
  user_no: number
  sales_type: string
  sales_title: string
  service_type: string
  images: string[]
  image_thumbnail: string
  매매금액: null | number
  보증금액: null | number
  월세금액: null | number
  전용면적_m2: number
  공급면적_m2: number
  대지권면적_m2: null | number
  address: string
  jibunAddress: string
  local1: string
  local2: string
  local3: null | string
  local4: null | string
  room_type_code: string
  room_type: string
  title: string
  status: string
  description: string
  secret_memo: null | String
  is_zzim: null | boolean
  random_location: string
  parking: string
  parking_count_string: string
  elevator: boolean
  room_direction: string
  direction_criterion: string // 방향 기준
  movein_date: string
  agent_comment: string
  pnu: string
  floor: string
  floor_string: string
  floor_all: string
  pets: null | string
  loan: null | string
  building_id: null | number
  options: string
  manage_cost: number
  manage_cost_inc: string
  is_realestate: boolean
  is_room: boolean
  is_owner: null | boolean
  is_premium: boolean
  is_homepage: boolean
  user_has_penalty: boolean
  building_type: null | string
  room_gubun_code: string
  view_count: number
  updated_at: string
  is_first_movein: null | boolean
  vr_key: null | string
  vr_type_name: null | string
  approve_date: string
  bathroom_count: string
  residence_type: string
  manage_cost_not_inc: string
  popular: null | any
  neighborhoods: Neighborhoods
  addressOrigin: any
  자동종료대상: number
  상태확인At: string
  자동종료At: null | any
}

type Neighborhoods = {
  distributions: Distribution[]
  amenities: Amenity[]
  nearbyPois: NearbyPoi[]
}

type Distribution = {
  companyName: string
  kinds: string[]
}

type Amenity = {
  title: string
  description: string
}

type NearbyPoi = {
  exists: boolean
  poiType: string
  distance: number
  transport: string
  timeTaken: number
}
