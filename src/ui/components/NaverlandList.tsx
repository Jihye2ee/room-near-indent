'use client'
import Image from 'next/image'
import Link from 'next/link'

import { ArticleData, ArticleItem } from '@/src/data/types'
import StyledDataGrid from '@/src/ui/atoms/DataGrid'
import { Stack, Typography } from '@/src/ui/mui'
import { GridOverlay } from '@mui/x-data-grid'

import NaverlandListItem from './NaverlandListItem'

type Props = {
  item?: ArticleData
  totalCount: number
  handlePagination: (page: number) => void
}

const NaverlandList = ({ item, totalCount, handlePagination }: Props) => {
  return (
    <Stack tabIndex={0} aria-label='매물 목록' sx={{ width: '100%', mb: 22 }}>
      <Stack tabIndex={0}>
        <Typography aria-label={`총 ${totalCount}`} variant='body1' sx={{ fontWeight: 500, ml: 1, mb: 1, color: 'grey.600' }}>총 {totalCount}개</Typography>
      </Stack>
      <StyledDataGrid<ArticleItem>
        getRowHeight={() => 'auto'}
        autoHeight
        rowCount={totalCount || 0}
        rows={item?.body || []}
        getRowId={(row) => row.atclNo}
        columns={[
          {
            field: 'item_id',
            headerName: '매물 정보',
            headerAlign: 'center',
            flex: 1,
            sortable: false,
            renderCell: ({ row }) => {
              return <NaverlandListItem item={row} />
            }
          },
          {
            field: '',
            headerName: '+',
            flex: 0.1,
            align: 'center',
            sortable: false,
            renderCell: ({ row }) =>
              <Link aria-label='더보기' href={`https://new.land.naver.com/houses?ms=${row.lat},${row.lng},16&a=VL&e=RETAIL&articleNo=${row.atclNo}`} target='_blank'>
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
        slots={{
          noRowsOverlay: () => (
            <GridOverlay>
              <Typography variant="body2" color="grey.700">
                검색된 데이터가 없습니다.
              </Typography>
            </GridOverlay>
          ),
        }}
        onPaginationModelChange={(paginationModel: any) => {
          handlePagination(paginationModel.page + 1)
        }}
        paginationMode='server'
      />
    </Stack>
  )
}

export default NaverlandList

