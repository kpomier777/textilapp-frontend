import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import PropTypes from "prop-types"
import { ArrowLeft24Filled } from "@fluentui/react-icons"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import TextilService from "@/services/textil-service"
import { ButtonPrimary, InputForm, TextareaForm } from "../styles-tailwind"
import { DotAnimation } from "../styles"
import { ENTITY_TITLES } from "@/config/entities"
import { THEME_COLOR_PRODUCTS, THEME_TEXT_PRODUCTS } from "@/config/theme-color"

export default function TitleForm({ edit }) {
  const [waitData, setWaitData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useSelector((state) => state.userAuth)
  TextilService.setAuthorization(token)
  TextilService.setEntity(ENTITY_TITLES)

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
            setValue("codTitle", result?.cod_title)
            setValue("nameTitle", result?.name)
            setValue("descriptionTitle", result?.description)
            setWaitData({
              codTitle: result?.cod_title,
              nameTitle: result?.name,
              descriptionTitle: result?.description,
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

  const httpCreate = ({ codTitle, nameTitle, descriptionTitle }) => {
    setIsLoading(true)
    const payload = {
      cod_title: codTitle,
      name: nameTitle,
      description: descriptionTitle,
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
                onClick: () => navigate("/productos/titulos"),
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

  const httpUpdate = ({ codTitle, nameTitle, descriptionTitle }) => {
    setIsLoading(true)
    const payload = {
      id: params?.id,
      cod_title: codTitle,
      name: nameTitle,
      description: descriptionTitle,
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
                onClick: () => navigate("/productos/titulos"),
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

  const handleSubmit = async ({ codTitle, nameTitle, descriptionTitle }) => {
    if (edit) {
      httpUpdate({ codTitle, nameTitle, descriptionTitle })
    } else {
      httpCreate({ codTitle, nameTitle, descriptionTitle })
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
          {edit ? "Editar Titulo" : "Nuevo Titulo"}
        </div>
        <form
          onSubmit={onSubmit(handleSubmit)}
          className="flex flex-col gap-4 w-[400px]"
        >
          <div className="flex flex-col">
            <label>
              Código titulo: <span className="text-rose-700">*</span>
            </label>
            <span className="relative text-sm text-white/50 py-2">
              (El código debe tener el siguiente formato: 1/2)
            </span>
            <InputForm
              defaultValue={waitData?.codTitle || ""}
              {...register("codTitle", {
                required: "Ingrese un código al titulo",
                pattern: {
                  value: /^\d+\/\d+$/gm,
                  message:
                    "Formato incorrecto: debe ser un número quebrado 1/2 o 4/10",
                },
              })}
            />
            {errors.codTitle && (
              <p className="text-red-500 text-sm mt-1">
                {errors.codTitle.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              Nombre titulo: <span className="text-rose-700">*</span>
            </label>
            <InputForm
              defaultValue={waitData?.nameTitle || ""}
              {...register("nameTitle", {
                required: "Ingrese un nombre al titulo",
              })}
            />
            {errors.nameTitle && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nameTitle.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              Descripción: <span className="text-rose-700">*</span>
            </label>
            <TextareaForm
              defaultValue={waitData?.descriptionTitle || ""}
              {...register("descriptionTitle", {
                required: "Ingrese una descripción",
              })}
            />
            {errors.descriptionTitle && (
              <p className="text-red-500 text-sm mt-1">
                {errors.descriptionTitle.message}
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

TitleForm.propTypes = {
  edit: PropTypes.bool,
}

TitleForm.defaultProps = {
  edit: false,
}
