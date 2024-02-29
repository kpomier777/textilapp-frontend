import React from "react"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import TextilAppLogo from "@/components/Graphics/textilapp-logo"

const NotmatchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - var(--navbar-space-content));
  background-color: var(--color-neutral-background-1);
  user-select: none;
  > img {
    width: 100px;
    height: 100px;
    filter: blur(3px);
  }

  > svg {
    width: 100px;
    height: 100px;
  }
`

const NotmatchMessage = styled.div`
  font-family: "DM Sans", sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: var(--color-white);
  margin: 40px 0px;
  text-shadow: 0px 1px 3px #c5c2c2c4;
`

const NotmatchButton = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 48px;
  border-radius: 5px;
  border: 0;
  color: var(--color-white);
  text-decoration: none;
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
  font-size: 16px;
  background: var(--color-neutral-background-1);
  border: 1px solid var(--color-neutral-background-1-hover);
  cursor: pointer;
  &:hover {
    background: var(--color-neutral-background-1-hover);
  }
`

const NotmatchPage = () => (
  <NotmatchWrapper>
    <TextilAppLogo fillColor="#838383" />
    <NotmatchMessage>Esta página no esta disponible</NotmatchMessage>
    <NotmatchButton to="/">Regresar</NotmatchButton>
  </NotmatchWrapper>
)

export default NotmatchPage
