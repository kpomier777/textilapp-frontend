import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import PropTypes from "prop-types"
import {
  ArrowLeft24Filled,
  EyeFilled,
  EyeOffFilled,
} from "@fluentui/react-icons"
import { Option, Switch } from "@fluentui/react-components"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import TextilService from "@/services/textil-service"
import {
  ButtonPrimary,
  InputForm,
  ComboBoxFluent,
} from "@/pages/products/components/styles-tailwind"

import { DotAnimation } from "@/pages/products/components/styles"
import { ENTITY_AUTH } from "@/config/entities"
import {
  THEME_COLOR_CONFIGURATIONS,
  THEME_TEXT_CONFIGURATIONS,
} from "@/config/theme-color"
import { ROLES_ENABLED } from "@/config/access"

export default function UserForm({ edit }) {
  const [waitData, setWaitData] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [changePassword, setChangePassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useSelector((state) => state.userAuth)
  TextilService.setAuthorization(token)
  TextilService.setEntity(ENTITY_AUTH)

  const navigate = useNavigate()

  const params = useParams()

  const {
    register,
    reset,
    setValue,
    getValues,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    criteriaMode: "all",
  })

  const httpGetOne = (id) => {
    TextilService.getOne(
      id,
      (response) => {
        const { data } = response
        if (data) {
          if (data?.status) {
            const result = data?.data
            setValue("usernameUser", result?.username)
            setValue("rolUser", result?.rol)
            setWaitData({
              usernameUser: result?.username,
              rolUser: result?.rol,
            })
            return
          }
        }
        throw new Error(data.message)
      },
      (error) => {
        toast.error(error.message)
      }
    )
  }

  const httpCreate = ({ usernameUser, passwordUser, rolUser }) => {
    setIsLoading(true)
    const payload = {
      username: usernameUser,
      password: passwordUser,
      rol: rolUser,
    }
    TextilService.create(
      payload,
      (response) => {
        const { data } = response
        if (data) {
          if (data?.status) {
            toast.success(data?.message, {
              action: {
                label: "Volver al listado",
                onClick: () => navigate("/configuracion"),
              },
            })
            reset()
            return
          }
        }
        throw new Error(data.message)
      },
      (error) => {
        toast.error(error.message)
      },
      () => {
        setIsLoading(false)
        setShowPassword(false)
      }
    )
  }

  const httpUpdate = ({ usernameUser, passwordUser, rolUser }) => {
    setIsLoading(true)
    let payload = null
    if (changePassword) {
      payload = {
        id: params?.id,
        username: usernameUser,
        password: passwordUser,
        rol: rolUser,
      }
    } else {
      payload = {
        id: params?.id,
        username: usernameUser,
        rol: rolUser,
      }
    }
    TextilService.update(
      payload,
      (response) => {
        const { data } = response
        if (data) {
          if (data?.status) {
            toast.success(data?.message, {
              action: {
                label: "Volver al listado",
                onClick: () => navigate("/configuracion"),
              },
            })
            setWaitData(payload)
            return
          }
        }
        throw new Error(data.message)
      },
      (error) => {
        toast.error(error.message)
      },
      () => {
        setIsLoading(false)
      }
    )
  }

  const handleSubmit = async ({ usernameUser, passwordUser, rolUser }) => {
    if (edit) {
      httpUpdate({ usernameUser, passwordUser, rolUser })
    } else {
      httpCreate({ usernameUser, passwordUser, rolUser })
    }
  }

  const handleBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    if (edit && params) {
      if (params?.id) {
        httpGetOne(params?.id)
      }
    }
  }, [])

  if (edit && !waitData) {
    return (
      <div className="relative">
        <div className="relative flex flex-col items-center w-full pb-14 px-14 gap-6">
          <div className="text-4xl font-workSans font-medium mt-28">
            Recuperando Data
            <DotAnimation $delay="500ms">.</DotAnimation>
            <DotAnimation $delay="600ms">.</DotAnimation>
            <DotAnimation $delay="700ms">.</DotAnimation>
          </div>
        </div>
      </div>
    )
  }

  const selectedList = waitData ? [waitData?.rolUser] : []
  const defaultItem = waitData ? waitData?.rolUser : ""
  const ROLES_LIST = Object.keys(ROLES_ENABLED)

  return (
    <div className="relative">
      <div className="relative flex flex-col items-center w-full pb-14 px-14 gap-6">
        <div
          className="absolute flex items-center gap-4 h-8 cursor-pointer top-16 left-0 ml-[10%]"
          onClick={handleBack}
        >
          <ArrowLeft24Filled />
          <span className="underline">Regresar Atrás</span>
        </div>
        <div className="text-4xl font-workSans font-medium mt-28">
          {edit ? "Editar Usuario" : "Nuevo Usuario"}
        </div>
        <form
          onSubmit={onSubmit(handleSubmit)}
          autoComplete="off"
          className="flex flex-col gap-4 w-[300px]"
        >
          <div className="flex flex-col">
            <label>
              Nombre de Usuario: <span className="text-rose-700">*</span>
            </label>
            <InputForm
              defaultValue={waitData?.usernameUser || ""}
              {...register("usernameUser", {
                required: "Ingrese nombre de usuario",
                pattern: {
                  value: /^\S+$/gm,
                  message: "El nombre de usuario no debe tener espacios",
                },
              })}
            />
            {errors.usernameUser && (
              <p className="text-red-500 text-sm mt-1">
                {errors.usernameUser.message}
              </p>
            )}
          </div>
          {edit && (
            <Switch
              label="Cambiar la contraseña"
              value={changePassword}
              onChange={(e) => {
                const checkStatus = e.target.checked
                setChangePassword(checkStatus)
              }}
            />
          )}
          {(!edit || changePassword) && (
            <div className="flex flex-col">
              <label>
                Password: <span className="text-rose-700">*</span>
              </label>
              <div className="flex gap-2">
                <InputForm
                  type={showPassword ? "text" : "password"}
                  defaultValue={waitData?.passwordUser || ""}
                  {...register("passwordUser", {
                    required: "Ingrese contraseña",
                  })}
                />
                <div
                  onClick={() => {
                    setShowPassword(!showPassword)
                  }}
                  className="flex justify-center items-center py-2 px-3 rounded-lg text-[#1ba8f6] bg-[#1ba8f6]/20 select-none cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOffFilled className="w-4 h-4" />
                  ) : (
                    <EyeFilled className="w-4 h-4" />
                  )}
                </div>
              </div>
              {errors.passwordUser && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.passwordUser.message}
                </p>
              )}
            </div>
          )}
          <div className="flex flex-col">
            <label>
              Rol: <span className="text-rose-700">*</span>
            </label>
            {isLoading ? (
              <div className="bg-neutral-600 rounded-lg p-2">
                <InputForm
                  className="h-[30px] pl-3 text-sm pointer-events-none"
                  defaultValue={getValues("rolUser") || ""}
                />
              </div>
            ) : (
              <ComboBoxFluent
                defaultValue={defaultItem}
                defaultSelectedOptions={selectedList}
                {...register("rolUser", {
                  required: "Elija un rol",
                })}
                placeholder="Elija una opción"
              >
                {ROLES_LIST.map((rol, index) => (
                  <Option key={`select-rol-${index}`} text={rol} value={rol}>
                    {rol}
                  </Option>
                ))}
              </ComboBoxFluent>
            )}
            {errors.rolUser && (
              <p className="text-red-500 text-sm mt-1">
                {errors.rolUser.message}
              </p>
            )}
          </div>
          <ButtonPrimary
            style={{
              background: THEME_COLOR_CONFIGURATIONS,
              color: THEME_TEXT_CONFIGURATIONS,
            }}
            className={`${
              isLoading
                ? "pointer-events-none opacity-75 cursor-not-allowed"
                : ""
            }`}
          >
            {isLoading ? (
              <div className="flex">
                Guardando
                <DotAnimation $delay="500ms">.</DotAnimation>
                <DotAnimation $delay="600ms">.</DotAnimation>
                <DotAnimation $delay="700ms">.</DotAnimation>
              </div>
            ) : (
              <div>Guardar</div>
            )}
          </ButtonPrimary>
        </form>
      </div>
    </div>
  )
}

UserForm.propTypes = {
  edit: PropTypes.bool,
}

UserForm.defaultProps = {
  edit: false,
}
