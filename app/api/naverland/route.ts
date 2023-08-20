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

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Origin': 'm.land.naver.com',
        'Referer': 'https://m.land.naver.com/',
        // 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36'
      }
    })

    if (isNil(response) || !response.ok) {
      console.log('Network response was not ok', response.status, response.statusText)
      return NextResponse.json({ error: `${response.status, response.statusText} 에러가 발생했습니다.` }, { status: 500 })
    }

    const contentType = response.headers.get('Content-Type')
    console.log('response header', response.headers)
    console.log('response contentType:', contentType)
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json()
      return NextResponse.json(data, { status: 200 })
    } else {
      const data = await response.text()
      console.log('response status type: ', response.status, response.statusText, response.redirected)
      return NextResponse.json(data, { status: 500 })
    }
  } catch(error) {
    console.error('Fetch operation failed:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
