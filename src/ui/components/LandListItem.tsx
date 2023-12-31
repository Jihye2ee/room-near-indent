'use client'
import { isEmpty, isNil } from 'lodash-es'
import { useMemo } from 'react'

import { PropertyInfo } from '@/src/data/types'
import { getPriceText } from '@/src/utils/getPriceText'
import styled from '@emotion/styled'

type Props = {
  item: PropertyInfo
  openModal: (itemId: number) => void
}

const ALT_IMAGE = '/alt_image.svg'
const LandListItem = ({ item, openModal }: Props) => {
  const imageURL = useMemo(() => item.images_thumbnail && `${item.images_thumbnail}?w=800&q=70&a=1`, [item.images_thumbnail])
  const handleImageError = ((e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = ALT_IMAGE
    e.currentTarget.onerror = null
    return
  })

  return (
    <Container aria-label='상세보기' onClick={() => openModal(item.item_id)}>
      <Content>
        <ItemImage src={imageURL ?? ALT_IMAGE} alt='' onError={handleImageError} />
        <InfoContainer>
          <TypeText aria-label={item.service_type}>{item.service_type}</TypeText>
            {item.sales_title === '전세' ? (
              <PriceText>{getPriceText(item.deposit)}</PriceText>
            ) : (
              <PriceText>{getPriceText(item.deposit)} / {getPriceText(item.rent)}</PriceText>
            )}
          <InfoText>{item.floor}층 / {item.size_m2}m<sup>2</sup></InfoText>
          <InfoText>{item.address1}</InfoText>
          <InfoText>{item.title}</InfoText>
          {!isNil(item.category_group) && !isNil(item.category_group.convenience_store) && (
            !isEmpty(item.category_group.convenience_store?.[0]) && <InfoText>✅ {item.category_group.convenience_store?.[0].distance}m 내 {item.category_group.convenience_store?.[0].place_name}</InfoText>
          )}
        </InfoContainer>
      </Content>
    </Container>
  )
}

export default LandListItem

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  cursor: pointer;
  padding: 16px;
  :hover {
    background-color: var(--grey-300);
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
`

const ItemImage = styled.img`
  flex: 0 0 auto;
  max-height: 110px;
  aspect-ratio: 1.3333;
  border-radius: 12px;
  object-fit: cover;
`

const TypeText = styled.div`
  width: fit-content;
  padding: 2px 4px;
  color: white;
  background-color: #356EFB;
  font-size: 10px;
  font-weight: 400;
  border-radius: 4px;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: hidden;
`

const PriceText = styled.p`
  color: var(--grey-900);
  font-size: 16px;
  font-weight: 600;
`

const InfoText = styled.p`
  color: var(--grey-900);
  font-size: 12px;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
