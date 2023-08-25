'use client'
import { useMemo } from 'react'

import { ArticleItem } from '@/src/data/types'
import useDeviceType from '@/src/hooks/DeviceType'
import { Box, Stack, Typography } from '@/src/ui/mui'

type Props = {
  item: ArticleItem
}

const ALT_IMAGE = '/alt_image.svg'
const NaverlandListItem = ({ item }: Props) => {
  const { isMobile } = useDeviceType()
  const imageURL = useMemo(() => item.repImgUrl && `https://landthumb-phinf.pstatic.net/${item.repImgUrl}?type=m400_350`, [item.repImgUrl])
  const handleImageError = ((e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = ALT_IMAGE
    e.currentTarget.onerror = null
    return
  })

  return (
    <Stack tabIndex={0} direction='row' justifyContent='center'>
      <Stack>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {isMobile ? (
          <img src={imageURL ?? ALT_IMAGE} alt='' height={200} style={{ objectFit: 'cover', aspectRatio: 1, borderRadius: '12px' }}  onError={handleImageError} />
        ) : (
          <img src={imageURL ?? ALT_IMAGE} alt='' height={160} style={{ objectFit: 'cover', aspectRatio: 1, borderRadius: '12px' }}  onError={handleImageError} />
        )}
      </Stack>
      <Stack ml={2}>
        <Typography variant='body2' component='p' sx={{overflow: 'hidden', textOverflow: 'ellipsis', hiteSpace: 'nowrap'}}>
          <strong>{item.atclNm}</strong>, {item.flrInfo}층, {item.tradTpCd === 'B1' ? item.hanPrc : `${item.hanPrc}/${item.rentPrc}`}, {item.spc2}/{item.spc1}m<sup>2</sup>
        </Typography>
        <Typography variant='body2' sx={{ fontWeight: 600 }}>{item.atclFetrDesc}</Typography>
        <Box sx={{ mr: 0.5, mt: 0.5 }}>
          {item.tagList.map((tag: string, index: number) => (
            <Typography key={`tag-${index}`} variant='body2' sx={{ display: 'inline-block', fontWeight: 500, backgroundColor: 'grey.200', p: 0.5, mr: 0.5, mb: 0.5, borderRadius: 1, color: 'grey.600' }}>{tag}</Typography>
          ))}
        </Box>
      </Stack>
    </Stack>
  )
}

export default NaverlandListItem
