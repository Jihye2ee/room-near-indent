export type CortarInfo = {
  documents: Cortar[]
  meta: {
    total_count: number
  }
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
