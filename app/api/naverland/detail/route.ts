import * as cheerio from 'cheerio'
import { isNil } from 'lodash-es'
import { NextRequest, NextResponse } from 'next/server'

import { NaverLandDetail } from '@/src/data/naverland/type'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    let url = searchParams.get('url')
    if (!url || typeof url !== 'string') {
      return new Response('', {
        status: 400
      })
    }

    const userAgent = getRandomUserAgent()
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Origin': 'm.land.naver.com',
        'Referer': 'https://m.land.naver.com/',
        'User-Agent': userAgent,
        'Access-Control-Allow-Origin': '*',
      }
    })

    if (isNil(response) || !response.ok) {
      console.log('Network response was not ok', response.status, response.statusText, response.headers)
      return NextResponse.json({ error: `${response.status, response.statusText} 에러가 발생했습니다.` }, { status: 500 })
    }

    const data = await response.text()
    const $ = cheerio.load(data)
    const detail: NaverLandDetail = {
      propertyType: $('.detail_info_label.type_sale').text(),
      dealType: $('.detail_deal_kind').text(),
      price: $('.detail_deal_price').text(),
      pricePerSquareMeter: $('.detail_extent_text').text(),
      description: $('.detail_introduction_text').text(),
      images: $('.detail_photo_item').map((_, element) => {
        const styleAttr = $(element).attr('style')
        const match = /url\(([^"]+)\)/.exec(styleAttr ?? '');
        if (match && match[1]) {
            return match[1]
        }
      }).get(),
      confirmedDate: $('.detail_info_label.type_confirm').text(),
      location: $('.detail_sale_title').text(),
      areaUnit:$('.detail_table_row .detail_row_cell span.detail_cell_title:contains("계약/전용면적")').next().text(),
      loan:$('.detail_table_row .detail_row_cell span.detail_cell_title:contains("융자금")').next().text(),
      managementFee:$('.detail_table_row .detail_row_cell').eq(2).find('.detail_cell_data').eq(0).text(),
      managementFeeIncludes: $('.detail_table_row .detail_row_cell').eq(2).find('.detail_cell_data').eq(1).text(),
      roomStructure:$('.detail_table_row .detail_row_cell span.detail_cell_title:contains("방구조")').next().text(),
      direction:$('.detail_table_row .detail_row_cell span.detail_cell_title:contains("방향")').next().text(),
      floorInfo:$('.detail_table_row .detail_row_cell').eq(5).find('.detail_cell_data').eq(0).text(),
      roomBathCount:$('.detail_table_row .detail_row_cell span.detail_cell_title:contains("방수/욕실수")').next().text(),
      entranceStructure:$('.detail_table_row .detail_row_cell span.detail_cell_title:contains("현관구조")').next().text(),
      duplexInfo:$('.detail_table_row .detail_row_cell span.detail_cell_title:contains("복층여부")').next().text(),
      purpose:$('.detail_table_row .detail_row_cell span.detail_cell_title:contains("용도")').next().text(),
      heating:$('.detail_table_row .detail_row_cell span.detail_cell_title:contains("난방")').next().text(),
      parkingCount:$('.detail_table_row .detail_row_cell span.detail_cell_title:contains("총주차대수")').next().text(),
      securityFacilities: $('.detail_table_row .detail_row_cell').eq(8).find('.detail_cell_data').eq(1).text(),
      otherFacilities: $('.detail_table_row .detail_row_cell').eq(9).find('.detail_cell_data').eq(0).text(),
      approvalDate: $('.detail_table_row .detail_row_cell').eq(9).find('.detail_cell_data').eq(1).text(),
      buildingCount: $('.detail_table_row .detail_row_cell').eq(10).find('.detail_cell_data').eq(0).text(),
      totalUnits: $('.detail_table_row .detail_row_cell').eq(10).find('.detail_cell_data').eq(1).text(),
      constructionCompany: $('.detail_table_row .detail_row_cell').eq(11).find('.detail_cell_data').text(),
      availableDate: $('.detail_table_row .detail_row_cell span.detail_cell_title:contains("입주가능일")').next().text(),
      buildingPurpose: $('.detail_table_row .detail_row_cell span.detail_cell_title:contains("건축물 용도")').next().text(),
      propertyNumber: $('.detail_table_row .detail_row_cell span.detail_cell_title:contains("매물번호")').next().text(),
      propertyDescription: $('.detail_table_row .detail_row_cell .detail_description_text').text().trim(),
      detailAddress: $('.detail_info_branch').text()
    }

    return NextResponse.json(detail, { status: 200 })
  } catch(error) {
    console.error('Fetch operation failed:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537a',
  'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:54.0) Gecko/20100101 Firefox/54.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
]

const getRandomUserAgent = () => {
  const randomIndex = Math.floor(Math.random() * userAgents.length)
  return userAgents[randomIndex]
}
