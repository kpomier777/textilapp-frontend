import React, { lazy, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setThemeFlow } from "@/redux/actionCreators"
import ScrollTop from "@/components/ScrollTop"
import NotmatchPage from "@/pages/notmatch"
import SuspenseComponent from "@/components/SuspenseComponent"
import { THEME_COLOR_CLIENTS } from "@/config/theme-color"

const ClientList = lazy(() => import("./components/ClientList"))
const ClientForm = lazy(() => import("./components/ClientForm"))

const ClientsPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setThemeFlow({
        color: THEME_COLOR_CLIENTS,
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
              <ClientList />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path=":id"
          element={
            <SuspenseComponent>
              <ClientForm edit />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="nuevo"
          element={
            <SuspenseComponent>
              <ClientForm />
            </SuspenseComponent>
          }
        ></Route>
        {/* 404 route */}
        <Route path="*" element={<NotmatchPage />} />
      </Routes>
    </ScrollTop>
  )
}

export default ClientsPage
