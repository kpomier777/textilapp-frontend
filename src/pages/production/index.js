import React, { lazy, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setThemeFlow } from "@/redux/actionCreators"
import ScrollTop from "@/components/ScrollTop"
import NotmatchPage from "@/pages/notmatch"
import SuspenseComponent from "@/components/SuspenseComponent"
import { THEME_COLOR_PRODUCTIONS } from "@/config/theme-color"

const ProductionHome = lazy(() => import("./components/ProductionHome"))

const MachineryList = lazy(() => import("./components/machinery/MachineryList"))
const MachineryForm = lazy(() => import("./components/machinery/MachineryForm"))
const MachineryView = lazy(() => import("./components/machinery/MachineryView"))

const TintoreriaList = lazy(() =>
  import("./components/tintoreria/TintoreriaList")
)
const TintoreriaForm = lazy(() =>
  import("./components/tintoreria/TintoreriaForm")
)

const DevanadoList = lazy(() => import("./components/devanado/DevanadoList"))
const DevanadoForm = lazy(() => import("./components/devanado/DevanadoForm"))

const OvilladoList = lazy(() => import("./components/ovillado/OvilladoList"))
const OvilladoForm = lazy(() => import("./components/ovillado/OvilladoForm"))

const ProductionPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setThemeFlow({
        color: THEME_COLOR_PRODUCTIONS,
      })
    )
  }, [])
  return (
    <ScrollTop>
      <Routes>
        <Route
          path=""
          element={
            <SuspenseComponent>
              <ProductionHome />
            </SuspenseComponent>
          }
        ></Route>

        {/* Machinery Routes */}
        <Route
          path="maquinarias"
          element={
            <SuspenseComponent>
              <MachineryList />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="maquinarias/:id"
          element={
            <SuspenseComponent>
              <MachineryForm edit />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="maquinarias/nuevo"
          element={
            <SuspenseComponent>
              <MachineryForm />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="maquinarias/view/:id"
          element={
            <SuspenseComponent>
              <MachineryView />
            </SuspenseComponent>
          }
        ></Route>

        {/* Tintoreria Routes */}
        <Route
          path="tintoreria"
          element={
            <SuspenseComponent>
              <TintoreriaList />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="tintoreria/:id"
          element={
            <SuspenseComponent>
              <TintoreriaForm edit />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="tintoreria/nuevo"
          element={
            <SuspenseComponent>
              <TintoreriaForm />
            </SuspenseComponent>
          }
        ></Route>

        {/* Devanado Routes */}
        <Route
          path="devanado"
          element={
            <SuspenseComponent>
              <DevanadoList />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="devanado/:id"
          element={
            <SuspenseComponent>
              <DevanadoForm edit />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="devanado/nuevo"
          element={
            <SuspenseComponent>
              <DevanadoForm />
            </SuspenseComponent>
          }
        ></Route>

        {/* Ovillado Routes */}
        <Route
          path="ovillado"
          element={
            <SuspenseComponent>
              <OvilladoList />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="ovillado/:id"
          element={
            <SuspenseComponent>
              <OvilladoForm edit />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="ovillado/nuevo"
          element={
            <SuspenseComponent>
              <OvilladoForm />
            </SuspenseComponent>
          }
        ></Route>

        {/* 404 route */}
        <Route path="*" element={<NotmatchPage />} />
      </Routes>
    </ScrollTop>
  )
}

export default ProductionPage
