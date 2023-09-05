export type Section = {
  type: string
  title: string
  itemIds: number[]
}

export type Building = {
  id: number
  address: string
  address2: string
  count: number
  elevator: boolean
  established: string
  floor: string
  image: string | null
  lat: number
  lng: number
  local1: string
  local2: string
  local3: string
  name: string
  roadview_lat: number
  roadview_lng: number
  roadview_pan: number
  roadview_tilt: number
  roadview_zoom: number
  rooms: string
}

export type Item = {
  buildingId: number
  itemBmType: string
  itemId: number
}
