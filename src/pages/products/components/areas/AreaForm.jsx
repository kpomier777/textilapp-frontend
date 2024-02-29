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
import { ENTITY_AREAS } from "@/config/entities"
import { THEME_COLOR_PRODUCTS, THEME_TEXT_PRODUCTS } from "@/config/theme-color"

export default function AreaForm({ edit }) {
  const [waitData, setWaitData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useSelector((state) => state.userAuth)
  TextilService.setAuthorization(token)
  TextilService.setEntity(ENTITY_AREAS)

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
            setValue("nameArea", result?.name)
            setValue("descriptionArea", result?.description)
            setWaitData({
              nameArea: result?.name,
              descriptionArea: result?.description,
            })
            return
          }
        }
        throw new Error(response.message)
      },
      (error) => {
        toast.error(error.message)
      }
    )
  }

  const httpCreate = ({ nameArea, descriptionArea }) => {
    setIsLoading(true)
    const payload = {
      name: nameArea,
      description: descriptionArea,
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
                onClick: () => navigate("/productos/areas"),
              },
            })
            reset()
            return
          }
        }
        throw new Error(response.message)
      },
      (error) => {
        toast.error(error.message)
      },
      () => {
        setIsLoading(false)
      }
    )
  }

  const httpUpdate = ({ nameArea, descriptionArea }) => {
    setIsLoading(true)
    const payload = {
      id: params?.id,
      name: nameArea,
      description: descriptionArea,
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
                onClick: () => navigate("/productos/areas"),
              },
            })
            setWaitData(payload)
            return
          }
        }
        throw new Error(response.message)
      },
      (error) => {
        toast.error(error.message)
      },
      () => {
        setIsLoading(false)
      }
    )
  }

  const handleSubmit = async ({ nameArea, descriptionArea }) => {
    if (edit) {
      httpUpdate({ nameArea, descriptionArea })
    } else {
      httpCreate({ nameArea, descriptionArea })
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
          {edit ? "Editar Area" : "Nueva Area"}
        </div>
        <form
          onSubmit={onSubmit(handleSubmit)}
          className="flex flex-col gap-4 w-[300px]"
        >
          <div className="flex flex-col">
            <label>
              Nombre del Area <span className="text-rose-700">*</span>
            </label>
            <InputForm
              defaultValue={waitData?.nameArea || ""}
              {...register("nameArea", {
                required: "Ingrese una area",
              })}
            />
            {errors.nameArea && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nameArea.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              Descripción <span className="text-rose-700">*</span>
            </label>
            <TextareaForm
              defaultValue={waitData?.descriptionArea || ""}
              {...register("descriptionArea", {
                required: "Ingrese una descripción",
              })}
            />
            {errors.descriptionArea && (
              <p className="text-red-500 text-sm mt-1">
                {errors.descriptionArea.message}
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

AreaForm.propTypes = {
  edit: PropTypes.bool,
}

AreaForm.defaultProps = {
  edit: false,
}
