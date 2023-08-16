import 'server-only'

import { NextRequest, NextResponse } from 'next/server'

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
      headers: {
        'Host': 'new.land.naver.com',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Referer': 'https://new.land.naver.com/houses',
        'Content-Type': 'application/json;charset=UTF-8',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        'Sec-Ch-Ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"macOS"',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJFQUxFU1RBVEUiLCJpYXQiOjE2OTE3MzA1NzgsImV4cCI6MTY5MTc0MTM3OH0.QmPUgFWYvfzw1ZAgbyGU1vL6ET_yFq6aVGuklXyrFps'
      }
    })
    if (!response.ok) throw new Error()

    const data = await response.json()

    return NextResponse.json(data, { status: 200 })
  } catch(error) {
    console.log('[error]', error)
    return []
  }
}
