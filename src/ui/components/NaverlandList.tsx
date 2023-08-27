'use client'
import { ArticleData } from '@/src/data/types'
import { LoaderIcon } from '@/src/style/icons'
import { Pagination } from '@/src/ui/mui'
import styled from '@emotion/styled'

import NaverlandListItem from './NaverlandListItem'

type Props = {
  item?: ArticleData
  totalCount: number
  handlePagination: (page: number) => void
  loading: boolean
}

const NaverlandList = ({ item, totalCount, handlePagination, loading }: Props) => {
  const itemsPerPage = 20
  const totalPages = Math.ceil(totalCount / itemsPerPage)

  return (
    <Container tabIndex={0} aria-label='매물 목록'>
      <TotalCountText aria-label={`총 ${totalCount}`}>총 {totalCount}개</TotalCountText>
       {loading ? (
        <LoadingContainer><LoaderIcon width={40} height={40} /></LoadingContainer>
      ) : (<>
        {totalCount === 0 ? (
        <EmptyContainer>검색된 결과가 없습니다.</EmptyContainer>
      ) : (<>
        {item?.body.map((item, index) => (
          <NaverlandListItem key={index} item={item} />
        ))}
        <Pagination
          defaultPage={1}
          count={totalPages}
          page={item?.page}
          onChange={(_, page) => handlePagination(page)}
          sx={{ alignSelf: 'center', '.MuiPaginationItem-text': { color: 'grey.600' }, cursor: 'pointer', py: 2 }}
        />
      </>)}
    </>)}
  </Container>
  )
}

export default NaverlandList

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`

const LoadingContainer = styled.div`

`

const TotalCountText = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: var(--grey-700);
  padding: 16px 16px 0px 16px;
`

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
`
