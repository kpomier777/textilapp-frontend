/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react"
import { Field, ProgressBar } from "@fluentui/react-components"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { removeUserAuth, setThemeFlow } from "@/redux/actionCreators"
import { removeUserLocal } from "@/helpers/user-verify-local"
import { themeFlowDefault } from "@/redux/reducers"

const LogoutWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90vh;
`

export default function LogoutPage() {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(removeUserAuth())
    dispatch(setThemeFlow(themeFlowDefault))
    removeUserLocal()
  }

  useEffect(() => {
    handleLogout()
  }, [])

  return (
    <LogoutWrapper>
      <Field validationMessage="Cerrando Sesión" validationState="none">
        <ProgressBar />
      </Field>
    </LogoutWrapper>
  )
}
