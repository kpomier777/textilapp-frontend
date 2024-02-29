import React, { useEffect, useState } from "react"
import { Toaster } from "sonner"
import { BrowserRouter } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUserAuth } from "@/redux/actionCreators"
import { verifyUserLocal, getUserLocal } from "@/helpers/user-verify-local"
import RouterList from "@/routes/router-list"
import MainContainer from "@/components/MainContainer/MainContainer"
import Loader from "@/components/Loader"

const RouterApp = () => {
  const dispatch = useDispatch()
  const [checkAuth, setCheckAuth] = useState(false)
  useEffect(() => {
    if (verifyUserLocal()) {
      const userLocal = getUserLocal()
      dispatch(
        setUserAuth({
          logged: userLocal.logged,
          userId: userLocal.id,
          username: userLocal.username,
          token: userLocal.token,
        })
      )
    }
    setCheckAuth(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <BrowserRouter>
        <Toaster richColors position="top-right" />
        {checkAuth ? (
          <MainContainer>
            <RouterList />
          </MainContainer>
        ) : (
          <Loader />
        )}
      </BrowserRouter>
    </>
  )
}
export default RouterApp
