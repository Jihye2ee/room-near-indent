'use client'
import { isEmpty, isNil } from 'lodash-es'
import Link from 'next/link'
import { useMemo } from 'react'

import { ArticleItem } from '@/src/data/types'
import styled from '@emotion/styled'

type Props = {
  item: ArticleItem
}

const ALT_IMAGE = '/alt_image.svg'
const NaverlandListItem = ({ item }: Props) => {
  const imageURL = useMemo(() => item.repImgUrl && `https://landthumb-phinf.pstatic.net/${item.repImgUrl}?type=m400_350`, [item.repImgUrl])
  const handleImageError = ((e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = ALT_IMAGE
    e.currentTarget.onerror = null
    return
  })

  return (
    <Container>
      <Content aria-label='더보기' href={`https://new.land.naver.com/houses?ms=${item.lat},${item.lng},16&a=VL&e=RETAIL&articleNo=${item.atclNo}`} target='_blank'>
        <ItemImage src={imageURL ?? ALT_IMAGE} alt='' onError={handleImageError} />
        <InfoContainer>
          <TypeText aria-label={item.atclNm}>{item.atclNm}</TypeText>
          {item.tradTpCd === 'B1' ? (
            <PriceText aria-label={`${item.hanPrc}`}>{item.hanPrc}</PriceText>
          ) : (
            <PriceText aria-label={`${item.hanPrc}/${item.rentPrc}`}>{`${item.hanPrc}/${item.rentPrc}`}</PriceText>
          )}
          <InfoText aria-label={`${item.flrInfo}층 전용${item.spc2}m2`}>{item.flrInfo}층, {item.spc2}/{item.spc1}m<sup>2</sup></InfoText>
          <InfoText aria-label={item.atclFetrDesc}>{item.atclFetrDesc}</InfoText>
          {!isNil(item.category_group) && !isNil(item.category_group.convenience_store) && (
            !isEmpty(item.category_group.convenience_store?.[0]) && <InfoText>✅ {item.category_group.convenience_store?.[0].distance}m 내 {item.category_group.convenience_store?.[0].place_name}</InfoText>
          )}
          <TagContainer>
            {item.tagList.map((tag: string, index: number) => (
              <TagText key={`tag-${index}`}>{tag}</TagText>
            ))}
          </TagContainer>
        </InfoContainer>
      </Content>
    </Container>
  )
}

export default NaverlandListItem

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  cursor: pointer;
  padding: 16px;
  :hover {
    background-color: var(--grey-200);
  }
`

const Content = styled(Link)`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
`

const ItemImage = styled.img`
  flex: 0 0 auto;
  height: 110px;
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

const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  overflow: hidden;
  margin-top: 4px;
  flex-wrap: wrap;
`

const TagText = styled.p`
  color: var(--grey-900);
  font-size: 10px;
  font-weight: 400;
  background-color: var(--grey-300);
  padding: 2px 4px;
  border-radius: 4px;
`
