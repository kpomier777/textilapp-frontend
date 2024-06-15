import PropTypes from "prop-types"
import { Navigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import SuspenseComponent from "@/components/SuspenseComponent"
import { setPathLocal } from "@/helpers/path-verify-local"
import { userValidationAccess } from "@/helpers/user-validation-access"

export default function AuthControl(props) {
  const userAuth = useSelector((state) => state.userAuth)
  const { logged, element: Component } = props
  const location = useLocation()
  if (!location.pathname?.includes("logout")) {
    setPathLocal(location.pathname)
  }
  const policeAccess = userValidationAccess(location.pathname, userAuth.userRol)
  return (
    <>
      {logged && policeAccess ? (
        <SuspenseComponent>
          <Component />
        </SuspenseComponent>
      ) : (
        <>
          {logged ? (
            <Navigate to="/" replace />
          ) : (
            <Navigate to="/login" replace />
          )}
        </>
      )}
    </>
  )
}

AuthControl.propTypes = {
  logged: PropTypes.bool.isRequired,
  element: PropTypes.elementType.isRequired,
}
