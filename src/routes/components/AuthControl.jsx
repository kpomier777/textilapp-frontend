import PropTypes from "prop-types"
import { Navigate, useLocation } from "react-router-dom"
import SuspenseComponent from "@/components/SuspenseComponent"
import { setPathLocal } from "@/helpers/path-verify-local"

export default function AuthControl(props) {
  const { logged, element: Component } = props
  const location = useLocation()
  if (!location.pathname.includes("logout")) {
    setPathLocal(location.pathname)
  }
  return (
    <>
      {logged ? (
        <SuspenseComponent>
          <Component />
        </SuspenseComponent>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  )
}

AuthControl.propTypes = {
  logged: PropTypes.bool.isRequired,
  element: PropTypes.elementType.isRequired,
}
