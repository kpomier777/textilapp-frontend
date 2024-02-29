import React, { lazy, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setThemeFlow } from "@/redux/actionCreators"
import ScrollTop from "@/components/ScrollTop"
import NotmatchPage from "@/pages/notmatch"
import SuspenseComponent from "@/components/SuspenseComponent"
import { THEME_COLOR_OPERATORS } from "@/config/theme-color"

const OperatorList = lazy(() => import("./components/OperatorList"))
const OperatorForm = lazy(() => import("./components/OperatorForm"))

const TurnList = lazy(() => import("./components/turns/TurnList"))
const TurnForm = lazy(() => import("./components/turns/TurnForm"))

const OccupationList = lazy(() =>
  import("./components/occupations/OccupationList")
)
const OccupationForm = lazy(() =>
  import("./components/occupations/OccupationForm")
)

const OperatorsPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      dispatch(
        setThemeFlow({
          color: THEME_COLOR_OPERATORS,
        })
      )
    )
  }, [])

  return (
    <ScrollTop>
      <Routes>
        <Route
          path=""
          element={
            <SuspenseComponent>
              <OperatorList />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path=":id"
          element={
            <SuspenseComponent>
              <OperatorForm edit />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="nuevo"
          element={
            <SuspenseComponent>
              <OperatorForm />
            </SuspenseComponent>
          }
        ></Route>

        <Route
          path="turnos"
          element={
            <SuspenseComponent>
              <TurnList />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="turnos/:id"
          element={
            <SuspenseComponent>
              <TurnForm edit />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="turnos/nuevo"
          element={
            <SuspenseComponent>
              <TurnForm />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="ocupaciones"
          element={
            <SuspenseComponent>
              <OccupationList />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="ocupaciones/:id"
          element={
            <SuspenseComponent>
              <OccupationForm edit />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="ocupaciones/nuevo"
          element={
            <SuspenseComponent>
              <OccupationForm />
            </SuspenseComponent>
          }
        ></Route>
        {/* 404 route */}
        <Route path="*" element={<NotmatchPage />} />
      </Routes>
    </ScrollTop>
  )
}

export default OperatorsPage
