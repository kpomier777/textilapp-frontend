import React from "react"
import {
  HomeMore48Regular,
  Cube48Regular,
  PeopleTeam48Regular,
  ScanPerson48Regular,
  Organization48Regular,
  Settings48Regular,
} from "@fluentui/react-icons"
import {
  THEME_COLOR_CLIENTS,
  THEME_COLOR_CONFIGURATIONS,
  THEME_COLOR_DASHBOARD,
  THEME_COLOR_OPERATORS,
  THEME_COLOR_PRODUCTIONS,
  THEME_COLOR_PRODUCTS,
} from "./theme-color"

const IconStyleCommon = {
  width: "24px",
  height: "24px",
}

const MenuList = [
  {
    icon: HomeMore48Regular,
    image: (
      <HomeMore48Regular
        style={IconStyleCommon}
        color={THEME_COLOR_DASHBOARD}
      />
    ),
    label: "Dashboard",
    path: "/",
    color: THEME_COLOR_DASHBOARD,
  },
  {
    icon: PeopleTeam48Regular,
    image: (
      <PeopleTeam48Regular
        style={IconStyleCommon}
        color={THEME_COLOR_CLIENTS}
      />
    ),
    label: "Clientes",
    path: "/clientes",
    color: THEME_COLOR_CLIENTS,
  },
  {
    hasChildren: true,
    icon: Organization48Regular,
    image: (
      <Organization48Regular
        style={IconStyleCommon}
        color={THEME_COLOR_PRODUCTIONS}
      />
    ),
    label: "Producción",
    path: "/produccion",
    color: THEME_COLOR_PRODUCTIONS,
    children: [
      {
        label: "Devanado",
        path: "devanado",
      },
      {
        label: "Ovillado",
        path: "ovillado",
      },
    ],
  },
  {
    hasChildren: true,
    icon: Cube48Regular,
    image: (
      <Cube48Regular style={IconStyleCommon} color={THEME_COLOR_PRODUCTS} />
    ),
    label: "Productos",
    path: "/productos",
    color: THEME_COLOR_PRODUCTS,
    children: [
      {
        label: "Areas",
        path: "areas",
      },
      {
        label: "Colores",
        path: "colores",
      },
      {
        label: "Titulos",
        path: "titulos",
      },
    ],
  },
  {
    hasChildren: true,
    icon: ScanPerson48Regular,
    image: (
      <ScanPerson48Regular
        style={IconStyleCommon}
        color={THEME_COLOR_OPERATORS}
      />
    ),
    label: "Operadores",
    path: "/operadores",
    color: THEME_COLOR_OPERATORS,
    children: [
      {
        label: "Ocupaciones",
        path: "ocupaciones",
      },
      {
        label: "Turnos",
        path: "turnos",
      },
    ],
  },
  {
    icon: Settings48Regular,
    image: (
      <Settings48Regular
        style={IconStyleCommon}
        color={THEME_COLOR_CONFIGURATIONS}
      />
    ),
    label: "Configuración",
    path: "/configuracion",
    color: THEME_COLOR_CONFIGURATIONS,
  },
]

export default MenuList
