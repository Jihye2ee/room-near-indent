'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useReducer } from 'react'

import { Stack, Typography } from '@/src/ui/mui'
import BedIcon from '@mui/icons-material/Bed'
import BusinessIcon from '@mui/icons-material/Business'
import HomeIcon from '@mui/icons-material/Home'

type State = {
  isCompanyEmojiShow: boolean
  isSubwayEmojiShow: boolean
  isSchoolEmojiShow: boolean
  isZigbangEmojiShow: boolean
  isNaverlandEmojiShow: boolean
}

type Action =
  | {
      type: 'TOGGLE_COMPANY'
      payload: boolean
    }
  | {
      type: 'TOGGLE_SUBWAY'
      payload: boolean
    }
  | {
      type: 'TOGGLE_SCHOOL'
      payload: boolean
    }
  | {
    type: 'TOGGLE_ZIGBANG'
    payload: boolean
  }
  | {
    type: 'TOGGLE_NAVER_LAND'
    payload: boolean
  }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'TOGGLE_COMPANY':
      return { ...state, isCompanyEmojiShow: !state.isCompanyEmojiShow }
    case 'TOGGLE_SUBWAY':
      return { ...state, isSubwayEmojiShow: !state.isSubwayEmojiShow}
    case 'TOGGLE_SCHOOL':
      return { ...state, isSchoolEmojiShow: !state.isSchoolEmojiShow }
    case 'TOGGLE_ZIGBANG':
      return { ...state, isZigbangEmojiShow: !state.isZigbangEmojiShow }
    case 'TOGGLE_NAVER_LAND':
      return { ...state, isNaverlandEmojiShow: !state.isNaverlandEmojiShow }
    default:
      return state
  }
}

export default function Home() {
  const router = useRouter()
  const [state, dispatch] = useReducer(reducer, { isCompanyEmojiShow: true, isSubwayEmojiShow: true, isSchoolEmojiShow: true, isZigbangEmojiShow: true, isNaverlandEmojiShow: true })
  return (
    <Stack alignItems='center' role='navigation' aria-label='주거 유형 선택' sx={{ mt: { laptop: 10, tablet: 5, mobile: 2 }}}>
      <Typography component='h3' sx={{ fontSize: '20px', fontWeight: 500, lineHeight: 1.5, m: 2, textAlign: 'center' }} tabIndex={0}>
        <span onClick={() => dispatch({ type: 'TOGGLE_ZIGBANG', payload: !state.isZigbangEmojiShow })}>
          <Image aria-hidden='true' src='/zigbang-logo.png' alt='' width={20} height={20} style={{ cursor: 'pointer', marginRight: 2, display: state.isZigbangEmojiShow ? 'inline' : 'none' }} />
          <span style={{ cursor: 'pointer', display: state.isZigbangEmojiShow ? 'none' : 'inline' }}>&nbsp;직방</span>
        </span>
        <span>과&nbsp;</span>
        <span onClick={() => dispatch({ type: 'TOGGLE_NAVER_LAND', payload: !state.isNaverlandEmojiShow })}>
          <Image aria-hidden='true' src='/naverland-logo.png' alt='' width={20} height={20} style={{ cursor: 'pointer', display: state.isNaverlandEmojiShow ? 'inline' : 'none' }} />
          <span style={{ cursor: 'pointer', display: state.isNaverlandEmojiShow ? 'none' : 'inline' }}>&nbsp;네이버부동산&nbsp;</span>
        </span>
        을 돌아다니지 않고, <br/>원하는 집을 탐색해보세요!
      </Typography>
      <Stack direction='row' justifyContent='center' alignItems='center' spacing={2} pl={2} pr={2} sx={{ width: { mobile: '100%' }}}>
        <Stack
          component='button'
          borderRadius={2}
          justifyContent='center'
          alignItems='center'
          height={100}
          sx={{ backgroundColor: '#356EFB', width: { laptop: '120px', mobile: '100%' }, cursor: 'pointer', border: 'none' }}
          onClick={() => router.push('/officetel')}
        >
          <BusinessIcon aria-hidden='true' sx={{ fontSize: '30px', color: 'grey.50' }} />
          <Typography variant='body2' sx={{ color: 'grey.50', fontWeight: 600 }}>오피스텔</Typography>
        </Stack>
        <Stack
          component='button'
          borderRadius={2}
          justifyContent='center'
          alignItems='center'
          height={100}
          sx={{ backgroundColor: '#ffba00', width: { laptop: '120px', mobile: '100%' }, cursor: 'pointer', border: 'none' }}
          onClick={() => router.push('/villa')}
        >
          <HomeIcon aria-hidden='true' sx={{ fontSize: '30px', color: 'grey.50' }} />
          <Typography variant='body2' sx={{ color: 'grey.50', fontWeight: 600 }}>빌라, 투룸+</Typography>
        </Stack>
        <Stack
          component='button'
          borderRadius={2}
          justifyContent='center'
          alignItems='center'
          height={100}
          sx={{ backgroundColor: '#6D24FF', width: { laptop: '120px', mobile: '100%' }, cursor: 'pointer', border: 'none' }}
          onClick={() => router.push('/oneroom')}
        >
          <BedIcon aria-hidden='true' sx={{ fontSize: '30px', color: 'grey.50' }} />
          <Typography variant='body2' sx={{ color: 'grey.50', fontWeight: 600 }}>원룸</Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}
