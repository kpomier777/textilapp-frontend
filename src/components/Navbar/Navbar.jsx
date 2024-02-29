import React from "react"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import styled from "styled-components"
import {
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
  Persona,
} from "@fluentui/react-components"

import "./Navbar.css"

/* Images */
import TextilAppLogo from "../Graphics/textilapp-logo"

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  color: inherit;
`

const Navbar = () => {
  const userAuth = useSelector((state) => state.userAuth)
  const themeFlow = useSelector((state) => state.themeFlow)

  return (
    <nav className="navbar-wrapper">
      <div className="navbar-content">
        <div
          className="navbar-content--area"
          style={{
            justifyContent: userAuth.logged ? "space-between" : "center",
          }}
        >
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <div className="navbar-content--logo">
              <TextilAppLogo
                fillColor={themeFlow.color}
                className="navbar-content--logo__image"
              />
              <span
                className="navbar-content--logo__title"
                style={{ color: themeFlow.color }}
              >
                TextilApp
              </span>
            </div>
          </NavLink>
          {userAuth.logged && (
            <div className="navbar-content--logout">
              <Menu>
                <MenuTrigger disableButtonEnhancement>
                  <Persona
                    name="Kevin"
                    secondaryText="Disponible"
                    presence={{ status: "available" }}
                    avatar={{ color: "colorful" }}
                  />
                </MenuTrigger>

                <MenuPopover>
                  <MenuList>
                    <MenuItem>Perfil </MenuItem>
                    <MenuItem>Historial</MenuItem>
                    <MenuItem>
                      <NavLinkStyled to="/logout">Cerrar Sesión</NavLinkStyled>
                    </MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
