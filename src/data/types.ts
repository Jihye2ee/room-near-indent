import { KakaoKeywordItem } from './local/types'

export type CategoryGroup = {
  convenience_store?: KakaoKeywordItem[]
  hypermarket?: KakaoKeywordItem[]
  laundromat?: KakaoKeywordItem[]
  cafe?: KakaoKeywordItem[]
  gym?: KakaoKeywordItem[]
}

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
  random_location: {
    lat: number
    lng: number
  }
  category_group: CategoryGroup
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

export type ArticleData = {
  more: boolean
  page: number
  body: ArticleItem[]
}

export type ArticleItem = {
  atclNo: string
  cortarNo: string
  atclNm: string
  repImgUrl: string
  atclFetrDesc: string
  atclStatCd: string // "R0",
  rletTpCd: string //"C02",
  uprRletTpCd: string // "C03",
  rletTpNm: string // "빌라",
  tradTpCd: string // "B1",
  tradTpNm: string // "전세",
  vrfcTpCd: string // "NONE",
  flrInfo: string //"4/5",
  prc: number // 15000,
  rentPrc: number // 0,
  hanPrc: string // "1억 5,000",
  spc1: string //"26",
  spc2: string //"26.88",
  direction: string //"남향",
  atclCfmYmd: string // "23.08.18.",
  lat: number // 37.5389,
  lng: number // 127.049185,
  tagList: string[]
  bildNm: string // "",
  minute: number // 0,
  sameAddrCnt: number // 1,
  sameAddrDirectCnt: number // 0,
  cpid: string //"KAR",
  cpNm: string //"한국공인중개사협회",
  cpCnt: number // 1,
  rltrNm: string // "사랑공인중개사사무소",
  directTradYn: string //"N",
  minMviFee: number // 0,
  maxMviFee: number // 0,
  etRoomCnt: number // 0,
  tradePriceHan: string // "",
  tradeRentPrice: number //0,
  tradeCheckedByOwner: boolean // false,
  dtlAddrYn: string // "N",
  dtlAddr: string // ""
  category_group: CategoryGroup
}

export type ClusterData = {
  code: string
  data: {
    ARTICLE: Cluster[]
  }
  z: number
}

export type Cluster = {
  lgeo: string // "2122110211",
  count: number // 5,
  z: number // 14,
  lat: number // 37.53710939,
  lon: number // 127.05041504,
  psr: number // 0.5
}
