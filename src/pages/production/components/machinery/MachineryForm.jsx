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
import { ENTITY_MACHINERY } from "@/config/entities"
import {
  THEME_COLOR_PRODUCTIONS,
  THEME_TEXT_PRODUCTIONS,
} from "@/config/theme-color"

export default function MachineryForm({ edit }) {
  const [waitData, setWaitData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useSelector((state) => state.userAuth)
  TextilService.setAuthorization(token)
  TextilService.setEntity(ENTITY_MACHINERY)

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
            setValue("codMachine", result?.cod_machine)
            setValue("nameMachinery", result?.name)
            setWaitData({
              codMachine: result?.cod_color,
              nameMachinery: result?.name,
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

  const httpCreate = ({ codMachine, nameMachinery }) => {
    setIsLoading(true)
    const payload = {
      cod_machine: codMachine,
      name: nameMachinery,
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
                onClick: () => navigate("/produccion/maquinarias"),
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

  const httpUpdate = ({ codMachine, nameMachinery }) => {
    setIsLoading(true)
    const payload = {
      id: params?.id,
      cod_machine: codMachine,
      name: nameMachinery,
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
                onClick: () => navigate("/produccion/maquinarias"),
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

  const handleSubmit = async ({ codMachine, nameMachinery }) => {
    if (edit) {
      httpUpdate({ codMachine, nameMachinery })
    } else {
      httpCreate({ codMachine, nameMachinery })
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
          {edit ? "Editar Maquinaria" : "Nueva Maquinaria"}
        </div>
        <form
          onSubmit={onSubmit(handleSubmit)}
          className="flex flex-col gap-4 w-[300px]"
        >
          <div className="flex flex-col">
            <label>
              Código Maquinaria: <span className="text-rose-700">*</span>
            </label>
            <span className="relative text-sm text-white/50 py-2">
              (El código debe tener el siguiente formato: T2WW)
            </span>
            <InputForm
              defaultValue={waitData?.codMachine || ""}
              {...register("codMachine", {
                required: "Ingrese código de Maquinaria",
              })}
            />
            {errors.codMachine && (
              <p className="text-red-500 text-sm mt-1">
                {errors.codMachine.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              Nombre de la Maquinaria: <span className="text-rose-700">*</span>
            </label>
            <InputForm
              defaultValue={waitData?.nameMachinery || ""}
              {...register("nameMachinery", {
                required: "Ingrese nombres",
              })}
            />
            {errors.nameMachinery && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nameMachinery.message}
              </p>
            )}
          </div>
          <ButtonPrimary
            style={{
              background: THEME_COLOR_PRODUCTIONS,
              color: THEME_TEXT_PRODUCTIONS,
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

MachineryForm.propTypes = {
  edit: PropTypes.bool,
}

MachineryForm.defaultProps = {
  edit: false,
}
