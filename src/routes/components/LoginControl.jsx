/* eslint-disable react-hooks/exhaustive-deps */
import { lazy } from "react"
import PropTypes from "prop-types"
import { Navigate } from "react-router-dom"
import SuspenseComponent from "@/components/SuspenseComponent"
import { getPathLocal } from "@/helpers/path-verify-local"

const Login = lazy(() => import("@/pages/login"))

export default function LoginControl(props) {
  const { logged } = props
  const currentBrowserPath = getPathLocal()
  return (
    <>
      {logged ? (
        <Navigate to={currentBrowserPath} replace />
      ) : (
        <SuspenseComponent>
          <Login />
        </SuspenseComponent>
      )}
    </>
  )
}

LoginControl.propTypes = {
  logged: PropTypes.bool.isRequired,
}
