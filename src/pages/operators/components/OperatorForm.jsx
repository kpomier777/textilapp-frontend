import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import PropTypes from "prop-types"
import { ArrowLeft24Filled } from "@fluentui/react-icons"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import { CardHeader, Option, Body1, Caption1 } from "@fluentui/react-components"
import TextilService from "@/services/textil-service"
import { formattedHour } from "@/helpers/date-helper"
import {
  ButtonPrimary,
  InputForm,
  ComboBoxFluent,
} from "@/pages/products/components/styles-tailwind"
import { DotAnimation } from "@/pages/products/components/styles"
import { ENTITY_OCCUPATIONS, ENTITY_OPERATORS } from "@/config/entities"
import {
  THEME_COLOR_OPERATORS,
  THEME_TEXT_OPERATORS,
} from "@/config/theme-color"
import { getIDFromSelected } from "@/helpers/list-helper"

export default function OccupationForm({ edit }) {
  const [waitData, setWaitData] = useState(null)
  const [occupationList, setOccupationList] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useSelector((state) => state.userAuth)
  TextilService.setAuthorization(token)
  TextilService.setEntity(ENTITY_OPERATORS)

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
      const response = await TextilService.getOnePromise(id, ENTITY_OPERATORS)
      const { data, message } = response.data
      if (data) {
        setValue("codOperator", data?.cod_operator)
        setValue("firstNameOperator", data?.first_name)
        setValue("lastNameOperator", data?.last_name)
        setValue("cellphoneOperator", data?.cellphone)
        setValue(
          "idOccupationOperator",
          `${data?.occupationId} - ${data.occupationName}`
        )
        setWaitData({
          codOperator: data?.cod_operator,
          firstNameOperator: data?.first_name,
          lastNameOperator: data?.last_name,
          cellphoneOperator: data?.cellphone,
          idOccupationOperator: `${data?.occupationId} - ${data.occupationName}`,
        })
      } else {
        throw new Error(message)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const httpCreate = ({
    codOperator,
    firstNameOperator,
    lastNameOperator,
    cellphoneOperator,
    idOccupation,
  }) => {
    setIsLoading(true)
    const payload = {
      cod_operator: codOperator,
      first_name: firstNameOperator,
      last_name: lastNameOperator,
      cellphone: cellphoneOperator,
      id_occupation: idOccupation,
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
                onClick: () => navigate("/operadores"),
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

  const httpUpdate = ({
    codOperator,
    firstNameOperator,
    lastNameOperator,
    cellphoneOperator,
    idOccupation,
  }) => {
    setIsLoading(true)
    const payload = {
      id: params?.id,
      cod_operator: codOperator,
      first_name: firstNameOperator,
      last_name: lastNameOperator,
      cellphone: cellphoneOperator,
      id_occupation: idOccupation,
    }
    console.log(payload)
    TextilService.update(
      payload,
      (response) => {
        const { data } = response
        if (data) {
          if (data?.status) {
            toast.success(data?.message, {
              action: {
                label: "Volver al listado",
                onClick: () => navigate("/operadores"),
              },
            })
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

  const httpOccupationList = async () => {
    try {
      const response = await TextilService.getListPromise(
        "?notlimit=true",
        ENTITY_OCCUPATIONS
      )
      const { data, message } = response.data
      if (data) {
        setOccupationList(data)
      } else {
        throw new Error(message)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const getFirstLoadEdit = async () => {
    await httpGetOne(params?.id)
    await httpOccupationList()
  }

  const getFirstLoad = async () => {
    await httpOccupationList()
  }

  const handleSubmit = async ({
    codOperator,
    firstNameOperator,
    lastNameOperator,
    cellphoneOperator,
    idOccupationOperator,
  }) => {
    const idOccupation = getIDFromSelected(idOccupationOperator)
    if (edit) {
      httpUpdate({
        codOperator,
        firstNameOperator,
        lastNameOperator,
        cellphoneOperator,
        idOccupation,
      })
    } else {
      httpCreate({
        codOperator,
        firstNameOperator,
        lastNameOperator,
        cellphoneOperator,
        idOccupation,
      })
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

  const selectedList = waitData ? [waitData?.idOccupationOperator] : []
  const defaultItem = waitData ? waitData?.idOccupationOperator : ""

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
          {edit ? "Editar Operador" : "Nuevo Operador"}
        </div>
        <form
          onSubmit={onSubmit(handleSubmit)}
          autoComplete="off"
          className="flex flex-col gap-4 w-[300px]"
        >
          <div className="flex flex-col">
            <label>
              Código Operador: <span className="text-rose-700">*</span>
            </label>
            <InputForm
              defaultValue={waitData?.codOperator || ""}
              {...register("codOperator", {
                required: "Ingrese código de operador ej: O-1522",
              })}
            />
            {errors.codOperator && (
              <p className="text-red-500 text-sm mt-1">
                {errors.codOperator.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              Nombres: <span className="text-rose-700">*</span>
            </label>
            <InputForm
              defaultValue={waitData?.firstNameOperator || ""}
              {...register("firstNameOperator", {
                required: "Ingrese nombres del operador",
              })}
            />
            {errors.firstNameOperator && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstNameOperator.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              Apellidos: <span className="text-rose-700">*</span>
            </label>
            <InputForm
              defaultValue={waitData?.lastNameOperator || ""}
              {...register("lastNameOperator", {
                required: "Ingrese apellidos del operador",
              })}
            />
            {errors.lastNameOperator && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastNameOperator.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              Celular: <span className="text-rose-700">*</span>
            </label>
            <div className="flex justify-center items-center gap-2">
              <div className="font-bold">(+591)</div>
              <InputForm
                defaultValue={waitData?.cellphoneOperator || ""}
                {...register("cellphoneOperator", {
                  required: "Ingrese un número de celular",
                  pattern: {
                    value: /^[1-9]\d{7}$/,
                    message: "Ingrese un número de celular válido",
                  },
                })}
              />
            </div>
            {errors.cellphoneOperator && (
              <p className="text-red-500 text-sm mt-1">
                {errors.cellphoneOperator.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              Ocupación: <span className="text-rose-700">*</span>
            </label>
            {occupationList ? (
              <>
                {occupationList?.length === 0 ? (
                  <div className="my-4">
                    Aún no tienes ocupaciones registradas{" "}
                    <NavLink
                      to="/operadores/ocupaciones/nuevo"
                      className="block py-2 px-3 rounded-lg text-[#d5af63] hover:bg-[#d5af63]/20"
                    >
                      /Crear_Ocupación
                    </NavLink>
                  </div>
                ) : (
                  <>
                    {isLoading ? (
                      <div className="bg-neutral-600 rounded-lg p-2">
                        <InputForm
                          className="h-[30px] pl-3 text-sm pointer-events-none"
                          defaultValue={getValues("idOccupationOperator") || ""}
                        />
                      </div>
                    ) : (
                      <ComboBoxFluent
                        defaultValue={defaultItem}
                        defaultSelectedOptions={selectedList}
                        {...register("idOccupationOperator", {
                          required: "Elija una ocupación",
                        })}
                        placeholder="Elija una opción"
                      >
                        {occupationList.map((occupationItem) => (
                          <Option
                            key={occupationItem.id}
                            text={`${occupationItem.id} - ${occupationItem.name}`}
                            value={`${occupationItem.id} - ${occupationItem.name}`}
                          >
                            <CardHeader
                              header={
                                <Body1>
                                  <b>{occupationItem.name}</b>
                                </Body1>
                              }
                              description={
                                <Caption1>
                                  {formattedHour(occupationItem.start_time)}
                                  {" - "}
                                  {formattedHour(occupationItem.end_time)}
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
            {errors.idOccupationOperator && (
              <p className="text-red-500 text-sm mt-1">
                {errors.idOccupationOperator.message}
              </p>
            )}
          </div>
          <ButtonPrimary
            style={{
              background: THEME_COLOR_OPERATORS,
              color: THEME_TEXT_OPERATORS,
            }}
            className={`${
              isLoading || !occupationList || occupationList.length === 0
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
