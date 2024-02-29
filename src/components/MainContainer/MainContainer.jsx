import React from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import styled from "styled-components"
import Navbar from "@/components/Navbar/Navbar"
import NavbarMenu from "@/components/Navbar/NavbarMenu"

const MainWrapper = styled.div`
  display: flex;
  padding-top: var(--navbar-space-content);
  width: ${(props) => (props.$logged ? "var(--navbar-width)" : "100%")};
  margin: auto;
  @media (max-width: 1400px) {
    width: 100%;
  }
`
const MainMenuWrapper = styled.div`
  width: auto;
  background-color: var(--color-neutral-background-1);
  padding: 0px 32px;
`
const MainMenuContent = styled.div`
  background-image: linear-gradient(rgba(47, 47, 47, 0.6) 0, #121212 100%),
    var(--background-noise);
  width: ${(props) =>
    props.$logged ? "calc(100% - var(--navbarmenu-space-content))" : "100%"};
`

const MainContainer = ({ children }) => {
  const userAuth = useSelector((state) => state.userAuth)
  return (
    <MainWrapper $logged={userAuth.logged}>
      <Navbar />
      {userAuth.logged && (
        <MainMenuWrapper>
          <NavbarMenu />
        </MainMenuWrapper>
      )}
      <MainMenuContent>{children}</MainMenuContent>
    </MainWrapper>
  )
}

MainContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default MainContainer
