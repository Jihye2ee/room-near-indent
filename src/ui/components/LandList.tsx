'use client'
import { useEffect, useMemo, useState } from 'react'

import { PropertyInfo } from '@/src/data/types'
import styled from '@emotion/styled'
import { Pagination } from '@mui/material'

import LandListItem from './LandListItem'

type Props = {
  items: PropertyInfo[]
}

const LandList = ({ items }: Props) => {
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState<number>(1)
  const totalItems = useMemo(() => items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), [currentPage, items])
  const totalPages = Math.ceil(items.length / itemsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [items])

  return (
    <Container tabIndex={0} aria-label='매물 목록'>
      <TotalCountText aria-label={`총 ${items.length}`}>총 {items.length}개</TotalCountText>
      {items.length === 0 ? (
        <EmptyContainer>검색된 결과가 없습니다.</EmptyContainer>
      ) : (<>
        {totalItems.map((item) => (
          <LandListItem key={item.item_id} item={item} />
        ))}
        <Pagination
          defaultPage={1}
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => setCurrentPage(page)}
          sx={{ alignSelf: 'center', '.MuiPaginationItem-text': { color: 'grey.600' }, cursor: 'pointer', py: 2 }}
        />
      </>)}
    </Container>
  )
}

export default LandList

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
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
