export type KaKaoAddressItem = {
  address: Address | null
  address_name: string
  address_type: string
  road_address: RoadAddress | null
  x: string
  y: string
  bounds: Bounds
}

type Address = {
  address_name: string
  b_code: string
  h_code: string
  main_address_no: string
  mountain_yn: string
  region_1depth_name: string
  region_2depth_name: string
  region_3depth_h_name: string
  region_3depth_name: string
  sub_address_no: string
  x: string
  y: string
}

type RoadAddress = {
  address_name: string
  building_name: string
  main_building_no: string
  region_1depth_name: string
  region_2depth_name: string
  region_3depth_name: string
  road_name: string
  sub_building_no: string
  underground_yn: string
  x: string
  y: string
  zone_no: string
}

export type NaverlandAddressItem = {
  centerLat: number
  centerLon: number
  cityName: string
  cityNo: string
  cortarName: string
  cortarNo: string
  cortarType: string
  cortarVertexLists: Array<Array<[number, number]>>,
  cortarZoom: number
  divisionName: string
  divisionNo: string
  sectorName: string
  sectorNo: string
}

// southwest 좌표정보: leftLon, bottomLat
// northeast 좌표정보: rightLon, topLat
export type Bounds = {
  topLat: string,
  leftLon: string,
  rightLon: string,
  bottomLat: string,
}
