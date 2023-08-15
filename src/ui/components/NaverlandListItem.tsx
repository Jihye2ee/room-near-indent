'use client'
import { useMemo } from 'react'

import { Article } from '@/src/data/types'
import { Box, Stack, Typography } from '@/src/ui/mui'

type Props = {
  item: Article
}

const ALT_IMAGE = '/alt_image.svg'
const NaverlandListItem = ({ item }: Props) => {
  const imageURL = useMemo(() => item.representativeImgUrl && `https://landthumb-phinf.pstatic.net/${item.representativeImgUrl}?type=m400_350`, [item.representativeImgUrl])

  const handleImageError = ((e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = ALT_IMAGE
    e.currentTarget.onerror = null
    return
  })

  return (
    <Stack tabIndex={0} direction='row' justifyContent='center'>
      <Stack>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageURL ?? ALT_IMAGE} alt='' width={120} height={120} style={{ objectFit: 'cover' }} onError={handleImageError}/>
      </Stack>
      <Stack ml={2}>
        <Typography variant='body2' component='p' sx={{overflow: 'hidden', textOverflow: 'ellipsis', hiteSpace: 'nowrap'}}>
          <strong>{item.articleName}</strong>, {item.floorInfo}층, {item.tradeTypeCode === 'B1' ? item.dealOrWarrantPrc : `${item.dealOrWarrantPrc}/${item.rentPrc}`}, {item.area1}/{item.area2}m<sup>2</sup>
        </Typography>
        <Typography variant='body2' sx={{ fontWeight: 600 }}>{item.articleFeatureDesc}</Typography>
        <Stack direction='row'>
        {item.tagList.map((tag: string, index: number) => (
          <Typography  key={`tag-${index}`} variant='body2' sx={{ display: 'inline-block', fontWeight: 500, backgroundColor: 'grey.200', p: 0.5, borderRadius: 1, color: 'grey.600' }}>{tag}</Typography>
        ))}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default NaverlandListItem
