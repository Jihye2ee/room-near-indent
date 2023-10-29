'use client'

import { useState } from 'react'

import styled from '@emotion/styled'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CloseIcon from '@mui/icons-material/Close'

type Props = {
  type: 'naver' | 'zigbang'
  images: string[]
  selectedIndex: number
  closeModal: () => void
}

const ALT_IMAGE = '/alt_image.svg'
const ImageSlider = ({ type, images, closeModal, selectedIndex }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex)

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

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

  return (<>
    <Background onClick={closeModal}/>
    <Container>
      <HeaderContainer>
        <CloseContainer onClick={closeModal}>
          <CloseIcon width={24} height={24} />
        </CloseContainer>
        <ImageNumber>{currentIndex + 1} / {images.length}</ImageNumber>
      </HeaderContainer>
      <ImageContaienr>
        <Button onClick={goPrev}>
          <ArrowBackIosIcon width={24} height={24} style={{ color: 'var(--grey-100)' }} />
        </Button>
        <Image src={imageUrl(images[currentIndex])} alt={`room-image-${currentIndex}`} onError={handleImageError} />
        <Button onClick={goNext}>
          <ArrowForwardIosIcon width={24} height={24} style={{ color: 'var(--grey-100)' }}/>
        </Button>
      </ImageContaienr>
    </Container>
  </>)
}

export default ImageSlider

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  background-color: rgba(0,0,0,0.7);
`

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--grey-300);
  border-radius: 8px;
  overflow: auto;
  padding: 16px;
  width: calc(100% - 100px);
  height: calc(100% - 100px);
  ::-webkit-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    display: none; /* Chrome, Safari, Opera */
  }
  @media (max-width: 1023px) {
    width: calc(100% - 200px);
  }
  @media (max-width: 767px) {
    top: 0;
    left: 0;
    transform: translate(0, 0);
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const ImageContaienr = styled.div`
  margin-top: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const ImageNumber = styled.p`
  width: 100%;
  text-align: center;
`

const CloseContainer = styled.div``

const Image = styled.img`
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  border-radius: 4px;
  object-fit: cover;
`

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 8px;
  cursor: pointer;
  border: none;
  border-radius: 32px;
  background-color: transparent;
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.7);
  }
  &:first-of-type {
    left: 16px;
  }
  &:last-of-type {
    right: 16px;
  }
`
