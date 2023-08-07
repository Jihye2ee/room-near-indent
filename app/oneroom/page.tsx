'use client'
import Link from 'next/link'
import { useState } from 'react'

import { getOneroomIDs } from '@/src/data/oneroom/queries'
import { getLandList } from '@/src/data/queries'
import { PropertyInfo } from '@/src/data/types'
import useDeviceType from '@/src/hooks/DeviceType'
import Conditions, { State } from '@/src/ui/components/Conditions'
import LandList from '@/src/ui/components/LandList'
import { Box, Fade, Stack, Typography } from '@/src/ui/mui'
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

const Oneroom = () => {
  const [landList, setLandList] = useState<PropertyInfo[]>([])

  const applySearch = async (state: State) => {
    const itemIDs = await getOneroomIDs(state)
    const list: PropertyInfo[] = await getLandList(itemIDs)
    setLandList(list)
  }
  const { isMobile } = useDeviceType()
  const [isShow, setIsShow] = useState(!isMobile)

  return (
    <Stack height='100%' sx={{ flexDirection: { laptop: 'row', mobile: 'column' }, justifyContent: isMobile ? 'flex-start' : 'center' }}>
      {isMobile && (
        <Stack tabIndex={0} px={2} direction='row' justifyContent='space-between' alignItems='center' sx={{ backgroundColor: 'grey.200' }}>
          <Stack aria-label='필터 옵션 선택' role='button' direction='row' alignItems='center' sx={{ backgroundColor: 'grey.200' }}>
            <FilterAltOutlinedIcon sx={{ backgroundColor: 'grey.200', fontSize: 18 }} />
            <Typography display='flex' alignItems='center' variant='body2' height={36} sx={{ backgroundColor: 'grey.200' }}>필터</Typography>
          </Stack>
          {isShow ? (
            <Link role='checkbox' aria-checked={isShow} aria-label='필터 옵션 닫기' href='#' onClick={() => setIsShow(false)}>
              <ExpandLessOutlinedIcon sx={{ backgroundColor: 'grey.200' }} />
            </Link>
          ) : (
            <Link role='checkbox' aria-checked={isShow} aria-label='필터 옵션 열기' href='#' onClick={() => setIsShow(true)}>
              <ExpandMoreOutlinedIcon sx={{ backgroundColor: 'grey.200' }}  />
            </Link>
          )}
        </Stack>
      )}
      {isShow && (
        <Fade in={isShow} timeout={1000}>
          <Stack>
            <Conditions onApply={applySearch}/>
          </Stack>
       </Fade>
      )}
      <Box gap={2} sx={{ width: 400, height: 400 }}>
        <Fade in={true} timeout={1000}>
          <Stack><LandList items={landList} /></Stack>
        </Fade>
      </Box>
    </Stack>
  )
}

export default Oneroom
