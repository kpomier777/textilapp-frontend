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
import { ENTITY_TURNS } from "@/config/entities"
import {
  THEME_COLOR_OPERATORS,
  THEME_TEXT_OPERATORS,
} from "@/config/theme-color"

export default function TurnForm({ edit }) {
  const [waitData, setWaitData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useSelector((state) => state.userAuth)
  TextilService.setAuthorization(token)
  TextilService.setEntity(ENTITY_TURNS)

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
            setValue("nameTurn", result?.name)
            setValue("startTimeTurn", result?.start_time)
            setValue("endTimeTurn", result?.end_time)
            setWaitData({
              nameTurn: result?.name,
              startTimeTurn: result?.start_time,
              endTimeTurn: result?.end_time,
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

  const httpCreate = ({ nameTurn, startTimeTurn, endTimeTurn }) => {
    setIsLoading(true)
    const payload = {
      name: nameTurn,
      start_time: startTimeTurn,
      end_time: endTimeTurn,
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
                onClick: () => navigate("/operadores/turnos"),
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

  const httpUpdate = ({ nameTurn, startTimeTurn, endTimeTurn }) => {
    setIsLoading(true)
    const payload = {
      id: params?.id,
      name: nameTurn,
      start_time: startTimeTurn,
      end_time: endTimeTurn,
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
                onClick: () => navigate("/operadores/turnos"),
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

  const handleSubmit = async ({ nameTurn, startTimeTurn, endTimeTurn }) => {
    if (edit) {
      httpUpdate({ nameTurn, startTimeTurn, endTimeTurn })
    } else {
      httpCreate({ nameTurn, startTimeTurn, endTimeTurn })
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
          {edit ? "Editar Turno" : "Nuevo Turno"}
        </div>
        <form
          onSubmit={onSubmit(handleSubmit)}
          className="flex flex-col gap-4 w-[300px]"
        >
          <div className="flex flex-col">
            <label>
              Nombre del Turno <span className="text-rose-700">*</span>
            </label>
            <InputForm
              defaultValue={waitData?.nameTurn || ""}
              {...register("nameTurn", {
                required: "Ingrese un nombre ej: Turno Mañana",
              })}
            />
            {errors.nameTurn && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nameTurn.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              Horario de entrada: <span className="text-rose-700">*</span>
            </label>
            <InputForm
              type="time"
              defaultValue={waitData?.startTimeTurn || ""}
              {...register("startTimeTurn", {
                required: "Ingrese un horario de entrada",
              })}
            />
            {errors.startTimeTurn && (
              <p className="text-red-500 text-sm mt-1">
                {errors.startTimeTurn.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              Horario de salida: <span className="text-rose-700">*</span>
            </label>
            <InputForm
              type="time"
              defaultValue={waitData?.endTimeTurn || ""}
              {...register("endTimeTurn", {
                required: "Ingrese un horario de salida",
              })}
            />
            {errors.endTimeTurn && (
              <p className="text-red-500 text-sm mt-1">
                {errors.endTimeTurn.message}
              </p>
            )}
          </div>
          <ButtonPrimary
            style={{
              background: THEME_COLOR_OPERATORS,
              color: THEME_TEXT_OPERATORS,
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

TurnForm.propTypes = {
  edit: PropTypes.bool,
}

TurnForm.defaultProps = {
  edit: false,
}
