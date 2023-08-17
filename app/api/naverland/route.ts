import { isNil } from 'lodash-es'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    let url = searchParams.get('url')

    if (!url || typeof url !== 'string') {
      return new Response('', {
        status: 400
      })
    }
    const decodedURL = decodeURIComponent(url)
    console.log('[request url]:', url, decodedURL)
    const response = await fetch(decodedURL, {
      method: 'GET',
      headers: {
        "Origin": "new.land.naver.com",
        // https://new.land.naver.com/complexes?ms=37.539817,127.056888,16&a=APT:OPST:PRE&b=B1&e=RETAIL&ad=true
        "Referer": `https://new.land.naver.com/complexes/?ms=37.482968,127.0634,16&a=OPST&b=B1&e=RETAIL`,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Content-Type': 'application/json;charset=UTF-8',
        'Connection': 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        'Sec-Ch-Ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"macOS"',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_NAVER_LAND_TOKEN}`
      }
    })

    if (isNil(response) || !response.ok) {
      console.error('Network response was not ok', response.status, response.statusText)
      return NextResponse.json({ error: `${response.status, response.statusText} 에러가 발생했습니다.` }, { status: 500 })
    }

    const contentType = response.headers.get('Content-Type')
    console.log('[contentType]', contentType)
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json()
      return NextResponse.json(data, { status: 200 })
    } else {
      const data = await response.text()
      console.log('[Authorization]:', `Bearer ${process.env.NEXT_PUBLIC_NAVER_LAND_TOKEN}`)
      console.log('[content type is not application/json]', response.status, response.statusText, response.redirected)
      return NextResponse.json(data, { status: 500 })
    }
  } catch(error) {
    console.error('Fetch operation failed:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
