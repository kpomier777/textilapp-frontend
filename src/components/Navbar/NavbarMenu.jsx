/* eslint-disable react/no-array-index-key */
import React, { Fragment } from "react"
import styled from "styled-components"
import { NavLink, useLocation } from "react-router-dom"
import MenuList from "@/config/menu-list"
import IconArrowRight from "@/assets/images/menu/icon-arrow-right.svg"

const NavbarMenuWrapper = styled.div`
  display: flex;
  justify-content: end;
  min-height: calc(100vh - var(--navbar-space-content));
`
const NavbarMenuContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  width: auto;
`
const NavbarMenuLink = styled(NavLink)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-top: 14px;
  padding-bottom: 14px;
  padding-right: 34px;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Work Sans", sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: var(--color-white);
  gap: 16px;
  padding: 8px 16px;
  margin: 4px 0px;
  border-radius: 16px;
  > img {
    visibility: hidden;
  }
  &:hover {
    background: var(--color-neutral-background-1-hover);
  }
  &.active {
    background: var(--color-neutral-background-1-hover);
    > img {
      visibility: visible;
    }
  }
`
const NavbarMenuLinkContent = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
`
const NavbarMenuLinkChildren = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 28px;
  border-left: 2px dashed var(--color-neutral-background-1-hover);
  padding-left: 16px;
`

const NavbarMenu = () => {
  const location = useLocation()
  return (
    <NavbarMenuWrapper>
      <NavbarMenuContent>
        {MenuList.map((itemMenu, index) => (
          <Fragment key={`menuLink${index}`}>
            <NavbarMenuLink to={itemMenu.path}>
              <NavbarMenuLinkContent>
                {itemMenu.image}
                <span>{itemMenu.label}</span>
              </NavbarMenuLinkContent>
              {itemMenu.path === location.pathname && (
                <img src={IconArrowRight} alt="Flecha derecha" />
              )}
            </NavbarMenuLink>
            {itemMenu?.hasChildren && (
              <NavbarMenuLinkChildren className="menu-children">
                {itemMenu.children.map((subItem, subIndex) => (
                  <Fragment key={`menuLinkChildren${subIndex}`}>
                    <NavbarMenuLink to={`${itemMenu.path}/${subItem.path}`}>
                      <NavbarMenuLinkContent>
                        <span>{subItem.label}</span>
                      </NavbarMenuLinkContent>
                      <img src={IconArrowRight} alt="Flecha derecha" />
                    </NavbarMenuLink>
                  </Fragment>
                ))}
              </NavbarMenuLinkChildren>
            )}
          </Fragment>
        ))}
      </NavbarMenuContent>
    </NavbarMenuWrapper>
  )
}

export default NavbarMenu
