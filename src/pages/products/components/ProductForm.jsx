import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import PropTypes from "prop-types"
import {
  ArrowLeft24Filled,
  Box24Regular,
  ArrowBetweenDown24Regular,
} from "@fluentui/react-icons"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import TextilService from "@/services/textil-service"
import { ButtonPrimary, InputForm, TextareaForm } from "./styles-tailwind"
import { DotAnimation } from "./styles"
import { ENTITY_PRODUCTS } from "@/config/entities"
import { THEME_COLOR_PRODUCTS, THEME_TEXT_PRODUCTS } from "@/config/theme-color"
import AreaInputSelect from "./areas/AreaInputSelect"
import ColorInputSelect from "./colors/ColorInputSelect"
import TitleInputSelect from "./titles/TitleInputSelect"
import { getIDFromSelected } from "@/helpers/list-helper"

export default function ProductForm({ edit }) {
  const [waitData, setWaitData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useSelector((state) => state.userAuth)
  TextilService.setAuthorization(token)
  TextilService.setEntity(ENTITY_PRODUCTS)

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

  const generateNumberLote = () => {
    const currentDate = new Date().getTime()
    setWaitData({
      ...waitData,
      loteProduct: currentDate,
    })
    setValue("loteProduct", currentDate)
  }

  const httpGetOne = (id) => {
    TextilService.getOne(
      id,
      (response) => {
        const { data } = response
        if (data) {
          if (data?.status) {
            const result = data?.data
            setValue("loteProduct", result?.lote)
            setValue("nameProduct", result?.name)
            setValue("weightTotalProduct", result?.weight_total)
            setValue("weightLessProduct", result?.weight_less)
            setValue("observationProduct", result?.observation)
            setValue("areaSelected", `${result?.idArea} - ${result?.areaName}`)
            setValue(
              "colorSelected",
              `${result?.idColor} - ${result?.colorName}`
            )
            setValue(
              "titleSelected",
              `${result?.idTitle} - ${result?.titleName}`
            )
            setWaitData({
              loteProduct: result?.lote,
              nameProduct: result?.name,
              weightTotalProduct: result?.weight_total,
              weightLessProduct: result?.weight_less,
              observationProduct: result?.observation,
              areaSelected: `${result?.idArea} - ${result?.areaName}`,
              colorSelected: `${result?.idColor} - ${result?.colorName}`,
              titleSelected: `${result?.idTitle} - ${result?.titleName}`,
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

  const httpCreate = ({
    loteProduct,
    nameProduct,
    weightTotalProduct,
    weightLessProduct,
    observationProduct,
    idArea,
    idColor,
    idTitle,
  }) => {
    setIsLoading(true)
    const payload = {
      lote: loteProduct,
      name: nameProduct,
      weight_less: weightLessProduct,
      weight_total: weightTotalProduct,
      observation: observationProduct,
      id_area: idArea,
      id_color: idColor,
      id_title: idTitle,
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
                onClick: () => navigate("/productos"),
              },
            })
            setWaitData(null)
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

  const httpUpdate = ({
    loteProduct,
    nameProduct,
    weightTotalProduct,
    weightLessProduct,
    observationProduct,
    idArea,
    idColor,
    idTitle,
  }) => {
    setIsLoading(true)
    const payload = {
      id: params?.id,
      lote: loteProduct,
      name: nameProduct,
      weight_less: weightLessProduct,
      weight_total: weightTotalProduct,
      observation: observationProduct,
      id_area: idArea,
      id_color: idColor,
      id_title: idTitle,
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
                onClick: () => navigate("/productos"),
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

  const handleSubmit = async ({
    loteProduct,
    nameProduct,
    weightTotalProduct,
    weightLessProduct,
    observationProduct,
    areaSelected,
    colorSelected,
    titleSelected,
  }) => {
    const idArea = getIDFromSelected(areaSelected)
    const idColor = getIDFromSelected(colorSelected)
    const idTitle = getIDFromSelected(titleSelected)
    if (edit) {
      httpUpdate({
        loteProduct,
        nameProduct,
        weightTotalProduct,
        weightLessProduct,
        observationProduct,
        idArea,
        idColor,
        idTitle,
      })
    } else {
      httpCreate({
        loteProduct,
        nameProduct,
        weightTotalProduct,
        weightLessProduct,
        observationProduct,
        idArea,
        idColor,
        idTitle,
      })
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
          {edit ? "Editar Producto" : "Nuevo Producto"}
        </div>
        <form
          onSubmit={onSubmit(handleSubmit)}
          autoComplete="off"
          className="flex flex-col gap-4 pb-56 w-[360px]"
        >
          <div className="flex flex-col gap-4 border border-dashed border-tx-green-700 px-5 py-4 rounded-lg">
            <h3
              className="text-xl pb-4"
              style={{ color: THEME_COLOR_PRODUCTS }}
            >
              Identificador
            </h3>
            <div className="flex flex-col">
              <label>
                Lote: <span className="text-rose-700">*</span>
              </label>
              <div className="flex gap-2">
                <InputForm
                  defaultValue={waitData?.loteProduct || ""}
                  {...register("loteProduct", {
                    required: "Ingrese el código lote",
                  })}
                  className={`${edit ? "pointer-events-none opacity-60" : ""}`}
                />
                {!edit && (
                  <button
                    type="button"
                    className="py-2 px-3 rounded-lg text-[#b2d563] hover:bg-[#b2d563]/20"
                    onClick={generateNumberLote}
                  >
                    generar
                  </button>
                )}
              </div>
              {errors.loteProduct && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.loteProduct.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label>
                Nombre del producto: <span className="text-rose-700">*</span>
              </label>
              <InputForm
                defaultValue={waitData?.nameProduct || ""}
                {...register("nameProduct", {
                  required: "Ingrese nombre del producto",
                })}
              />
              {errors.nameProduct && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.nameProduct.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 border border-dashed border-tx-green-700 px-5 py-4 rounded-lg">
            <h3
              className="text-xl pb-4"
              style={{ color: THEME_COLOR_PRODUCTS }}
            >
              Peso Producto (Kg)
            </h3>
            <div className="flex flex-col">
              <label>
                Peso Neto: <span className="text-rose-700">*</span>
              </label>
              <div className="flex gap-2">
                <InputForm
                  type="number"
                  defaultValue={waitData?.weightTotalProduct || ""}
                  {...register("weightTotalProduct", {
                    required: "Ingrese el peso neto del producto",
                    min: {
                      value: 0.01,
                      message: "El valor minimo es 0",
                    },
                  })}
                />
                <div className="flex justify-center items-center gap-2 py-2 px-3 rounded-lg text-[#b2d563] bg-[#b2d563]/20 select-none">
                  <Box24Regular />
                  <span>Kg</span>
                </div>
              </div>
              {errors.weightTotalProduct && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.weightTotalProduct.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label>
                Peso Faltante : <span className="text-rose-700">*</span>
              </label>
              <div className="flex gap-2">
                <InputForm
                  type="number"
                  step="any"
                  defaultValue={waitData?.weightLessProduct || ""}
                  {...register("weightLessProduct", {
                    required: "Ingrese el peso faltante, si no tiene ingrese 0",
                    min: {
                      value: 0,
                      message: "El valor minimo es 0",
                    },
                  })}
                />
                <div className="flex justify-center items-center gap-2 py-2 px-3 rounded-lg text-[#d57263] bg-[#d57263]/20 select-none">
                  <ArrowBetweenDown24Regular />
                  <span>Kg</span>
                </div>
              </div>
              {errors.weightLessProduct && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.weightLessProduct.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label>Observaciones:</label>
              <TextareaForm
                defaultValue={waitData?.observationProduct || ""}
                {...register("observationProduct")}
              />
              {errors.observationProduct && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.observationProduct.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 border border-dashed border-tx-green-700 px-5 py-4 rounded-lg">
            <h3
              className="text-xl pb-4"
              style={{ color: THEME_COLOR_PRODUCTS }}
            >
              Caracteristicas
            </h3>
            <AreaInputSelect
              register={register}
              errors={errors}
              defaultValue={waitData?.areaSelected}
            />
            <ColorInputSelect
              register={register}
              errors={errors}
              defaultValue={waitData?.colorSelected}
            />
            <TitleInputSelect
              register={register}
              errors={errors}
              defaultValue={waitData?.titleSelected}
            />
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

ProductForm.propTypes = {
  edit: PropTypes.bool,
}

ProductForm.defaultProps = {
  edit: false,
}
