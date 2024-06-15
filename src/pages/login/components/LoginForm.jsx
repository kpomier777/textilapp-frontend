import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { toast } from "sonner"
import { setUserAuth } from "@/redux/actionCreators"
import { setUserLocal } from "@/helpers/user-verify-local"
import AuthService from "@/services/auth-service"
import {
  ButtonPrimary,
  InputForm,
} from "@/pages/products/components/styles-tailwind"
import { DotAnimation } from "@/pages/products/components/styles"
import { THEME_COLOR_PRODUCTS, THEME_TEXT_PRODUCTS } from "@/config/theme-color"

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    criteriaMode: "all",
  })

  const httpLogin = ({ userName, userPassword }) => {
    setIsLoading(true)
    const payload = {
      username: userName,
      password: userPassword,
    }
    AuthService.login(
      payload,
      (response) => {
        const { data: rawResponse } = response
        if (rawResponse.status) {
          toast.success(rawResponse.message)
          const userAuthUpdate = {
            logged: true,
            userId: rawResponse.data.userId,
            userRol: rawResponse.data.userRol,
            userName: rawResponse.data.userName,
            token: rawResponse.data.token,
          }
          dispatch(setUserAuth(userAuthUpdate))
          setUserLocal(userAuthUpdate)
        } else {
          toast.error(rawResponse.message)
        }
      },
      (error) => {
        toast.error(error.message)
      }
    )
  }

  const handleSubmit = async ({ userName, userPassword }) => {
    httpLogin({ userName, userPassword })
  }

  return (
    <div className="relative">
      <div className="relative flex flex-col items-center w-full pb-14 px-14 gap-6">
        <div className="w-[300px] text-center text-4xl font-workSans font-medium text-tx-normal">
          Bienvenido
          <span className="block text-sm font-openSans">
            Al sistema textilapp
          </span>
        </div>
        <form
          onSubmit={onSubmit(handleSubmit)}
          className="flex flex-col gap-4 w-[300px]"
        >
          <div className="flex flex-col">
            <label>
              Usuario: <span className="text-rose-700">*</span>
            </label>
            <InputForm
              {...register("userName", {
                required: "Ingrese su usuario",
              })}
            />
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.userName.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              Contraseña: <span className="text-rose-700">*</span>
            </label>
            <InputForm
              type="password"
              {...register("userPassword", {
                required: "Ingrese su contraseña",
              })}
            />
            {errors.userPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.userPassword.message}
              </p>
            )}
          </div>
          <ButtonPrimary
            style={{
              background: THEME_COLOR_PRODUCTS,
              color: THEME_TEXT_PRODUCTS,
            }}
            className={`${
              isLoading
                ? "pointer-events-none opacity-75 cursor-not-allowed"
                : ""
            }`}
          >
            {isLoading ? (
              <div className="flex">
                Verificando
                <DotAnimation $delay="500ms">.</DotAnimation>
                <DotAnimation $delay="600ms">.</DotAnimation>
                <DotAnimation $delay="700ms">.</DotAnimation>
              </div>
            ) : (
              <div>Entrar</div>
            )}
          </ButtonPrimary>
        </form>
      </div>
    </div>
  )
}
