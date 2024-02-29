import React from "react"
import ReactDOM from "react-dom/client"
import { FluentProvider, createDarkTheme } from "@fluentui/react-components"
import App from "./App"
import "./index.css"

const textilappStyle = {
  10: "#010502",
  20: "#0A1D11",
  30: "#0D3118",
  40: "#113E1D",
  50: "#184C21",
  60: "#225A25",
  70: "#2D6829",
  80: "#3A762E",
  90: "#498533",
  100: "#5A9339",
  110: "#6BA140",
  120: "#7DB048",
  130: "#91BE51",
  140: "#A5CC5B",
  150: "#B9DA68",
  160: "#D1E784",
}

const darkTheme = {
  ...createDarkTheme(textilappStyle),
  colorBrandForeground1: textilappStyle[110],
  colorBrandForeground2: textilappStyle[120],
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <FluentProvider theme={darkTheme}>
    <App />
  </FluentProvider>
)
