'use client'
import { useEffect, useMemo, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { detailModalState, zigbangResultState } from '@/app/recoil-state'
import { LoaderIcon } from '@/src/style/icons'
import LandItemDetailModal from '@/src/ui/components/LandItemDetailModal'
import LandListItem from '@/src/ui/components/LandListItem'
import styled from '@emotion/styled'
import { Pagination } from '@mui/material'

type Props = {
  loading: boolean
}

const LandList = ({ loading }: Props) => {
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState<number>(1)
  const landList = useRecoilValue(zigbangResultState)
  const totalItems = useMemo(() => landList.displayedZigbangList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), [currentPage, landList.displayedZigbangList])
  const totalPages = Math.ceil(landList.displayedZigbangList.length / itemsPerPage)
  const [detailModalOpenState, setDetailModalState] = useRecoilState(detailModalState)
  const [selectedItemId, setSelectedItemId] = useState<number>(0)
  const openDetailModal = (itemId: number) => {
    document.body.style.overflow = 'hidden'
    setSelectedItemId(itemId)
    setDetailModalState({ ...detailModalOpenState, landDetailModalopen: true })
  }
  const closeDetailModal = () => {
    if (detailModalOpenState.imageDetailModalOpen) {
      setDetailModalState({ ...detailModalOpenState, imageDetailModalOpen: false })
      return
    }
    document.body.style.overflow = 'auto'
    setDetailModalState({ ...detailModalOpenState, landDetailModalopen: false })
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [landList.displayedZigbangList])

  return (
    <Container aria-label='매물 목록' aria-hidden={detailModalOpenState.landDetailModalopen} tabIndex={detailModalOpenState.landDetailModalopen ? -1 : 0}>
      <TotalCountText>총 {landList.displayedZigbangList.length}+개의 매물이 있습니다.</TotalCountText>
      {loading ? (
        <LoadingContainer>
          <LoaderIcon width={40} height={40} />
        </LoadingContainer>
      ) : (<>
      {landList.displayedZigbangList.length === 0 ? (
        <EmptyContainer>검색된 결과가 없습니다.</EmptyContainer>
      ) : (<>
        {totalItems.map((item) => (
          <LandListItem key={item.item_id} item={item} openModal={openDetailModal} />
        ))}
        <Pagination
          defaultPage={1}
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => setCurrentPage(page)}
          sx={{ alignSelf: 'center', '.MuiPaginationItem-text': { color: 'grey.1000' }, '.Mui-selected': { backgroundColor: 'grey.200' }, cursor: 'pointer', py: 2 }}
        />
      </>)}
     </>)}
     {detailModalOpenState.landDetailModalopen && <LandItemDetailModal itemId={selectedItemId} closeModal={closeDetailModal} />}
    </Container>
  )
}

export default LandList

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const TotalCountText = styled.h1`
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
