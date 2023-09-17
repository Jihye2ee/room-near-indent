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
