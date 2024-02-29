import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import PropTypes from "prop-types"
import { ArrowLeft24Filled } from "@fluentui/react-icons"
import { CardHeader, Option, Body1, Caption1 } from "@fluentui/react-components"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import TextilService from "@/services/textil-service"
import { formattedHour } from "@/helpers/date-helper"
import {
  ButtonPrimary,
  InputForm,
  ComboBoxFluent,
} from "@/pages/products/components/styles-tailwind"
import { DotAnimation } from "@/pages/products/components/styles"
import { ENTITY_OCCUPATIONS, ENTITY_TURNS } from "@/config/entities"
import {
  THEME_COLOR_OPERATORS,
  THEME_TEXT_OPERATORS,
} from "@/config/theme-color"
import { getIDFromSelected } from "@/helpers/list-helper"

export default function OccupationForm({ edit }) {
  const [waitData, setWaitData] = useState(null)
  const [turnList, setTurnList] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useSelector((state) => state.userAuth)
  TextilService.setAuthorization(token)
  TextilService.setEntity(ENTITY_OCCUPATIONS)

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

  const httpGetOne = async (id) => {
    try {
      const response = await TextilService.getOnePromise(id, ENTITY_OCCUPATIONS)
      const { data, message } = response.data
      if (data) {
        setValue("nameOccupation", data?.name)
        setValue("idTurnOccupation", `${data?.id_turn} - ${data?.turnName}`)
        setWaitData({
          nameOccupation: data?.name,
          idTurnOccupation: `${data?.id_turn} - ${data?.turnName}`,
        })
      } else {
        throw new Error(message)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const httpCreate = ({ nameOccupation, idTurn }) => {
    setIsLoading(true)
    const payload = {
      name: nameOccupation,
      id_turn: idTurn,
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
                onClick: () => navigate("/operadores/ocupaciones"),
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

  const httpUpdate = ({ nameOccupation, idTurn }) => {
    setIsLoading(true)
    const payload = {
      id: params?.id,
      name: nameOccupation,
      id_turn: idTurn,
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
                onClick: () => navigate("/operadores/ocupaciones"),
              },
            })
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

  const httpTurnList = async () => {
    try {
      const response = await TextilService.getListPromise(
        "?notlimit=true",
        ENTITY_TURNS
      )
      const { data, message } = response.data
      if (data) {
        setTurnList(data)
      } else {
        throw new Error(message)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const getFirstLoad = async () => {
    await httpTurnList()
  }

  const getFirstLoadEdit = async () => {
    await httpGetOne(params?.id)
    await httpTurnList()
  }

  const handleSubmit = async ({ nameOccupation, idTurnOccupation }) => {
    const idTurn = getIDFromSelected(idTurnOccupation)
    if (edit) {
      httpUpdate({ nameOccupation, idTurn })
    } else {
      httpCreate({ nameOccupation, idTurn })
    }
  }

  const handleBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    if (edit && params) {
      if (params?.id) {
        getFirstLoadEdit()
      }
    } else {
      getFirstLoad()
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

  const selectedList = waitData ? [waitData?.idTurnOccupation] : []
  const defaultItem = waitData ? waitData?.idTurnOccupation : ""

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
          {edit ? "Editar Ocupación" : "Nueva Ocupación"}
        </div>
        <form
          onSubmit={onSubmit(handleSubmit)}
          autoComplete="off"
          name="occupationForm"
          className="flex flex-col gap-4 w-[300px]"
        >
          <div className="flex flex-col">
            <label>
              Nombre de Ocupación <span className="text-rose-700">*</span>
            </label>
            <InputForm
              defaultValue={waitData?.nameOccupation || ""}
              {...register("nameOccupation", {
                required: "Ingrese un nombre de ocupación ej: Despachador",
              })}
            />
            {errors.nameOccupation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nameOccupation.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              Horario de entrada: <span className="text-rose-700">*</span>
            </label>
            {turnList ? (
              <>
                {turnList?.length === 0 ? (
                  <div className="my-4">
                    Aún no tienes turnos registrados{" "}
                    <NavLink
                      to="/operadores/turnos/nuevo"
                      className="block py-2 px-3 rounded-lg text-[#d5af63] hover:bg-[#d5af63]/20"
                    >
                      /Crear_Turno
                    </NavLink>
                  </div>
                ) : (
                  <>
                    {isLoading ? (
                      <div className="bg-neutral-600 rounded-lg p-2">
                        <InputForm
                          className="h-[30px] pl-3 text-sm pointer-events-none"
                          defaultValue={getValues("idTurnOccupation") || ""}
                        />
                      </div>
                    ) : (
                      <ComboBoxFluent
                        defaultValue={defaultItem}
                        defaultSelectedOptions={selectedList}
                        {...register("idTurnOccupation", {
                          required: "Elija un turno",
                        })}
                        placeholder="Elija una opción"
                      >
                        {turnList.map((turnItem) => (
                          <Option
                            key={turnItem.id}
                            text={`${turnItem.id} - ${turnItem.name}`}
                            value={`${turnItem.id} - ${turnItem.name}`}
                          >
                            <CardHeader
                              header={
                                <Body1>
                                  <b>{turnItem.name}</b>
                                </Body1>
                              }
                              description={
                                <Caption1>
                                  {formattedHour(turnItem.start_time)}
                                  {" - "}
                                  {formattedHour(turnItem.end_time)}
                                </Caption1>
                              }
                            />
                          </Option>
                        ))}
                      </ComboBoxFluent>
                    )}
                  </>
                )}
              </>
            ) : (
              <div className="bg-neutral-600 rounded-lg p-2">
                <InputForm
                  className="h-[30px] pl-3 text-sm pointer-events-none"
                  defaultValue="Cargando..."
                />
              </div>
            )}
            {errors.idTurnOccupation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.idTurnOccupation.message}
              </p>
            )}
          </div>
          <ButtonPrimary
            style={{
              background: THEME_COLOR_OPERATORS,
              color: THEME_TEXT_OPERATORS,
            }}
            className={`${
              isLoading || !turnList || turnList.length === 0
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

OccupationForm.propTypes = {
  edit: PropTypes.bool,
}

OccupationForm.defaultProps = {
  edit: false,
}
