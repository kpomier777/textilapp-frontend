import {
  HomeMore48Regular,
  BoxMultipleCheckmarkFilled,
  ColorFillFilled,
  HexagonThreeFilled,
  CircleHintFilled,
} from "@fluentui/react-icons"
import { THEME_COLOR_DASHBOARD, THEME_COLOR_PRODUCTIONS } from "./theme-color"

const MenuProduccion = [
  {
    icon: HomeMore48Regular,
    label: "Dashboard",
    path: "/",
    color: THEME_COLOR_DASHBOARD,
  },
  {
    icon: BoxMultipleCheckmarkFilled,
    label: "Maquinaria",
    path: "/produccion/maquinarias",
    color: THEME_COLOR_PRODUCTIONS,
  },
  {
    icon: ColorFillFilled,
    label: "Tintoreria",
    path: "/produccion/tintoreria",
    color: THEME_COLOR_PRODUCTIONS,
  },
  {
    icon: HexagonThreeFilled,
    label: "Devanado",
    path: "/produccion/devanado",
    color: THEME_COLOR_PRODUCTIONS,
  },
  {
    icon: CircleHintFilled,
    label: "Ovillado",
    path: "/produccion/ovillado",
    color: THEME_COLOR_PRODUCTIONS,
  },
]

export default MenuProduccion
