import { isNil } from 'lodash-es'
import { NextRequest, NextResponse, userAgent } from 'next/server'

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

    const userAgent = getRandomUserAgent()
    console.log('[userAgent]', userAgent)
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Origin': 'm.land.naver.com',
        'Referer': 'https://m.land.naver.com/',
        'User-Agent': userAgent
      }
    })

    if (isNil(response) || !response.ok) {
      console.log('Network response was not ok', response.status, response.statusText, response.headers)
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

const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537',
  'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:54.0) Gecko/20100101 Firefox/54.0',
  'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
]

const getRandomUserAgent = () => {
  const randomIndex = Math.floor(Math.random() * userAgents.length)
  return userAgents[randomIndex]
}
