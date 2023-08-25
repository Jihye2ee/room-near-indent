'use client'
import Image from 'next/image'
import Link from 'next/link'

import { PropertyInfo } from '@/src/data/types'
import StyledDataGrid from '@/src/ui/atoms/DataGrid'
import { Stack, Typography } from '@/src/ui/mui'

import LandListItem from './LandListItem'

type Props = {
  items: PropertyInfo[]
}

const LandList = ({ items }: Props) => {
  return (
    <Stack tabIndex={0} aria-label='매물 목록' sx={{ width: '100%' }}>
      <Stack tabIndex={0} mt={2}>
        <Typography aria-label={`총 ${items.length}`} variant='body1' sx={{ fontWeight: 500, ml: 1, mb: 1, color: 'grey.600' }}>총 {items.length}개</Typography>
      </Stack>
      <StyledDataGrid<PropertyInfo>
        getRowHeight={() => 'auto'}
        autoHeight
        rows={items}
        getRowId={(row) => row.item_id}
        columns={[
          {
            field: 'item_id',
            headerName: '매물 정보',
            headerAlign: 'center',
            flex: 0.9,
            sortable: false,
            renderCell: ({ row }) => {
              return <LandListItem item={row} />
            }
          },
          {
            field: '',
            headerName: '+',
            flex: 0.1,
            align: 'center',
            sortable: false,
            renderCell: ({ row }) =>
              <Link aria-label='더보기' href={`https://www.zigbang.com/home/villa/items/${row.item_id}`} target='_blank'>
                <Image src='/zigbang-logo.png' alt='직방 더보기' width={20} height={20} />
              </Link>
          },
        ]}
        disableColumnMenu
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            }
          }
        }}
      />
    </Stack>
  )
}

export default LandList

