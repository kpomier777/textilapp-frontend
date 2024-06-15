import React, { lazy } from "react"
import { useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom"

import AuthControl from "./components/AuthControl"
import LoginControl from "./components/LoginControl"
import LogoutPage from "@/pages/logout"
import NotmatchPage from "@/pages/notmatch"

const DashboardPage = lazy(() => import("@/pages/dashboard"))
const ClientsPage = lazy(() => import("@/pages/clients"))
const ProductionPage = lazy(() => import("@/pages/production"))
const ProductsPage = lazy(() => import("@/pages/products"))
const OperatorsPage = lazy(() => import("@/pages/operators"))
const ConfigurationsPage = lazy(() => import("@/pages/configuration"))
const HistorialPage = lazy(() => import("@/pages/historial"))

const RouterList = () => {
  const { logged } = useSelector((state) => state.userAuth)

  return (
    <Routes>
      <Route path="*" element={<NotmatchPage />} />
      {/* DashboardPage route */}
      <Route
        exact
        path="/"
        element={<AuthControl logged={logged} element={DashboardPage} />}
      />
      {/* ClientsPage route */}
      <Route
        exact
        path="/clientes/*"
        element={<AuthControl logged={logged} element={ClientsPage} />}
      />

      {/* ProductionPage route */}
      <Route
        exact
        path="/produccion/*"
        element={<AuthControl logged={logged} element={ProductionPage} />}
      />

      {/* ProductsPage route */}
      <Route
        exact
        path="/productos/*"
        element={<AuthControl logged={logged} element={ProductsPage} />}
      />

      {/* ProductsPage route */}
      <Route
        exact
        path="/operadores/*"
        element={<AuthControl logged={logged} element={OperatorsPage} />}
      />

      {/* ConfigurationPage route */}
      <Route
        exact
        path="/configuracion/*"
        element={<AuthControl logged={logged} element={ConfigurationsPage} />}
      />

      {/* HistorialPage route */}
      <Route
        exact
        path="/historial/*"
        element={<AuthControl logged={logged} element={HistorialPage} />}
      />

      {/* Logout route */}
      <Route
        exact
        path="/logout"
        element={<AuthControl logged={logged} element={LogoutPage} />}
      />
      {/* Login route public */}
      <Route exact path="/login" element={<LoginControl logged={logged} />} />
    </Routes>
  )
}

export default RouterList
