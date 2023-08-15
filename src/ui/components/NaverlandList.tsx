'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRecoilState } from 'recoil'

import { filterState } from '@/app/recoil-state'
import { Article, NaverlandItem } from '@/src/data/types'
import StyledDataGrid from '@/src/ui/atoms/DataGrid'
import { Stack, Typography } from '@/src/ui/mui'

import NaverlandListItem from './NaverlandListItem'

type Props = {
  item?: NaverlandItem
  totalCount?: number
}

const NaverlandList = ({ item, totalCount }: Props) => {
  const [state, setState] = useRecoilState(filterState)

  return (
    <Stack tabIndex={0} aria-label='매물 목록' sx={{ width: '100%', mb: 22 }}>
      <Stack tabIndex={0} mt={2}>
        <Typography aria-label={`총 ${totalCount}`} variant='body1' sx={{ fontWeight: 500, ml: 1, mb: 1, color: 'grey.600' }}>총 {totalCount}개</Typography>
      </Stack>
      <StyledDataGrid<Article>
        getRowHeight={() => 'auto'}
        autoHeight
        rowCount={totalCount || 0}
        rows={item?.articleList || []}
        getRowId={(row) => row.articleNo}
        columns={[
          {
            field: 'item_id',
            headerName: '매물 정보',
            headerAlign: 'center',
            flex: 0.85,
            align: 'center',
            sortable: false,
            renderCell: ({ row }) => {
              return <NaverlandListItem item={row} />
            }
          },
          {
            field: '',
            headerName: '더보기',
            flex: 0.15,
            align: 'center',
            sortable: false,
            renderCell: ({ row }) =>
              <Link aria-label='더보기' href={`https://new.land.naver.com/houses?ms=${row.latitude},${row.longitude},16&a=VL&e=RETAIL&articleNo=${row.articleNo}`} target='_blank'>
                <Image src='/naverland-logo.png' alt='네이버부동산 더보기' width={20} height={20} />
              </Link>
          },
        ]}
        disableColumnMenu
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            }
          }
        }}
        onPaginationModelChange={(paginationModel) => {
          setState({ ...state, page: paginationModel.page + 1 })
        }}
        paginationMode='server'
      />
    </Stack>
  )
}

export default NaverlandList

