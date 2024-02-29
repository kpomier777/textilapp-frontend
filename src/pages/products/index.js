import React, { lazy, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setThemeFlow } from "@/redux/actionCreators"
import ScrollTop from "@/components/ScrollTop"
import NotmatchPage from "@/pages/notmatch"
import SuspenseComponent from "@/components/SuspenseComponent"
import { THEME_COLOR_PRODUCTS } from "@/config/theme-color"

const ProductList = lazy(() => import("./components/ProductList"))
const ProductForm = lazy(() => import("./components/ProductForm"))

const AreaList = lazy(() => import("./components/areas/AreaList"))
const AreaForm = lazy(() => import("./components/areas/AreaForm"))

const ColorList = lazy(() => import("./components/colors/ColorList"))
const ColorForm = lazy(() => import("./components/colors/ColorForm"))

const TitleList = lazy(() => import("./components/titles/TitleList"))
const TitleForm = lazy(() => import("./components/titles/TitleForm"))

const ProductsPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setThemeFlow({
        color: THEME_COLOR_PRODUCTS,
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
              <ProductList />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path=":id"
          element={
            <SuspenseComponent>
              <ProductForm edit />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="nuevo"
          element={
            <SuspenseComponent>
              <ProductForm />
            </SuspenseComponent>
          }
        ></Route>

        {/* Areas route */}
        <Route
          path="areas"
          element={
            <SuspenseComponent>
              <AreaList />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="areas/:id"
          element={
            <SuspenseComponent>
              <AreaForm edit />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="areas/nuevo"
          element={
            <SuspenseComponent>
              <AreaForm />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="colores"
          element={
            <SuspenseComponent>
              <ColorList />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="colores/:id"
          element={
            <SuspenseComponent>
              <ColorForm edit />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="colores/nuevo"
          element={
            <SuspenseComponent>
              <ColorForm />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="titulos"
          element={
            <SuspenseComponent>
              <TitleList />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="titulos/:id"
          element={
            <SuspenseComponent>
              <TitleForm edit />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="titulos/nuevo"
          element={
            <SuspenseComponent>
              <TitleForm />
            </SuspenseComponent>
          }
        ></Route>
        {/* 404 route */}
        <Route path="*" element={<NotmatchPage />} />
      </Routes>
    </ScrollTop>
  )
}

export default ProductsPage
