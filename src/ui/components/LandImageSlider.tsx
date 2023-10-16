import styled from '@emotion/styled'

type Props = {
  images: string[]
}

const ALT_IMAGE = '/alt_image.svg'
const LandImageSlider = ({ images }: Props) => {
  const handleImageError = ((e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = ALT_IMAGE
    e.currentTarget.onerror = null
    return
  })

  return (
    <Container>
      {images.slice(0, 4).map((image, index) => (<>
        <Image key={`image-${index}`} src={`${image}?w=800&q=70&a=1`} alt={`room-image-thumbnail-${index}`} onError={handleImageError} />
        {index === 3 && images.length >= 4 && <OverlayText>전체보기</OverlayText>}
      </>))}
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
