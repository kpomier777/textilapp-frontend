import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import PropTypes from "prop-types"
import { ArrowLeft24Filled, Box24Regular } from "@fluentui/react-icons"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import TextilService from "@/services/textil-service"
import { ButtonPrimary, InputForm, TextareaForm } from "./styles-tailwind"
import { DotAnimation } from "./styles"
import { ENTITY_PRODUCTS } from "@/config/entities"
import { THEME_COLOR_PRODUCTS, THEME_TEXT_PRODUCTS } from "@/config/theme-color"
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
            setValue("kilosNetoProduct", result?.kilos_neto)
            setValue("observationsProduct", result?.observations)
            setValue(
              "colorSelected",
              `${result?.colorId} - ${result?.colorName}`
            )
            setValue(
              "titleSelected",
              `${result?.titleId} - ${result?.titleCod} ${result?.titleName}`
            )
            setWaitData({
              loteProduct: result?.lote,
              nameProduct: result?.name,
              kilosNetoProduct: result?.kilos_neto,
              kilosUsedProduct: result?.kilos_used,
              observationsProduct: result?.observations,
              colorSelected: `${result?.colorId} - ${result?.colorName}`,
              titleSelected: `${result?.titleId} - ${result?.titleCod} ${result?.titleName}`,
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

  const httpCreate = ({
    loteProduct,
    nameProduct,
    kilosNetoProduct,
    observationsProduct,
    idColor,
    idTitle,
  }) => {
    setIsLoading(true)
    const payload = {
      lote: loteProduct,
      name: nameProduct,
      kilos_neto: kilosNetoProduct,
      observations: observationsProduct,
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
    loteProduct,
    nameProduct,
    kilosNetoProduct,
    observationsProduct,
    idColor,
    idTitle,
  }) => {
    setIsLoading(true)
    const payload = {
      id: params?.id,
      lote: loteProduct,
      name: nameProduct,
      kilos_neto: kilosNetoProduct,
      observations: observationsProduct,
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
        throw new Error(data.message)
      },
      (error) => {
        const {
          response: {
            data: { message },
          },
        } = error

        const messageError = message || error.message || "Error en la petición"
        toast.error(messageError)
      },
      () => {
        setIsLoading(false)
      }
    )
  }

  const handleSubmit = async ({
    loteProduct,
    nameProduct,
    kilosNetoProduct,
    observationsProduct,
    colorSelected,
    titleSelected,
  }) => {
    const idColor = getIDFromSelected(colorSelected)
    const idTitle = getIDFromSelected(titleSelected)
    if (edit) {
      httpUpdate({
        loteProduct,
        nameProduct,
        kilosNetoProduct,
        observationsProduct,
        idColor,
        idTitle,
      })
    } else {
      httpCreate({
        loteProduct,
        nameProduct,
        kilosNetoProduct,
        observationsProduct,
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
          className="flex flex-col gap-4 pb-56 w-[400px]"
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
              Caracteristicas
            </h3>
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

          <div className="flex flex-col gap-4 border border-dashed border-tx-green-700 px-5 py-4 rounded-lg">
            <h3
              className="text-xl pb-4"
              style={{ color: THEME_COLOR_PRODUCTS }}
            >
              Peso del Lote
            </h3>
            <div className="flex flex-col">
              <label>
                Peso Neto: (Ej: 99,5) <span className="text-rose-700">*</span>
              </label>
              {edit && (
                <span className="relative text-sm text-rose-700 py-2">
                  Peso en uso: {waitData.kilosUsedProduct}kg
                  <br />
                  Por favor, ingresar un número mayor al usado.
                </span>
              )}
              <div className="flex gap-2">
                <InputForm
                  type="number"
                  defaultValue={waitData?.kilosNetoProduct || ""}
                  step="0.01"
                  min={0}
                  {...register("kilosNetoProduct", {
                    required: "Ingrese el peso neto del producto",
                  })}
                />
                <div className="flex justify-center items-center gap-2 py-2 px-3 rounded-lg text-[#b2d563] bg-[#b2d563]/20 select-none">
                  <Box24Regular />
                  <span>Kg</span>
                </div>
              </div>
              {errors.kilosNetoProduct && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.kilosNetoProduct.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label>Observaciones:</label>
              <TextareaForm
                defaultValue={waitData?.observationsProduct || ""}
                {...register("observationsProduct")}
              />
              {errors.observationsProduct && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.observationsProduct.message}
                </p>
              )}
            </div>
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
