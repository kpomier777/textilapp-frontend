import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import PropTypes from "prop-types"
import { ArrowLeft24Filled } from "@fluentui/react-icons"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import TextilService from "@/services/textil-service"
import {
  ButtonPrimary,
  InputForm,
} from "@/pages/products/components/styles-tailwind"
import { DotAnimation } from "@/pages/products/components/styles"
import { ENTITY_CLIENTS } from "@/config/entities"
import { THEME_COLOR_CLIENTS, THEME_TEXT_CLIENTS } from "@/config/theme-color"

export default function ClientForm({ edit }) {
  const [waitData, setWaitData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useSelector((state) => state.userAuth)
  TextilService.setAuthorization(token)
  TextilService.setEntity(ENTITY_CLIENTS)

  const navigate = useNavigate()

  const params = useParams()

  const {
    register,
    reset,
    setValue,
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
            setValue("codClient", result?.cod_client)
            setValue("firstNameClient", result?.first_name)
            setValue("lastNameClient", result?.last_name)
            setWaitData({
              codClient: result?.cod_client,
              firstNameClient: result?.first_name,
              lastNameClient: result?.last_name,
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

  const httpCreate = ({ codClient, firstNameClient, lastNameClient }) => {
    setIsLoading(true)
    const payload = {
      cod_client: codClient,
      first_name: firstNameClient,
      last_name: lastNameClient,
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
                onClick: () => navigate("/clientes"),
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
      }
    )
  }

  const httpUpdate = ({ codClient, firstNameClient, lastNameClient }) => {
    setIsLoading(true)
    const payload = {
      id: params?.id,
      cod_client: codClient,
      first_name: firstNameClient,
      last_name: lastNameClient,
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
                onClick: () => navigate("/clientes"),
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

  const handleSubmit = async ({
    codClient,
    firstNameClient,
    lastNameClient,
  }) => {
    if (edit) {
      httpUpdate({ codClient, firstNameClient, lastNameClient })
    } else {
      httpCreate({ codClient, firstNameClient, lastNameClient })
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
          {edit ? "Editar Cliente" : "Nuevo Cliente"}
        </div>
        <form
          onSubmit={onSubmit(handleSubmit)}
          className="flex flex-col gap-4 w-[300px]"
        >
          <div className="flex flex-col">
            <label>
              Código Cliente: <span className="text-rose-700">*</span>
            </label>
            <InputForm
              defaultValue={waitData?.codClient || ""}
              {...register("codClient", {
                required: "Ingrese código de cliente",
              })}
            />
            {errors.codClient && (
              <p className="text-red-500 text-sm mt-1">
                {errors.codClient.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              Nombres: <span className="text-rose-700">*</span>
            </label>
            <InputForm
              defaultValue={waitData?.firstNameClient || ""}
              {...register("firstNameClient", {
                required: "Ingrese nombres",
              })}
            />
            {errors.firstNameClient && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstNameClient.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              Apellidos: <span className="text-rose-700">*</span>
            </label>
            <InputForm
              defaultValue={waitData?.lastNameClient || ""}
              {...register("lastNameClient", {
                required: "Ingrese apellidos",
              })}
            />
            {errors.lastNameClient && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastNameClient.message}
              </p>
            )}
          </div>
          <ButtonPrimary
            style={{
              background: THEME_COLOR_CLIENTS,
              color: THEME_TEXT_CLIENTS,
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

ClientForm.propTypes = {
  edit: PropTypes.bool,
}

ClientForm.defaultProps = {
  edit: false,
}
