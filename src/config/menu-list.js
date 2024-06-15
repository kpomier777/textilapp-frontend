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
import { ROLES_ENABLED } from "./access"

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
    access: [
      ROLES_ENABLED.ADMIN,
      ROLES_ENABLED.SUPERVISOR,
      ROLES_ENABLED.OPERATOR,
      ROLES_ENABLED.RRHH,
      ROLES_ENABLED.NONE,
    ],
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
    access: [
      ROLES_ENABLED.ADMIN,
      ROLES_ENABLED.SUPERVISOR,
      ROLES_ENABLED.OPERATOR,
    ],
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
    access: [
      ROLES_ENABLED.ADMIN,
      ROLES_ENABLED.SUPERVISOR,
      ROLES_ENABLED.OPERATOR,
    ],
    children: [
      {
        label: "Maquinaria",
        path: "maquinarias",
        access: [
          ROLES_ENABLED.ADMIN,
          ROLES_ENABLED.SUPERVISOR,
          ROLES_ENABLED.OPERATOR,
        ],
      },
      {
        label: "Tintoreria",
        path: "tintoreria",
        access: [
          ROLES_ENABLED.ADMIN,
          ROLES_ENABLED.SUPERVISOR,
          ROLES_ENABLED.OPERATOR,
        ],
      },
      {
        label: "Devanado",
        path: "devanado",
        access: [
          ROLES_ENABLED.ADMIN,
          ROLES_ENABLED.SUPERVISOR,
          ROLES_ENABLED.OPERATOR,
        ],
      },
      {
        label: "Ovillado",
        path: "ovillado",
        access: [
          ROLES_ENABLED.ADMIN,
          ROLES_ENABLED.SUPERVISOR,
          ROLES_ENABLED.OPERATOR,
        ],
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
    access: [
      ROLES_ENABLED.ADMIN,
      ROLES_ENABLED.SUPERVISOR,
      ROLES_ENABLED.OPERATOR,
    ],
    children: [
      {
        label: "Colores",
        path: "colores",
        access: [ROLES_ENABLED.ADMIN, ROLES_ENABLED.SUPERVISOR],
      },
      {
        label: "Titulos",
        path: "titulos",
        access: [ROLES_ENABLED.ADMIN, ROLES_ENABLED.SUPERVISOR],
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
    access: [ROLES_ENABLED.ADMIN, ROLES_ENABLED.SUPERVISOR, ROLES_ENABLED.RRHH],
    children: [
      {
        label: "Ocupaciones",
        path: "ocupaciones",
        access: [
          ROLES_ENABLED.ADMIN,
          ROLES_ENABLED.SUPERVISOR,
          ROLES_ENABLED.RRHH,
        ],
      },
      {
        label: "Turnos",
        path: "turnos",
        access: [
          ROLES_ENABLED.ADMIN,
          ROLES_ENABLED.SUPERVISOR,
          ROLES_ENABLED.RRHH,
        ],
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
    access: [ROLES_ENABLED.ADMIN, ROLES_ENABLED.SUPERVISOR],
  },
]

export default MenuList
