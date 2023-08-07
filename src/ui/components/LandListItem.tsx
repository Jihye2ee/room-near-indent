'use client'
import Image from 'next/image'
import { useMemo } from 'react'

import { PropertyInfo } from '@/src/data/types'
import { Stack, Typography } from '@/src/ui/mui'

type Props = {
  item: PropertyInfo
}

const LandListItem = ({ item }: Props) => {
  const imageURL = useMemo(() => item.images_thumbnail && `${item.images_thumbnail}?w=800&q=70&a=1`, [item.images_thumbnail])
  return (
    <Stack tabIndex={0} direction='row' alignItems='center' justifyContent='center'>
      <Image src={imageURL ?? ''} sizes='cover' alt='' width={120} height={120} />
      <Stack ml={2} gap={1}>
        <Typography variant='body2' >{item.address1}</Typography>
        <Typography variant='body2'>{item.floor}층 / {item.building_floor}층</Typography>
        <Typography variant='body2'>{item.sales_title}: {item.deposit}/{item.rent}</Typography>
        <Typography variant='body2'>{item.size_m2}m<sup>2</sup></Typography>
        <Typography variant='body2' sx={{ fontWeight: 600 }}>{item.title}</Typography>
      </Stack>
    </Stack>
  )
}

export default LandListItem
