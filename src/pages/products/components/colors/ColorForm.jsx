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
import { ENTITY_COLORS } from "@/config/entities"
import { THEME_COLOR_PRODUCTS, THEME_TEXT_PRODUCTS } from "@/config/theme-color"

export default function ColorForm({ edit }) {
  const [waitData, setWaitData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useSelector((state) => state.userAuth)
  TextilService.setAuthorization(token)
  TextilService.setEntity(ENTITY_COLORS)

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
            setValue("codColor", result?.cod_color)
            setValue("nameColor", result?.name)
            setValue("descriptionColor", result?.description)
            setWaitData({
              codColor: result?.cod_color,
              nameColor: result?.name,
              descriptionColor: result?.description,
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

  const httpCreate = ({ codColor, nameColor, descriptionColor }) => {
    setIsLoading(true)
    const payload = {
      cod_color: codColor,
      name: nameColor,
      description: descriptionColor,
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
                onClick: () => navigate("/productos/colores"),
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

  const httpUpdate = ({ codColor, nameColor, descriptionColor }) => {
    setIsLoading(true)
    const payload = {
      id: params?.id,
      cod_color: codColor,
      name: nameColor,
      description: descriptionColor,
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
                onClick: () => navigate("/productos/colores"),
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

  const handleSubmit = async ({ codColor, nameColor, descriptionColor }) => {
    if (edit) {
      httpUpdate({ codColor, nameColor, descriptionColor })
    } else {
      httpCreate({ codColor, nameColor, descriptionColor })
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
          {edit ? "Editar Color" : "Nuevo Color"}
        </div>
        <form
          onSubmit={onSubmit(handleSubmit)}
          className="flex flex-col gap-4 w-[400px]"
        >
          <div className="flex flex-col">
            <label>
              Código Color <span className="text-rose-700">*</span>
            </label>
            <InputForm
              defaultValue={waitData?.codColor || ""}
              {...register("codColor", {
                required: "Ingrese código al color",
              })}
            />
            {errors.codColor && (
              <p className="text-red-500 text-sm mt-1">
                {errors.codColor.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              Nombre del Color <span className="text-rose-700">*</span>
            </label>
            <InputForm
              defaultValue={waitData?.nameColor || ""}
              {...register("nameColor", {
                required: "Ingrese un nombre al color",
              })}
            />
            {errors.nameColor && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nameColor.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              Descripción <span className="text-rose-700">*</span>
            </label>
            <TextareaForm
              defaultValue={waitData?.descriptionColor || ""}
              {...register("descriptionColor", {
                required: "Ingrese una descripción",
              })}
            />
            {errors.descriptionColor && (
              <p className="text-red-500 text-sm mt-1">
                {errors.descriptionColor.message}
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

ColorForm.propTypes = {
  edit: PropTypes.bool,
}

ColorForm.defaultProps = {
  edit: false,
}
