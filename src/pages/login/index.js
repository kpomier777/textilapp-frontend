import React from "react"
import styled from "styled-components"
import LoginForm from "./components/LoginForm"

const LoginPageContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - var(--navbar-space-content));
  padding-top: var(--navbar-space-content);
  box-sizing: border-box;
`

export default function Login() {
  return (
    <LoginPageContainer>
      <LoginForm />
    </LoginPageContainer>
  )
}
