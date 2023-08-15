export type PropertyInfo = {
  address: string
  address1: string
  address2: string | null
  address3: string | null
  building_floor: number
  deposit: number
  floor: number
  images_thumbnail: string | null
  item_id: number
  reg_date: string
  rent: number
  sales_type: string
  sales_title: string
  service_type: string
  size_m2: number
  title: string
}

export type NaverlandItem = {
  articleList: Article[]
  isMoreData: boolean
  mapExposedCount: number
  nonMapExposedIncluded: boolean
}

export type Article = {
  articleNo: string
  area1: string
  area2: string
  articleConfirmYmd: string
  articleFeatureDesc: string
  articleName: string
  articleRealEstateTypeCode: string // "C03"
  articleRealEstateTypeName: string // "빌라/연립"
  articleStatus: string // R0"
  buildingName: string
  cpMobileArticleLinkUseAtArticleTitleYn: boolean
  cpMobileArticleLinkUseAtCpNameYn: boolean
  cpMobileArticleUrl: string
  cpName: string
  cpPcArticleBridgeUrl: string
  cpPcArticleLinkUseAtArticleTitleYn: boolean
  cpPcArticleLinkUseAtCpNameYn: boolean
  cpPcArticleUrl: string
  cpid: string
  dealOrWarrantPrc: string
  detailAddress: string
  detailAddressYn: string
  direction: string // "동향"
  floorInfo: string // "2/4"
  isComplex: boolean // false
  isDirectTrade: boolean // false
  isInterest: boolean // false
  isLocationShow: boolean
  isPriceModification: boolean
  latitude: string // "37.597911"
  longitude: string // "126.955946"
  priceChangeState: string
  realEstateTypeCode: string // "VL"
  realEstateTypeName: string // "빌라"
  realtorId: string // "dsds0824"
  realtorName: string // "대성공인중개사사무소"
  rentPrc: string // "40"
  representativeImgThumb: string
  representativeImgTypeCode: string // "10"
  representativeImgUrl: string // "/20230812_22/land_naver_16918062668471EWrz_JPEG/temp_reg_image_1.jpg"
  sameAddrCnt: number // 1
  sameAddrDirectCnt: number // 0
  sameAddrMaxPrc: string // "5,000/40"
  sameAddrMinPrc: string // "5,000/40"
  siteImageCount: number // 0
  tradeTypeName: string
  tradeTypeCode: string
  tagList: string[]
}
