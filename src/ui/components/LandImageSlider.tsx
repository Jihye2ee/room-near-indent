import styled from '@emotion/styled'

type Props = {
  type: 'naver' | 'zigbang'
  images: string[]
  openImageSlider: (selectedIndex: number) => void
}

const ALT_IMAGE = '/alt_image.svg'
const LandImageSlider = ({ type, images, openImageSlider }: Props) => {
  const handleImageError = ((e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = ALT_IMAGE
    e.currentTarget.onerror = null
    return
  })

  const imageUrl = (url: string) => {
    if (type === 'naver') {
      return url
    }
    return `${url}?w=800&q=70&a=1`
  }

  return (
    <Container>
      {images.slice(0, 4).map((image, index) => (
        <ImageContainer key={`image-${index}`} onClick={() => openImageSlider(index)}>
          <Image src={imageUrl(image)} alt={`room-image-thumbnail-${index}`} onError={handleImageError} />
          {index === 3 && images.length >= 4 && <OverlayText>전체보기</OverlayText>}
        </ImageContainer>
      ))}
    </Container>
  )
}

export default LandImageSlider

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  position: relative;
  border-radius: 4px;
  width: calc(144px * 5 + 8px * 5);
`

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  position: relative;
`

const Image = styled.img`
  position: relative;
  width: 144px;
  height: 100%;
  aspect-ratio: 1.3333;
  border-radius: 4px;
  object-fit: cover;
  cursor: pointer;
`;

const OverlayText = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 144px;
  height: 100%;
  background-color: var(--grey-500);
  color: var(--grey-50);
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: var(--grey-400);
  }
`;
