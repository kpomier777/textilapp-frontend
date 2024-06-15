import React, { lazy, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setThemeFlow } from "@/redux/actionCreators"
import ScrollTop from "@/components/ScrollTop"
import NotmatchPage from "@/pages/notmatch"
import SuspenseComponent from "@/components/SuspenseComponent"
import { THEME_COLOR_CONFIGURATIONS } from "@/config/theme-color"

const UserList = lazy(() => import("./components/UserList"))
const UserForm = lazy(() => import("./components/UserForm"))

const ConfigurationsPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setThemeFlow({
        color: THEME_COLOR_CONFIGURATIONS,
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
              <UserList />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path=":id"
          element={
            <SuspenseComponent>
              <UserForm edit />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="nuevo"
          element={
            <SuspenseComponent>
              <UserForm />
            </SuspenseComponent>
          }
        ></Route>
        {/* 404 route */}
        <Route path="*" element={<NotmatchPage />} />
      </Routes>
    </ScrollTop>
  )
}

export default ConfigurationsPage
