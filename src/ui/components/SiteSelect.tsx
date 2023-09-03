import { useRecoilState } from 'recoil'

import { filterState } from '@/app/recoil-state'
import styled from '@emotion/styled'

type Props = {
  isOpen: boolean
  onClose: () => void
}
const SiteSelect = ({ isOpen, onClose }: Props) => {
  const [conditions, setConditions] = useRecoilState(filterState)

  return (
    <Container role='dialog' aria-hidden={!isOpen} onKeyDown={(e) => e.key === 'Escape' && onClose()}>
      <SiteTitle>매물 검색 사이트</SiteTitle>
      <SiteSelectButton
        as='button'
        selected={conditions.site === 'zigbang'}
        onClick={() => setConditions({ ...conditions, site: 'zigbang' })}
      >
        직방
      </SiteSelectButton>
      <SiteSelectButton
        as='button'
        selected={conditions.site === 'naver'}
        onClick={() => setConditions({ ...conditions, site: 'naver' })}
      >
        네이버 부동산
      </SiteSelectButton>
    </Container>
  )
}

export default SiteSelect

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background-color: var(--grey-50);
  width: 200px;
  border-radius: 4px;
  border: 1px solid var(--grey-300);
`

const SiteTitle = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: var(--grey-800);
  padding-top: 8px;
`

const SiteSelectButton = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 48px;
  border: 1px solid var(--grey-200);
  border-radius: 4px;
  background-color: ${(props) => props.selected ? 'var(--blue-200)': 'var(--grey-50)'};
  cursor: pointer;

  font-size: 14px;
  font-weight: 500;
  color: var(--grey-800);

  :hover {
    opacity: 0.8;
  }
`
