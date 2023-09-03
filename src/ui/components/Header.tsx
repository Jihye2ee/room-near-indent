'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { filterState, initialFilterStateDefault } from '@/app/recoil-state'
import { Drawer, SxProps } from '@/src/ui/mui'
import styled from '@emotion/styled'
import MenuIcon from '@mui/icons-material/Menu'

import DrawerList from './DrawerList'
import ThemeToggle from './ThemeToggle'

const Header = () => {
  const router = useRouter()
  const pathname = usePathname()
  const setFilterState = useSetRecoilState(filterState)
  const [open, setOpen] = useState(false)
  return (
    <nav aria-label='Main Navigation' tabIndex={0}>
      <Container>
        <Content>
          <MenuContainer>
            <Menu aria-label='Home' as='button' onClick={() => {
              setFilterState(initialFilterStateDefault)
              router.push('/')
            }}>
              <Logo src='/logo.png' alt='logo' />
            </Menu>
            <Menu aria-label='Officetel' as='button' onClick={() => router.push('/officetel')} selected={pathname.includes('officetel')}>
              <MenuText>오피스텔</MenuText>
            </Menu>
            <Menu aria-label='Villa' as='button' onClick={() => router.push('/villa')} selected={pathname.includes('villa')}>
              <MenuText>빌라, 투룸+</MenuText>
            </Menu>
            <Menu aria-label='Oneroom' as='button' onClick={() => router.push('/oneroom')} selected={pathname.includes('oneroom')}>
              <MenuText>원룸</MenuText>
            </Menu>
          </MenuContainer>
          <MobileMenuOpenContainer>
            <Menu aria-label='메뉴 열기' as='button' onClick={() => setOpen(true)}>
              <MenuIcon aria-hidden='true' width={30} height={30} sx={{ color: 'grey.800' }} />
            </Menu>
          </MobileMenuOpenContainer>
          <ThemeToggle />
          <Drawer
            anchor='left'
            open={open}
            onClose={() => setOpen(!open)}
            sx={drawerStyleProp}
          >
            <DrawerList onClose={() => setOpen(false)}/>
          </Drawer>
        </Content>
      </Container>
    </nav>
  )
}

export default Header

const drawerStyleProp: SxProps = {
  zIndex: 99999,
  '.MuiPaper-root': {
    backgroundColor: 'grey.200',
    color: 'grey.800',
  },
  '.MuiPaper-root .MuiDrawer-paper': {
    backgroundColor: 'grey.200',
    color: 'grey.800',
  }
}

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 9999;
  background-color: var(--grey-50);
  border-bottom: 1px solid var(--grey-200);
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  height: 60px;
`

const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;

  @media (max-width: 767px) {
    display: none;
  }
`

const Menu = styled.div<{ selected?: boolean }>`
  display: flex;
  padding: 8px;
  border: none;
  text-align: center;
  cursor: pointer;
  background-color: var(--grey-50);
  border-bottom-style: solid;
  border-bottom-color: ${(props) => props.selected ? 'var(--blue-200)' : 'var(--grey-50)'};
  &:hover {
    background-color: var(--grey-100);
    border-radius: 4px;
  }
  :first-of-type {
    background-color: var(--grey-50);
  }
  @media (max-width: 767px) {
    padding: 0;
  }
`

const Logo = styled.img`
  width: 30px;
  height: 30px;
`

const MenuText = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: var(--grey-600);
`

const MobileMenuOpenContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  @media (min-width: 768px) {
    display: none;
  }
`
