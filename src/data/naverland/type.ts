export type NaverLandDetail = {
  confirmedDate: string
  propertyType: string
  location: string // 아파트, 오피스텔명 or 빌라, 원룸 주소
  dealType: string
  price: string
  pricePerSquareMeter: string // 평당 가격 (2,217만원/3.3㎡)
  description: string
  managementFee: string
  managementFeeIncludes: string
  areaUnit: string
  images: string[]
  loan: string
  roomStructure: string
  direction: string
  floorInfo: string
  roomBathCount: string
  entranceStructure: string // 현관 구조 (복도식, 계단식)
  duplexInfo: string // 복층 여부
  purpose: string // 용도 (주거용 등)
  heating: string
  parkingCount: string
  securityFacilities: string
  otherFacilities: string
  approvalDate: string
  buildingCount: string
  totalUnits: string
  availableDate: string
  buildingPurpose: string
  propertyNumber: string
  propertyDescription: string
  constructionCompany: string
  detailAddress: string
}
