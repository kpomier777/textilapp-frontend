import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import PropTypes from "prop-types"
import {
  ArrowLeft24Filled,
  DatabaseArrowDownFilled,
  Box24Regular,
} from "@fluentui/react-icons"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import TextilService from "@/services/textil-service"
import {
  ButtonPrimary,
  InputForm,
  TextareaForm,
} from "@/pages/products/components/styles-tailwind"
import { DotAnimation } from "@/pages/products/components/styles"
import { ENTITY_PRODUCTS, ENTITY_TINTORERIA } from "@/config/entities"
import {
  THEME_COLOR_PRODUCTIONS,
  THEME_TEXT_PRODUCTS,
} from "@/config/theme-color"
import { getIDFromSelected } from "@/helpers/list-helper"
import ProductInputSelect from "@/pages/products/components/ProductInputSelect"
import MachineryInputSelect from "../machinery/MachineryInputSelect"
import OperatorInputSelect from "@/pages/operators/components/OperatorInputSelect"
import ClientInputSelect from "@/pages/clients/components/ClientInputSelect"

export default function TintoreriaForm({ edit }) {
  const [waitData, setWaitData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [productSelectedCurrent, setProductSelectedCurrent] = useState({
    enabled: false,
    pesoEnabled: 0,
    product: null,
  })
  const { token } = useSelector((state) => state.userAuth)
  TextilService.setAuthorization(token)
  TextilService.setEntity(ENTITY_TINTORERIA)

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

  const httpGetOne = async (id) => {
    try {
      const tintoreria = await TextilService.getOnePromise(
        id,
        ENTITY_TINTORERIA
      )
      const responseTintoreria = await tintoreria.data
      const product = await TextilService.getOnePromise(
        responseTintoreria.data.productId,
        ENTITY_PRODUCTS
      )
      const responseProduct = await product.data
      if (!responseTintoreria.status) {
        throw new Error(responseTintoreria.message)
      }
      if (!responseProduct.status) {
        throw new Error(responseProduct.message)
      }

      const tintoreriaData = responseTintoreria?.data
      setValue(
        "productSelected",
        `${tintoreriaData?.productId} - ${tintoreriaData?.productName}`
      )
      setValue(
        "operatorSelected",
        `${tintoreriaData?.operatorId} - ${tintoreriaData?.operatorFirstName} ${tintoreriaData?.operatorLastName}`
      )
      setValue(
        "machinerySelected",
        `${tintoreriaData?.machineryId} - ${tintoreriaData?.machineryName}`
      )
      setValue(
        "clientSelected",
        `${tintoreriaData?.clientId} - ${tintoreriaData?.clientFirstName} ${tintoreriaData?.clientLastName}`
      )
      setValue("tinaNumTintoreria", tintoreriaData.tina_num)
      setValue("kilosNetoTintoreria", tintoreriaData.kilos_neto)
      setValue("kilosLessTintoreria", tintoreriaData.kilos_less)
      setValue("observationsTintoreria", tintoreriaData.kilos_less)

      setWaitData({
        productSelected: `${tintoreriaData?.productId} - ${tintoreriaData?.productName}`,
        operatorSelected: `${tintoreriaData?.operatorId} - ${tintoreriaData?.operatorFirstName} ${tintoreriaData?.operatorLastName}`,
        machinerySelected: `${tintoreriaData?.machineryId} - ${tintoreriaData?.machineryName}`,
        clientSelected: `${tintoreriaData?.clientId} - ${tintoreriaData?.clientFirstName} ${tintoreriaData?.clientLastName}`,
        tinaNumTintoreria: tintoreriaData.tina_num,
        kilosNetoTintoreria: tintoreriaData.kilos_neto,
        kilosLessTintoreria: tintoreriaData.kilos_less,
        observationsTintoreria: tintoreriaData.observations,
      })

      const productData = responseProduct?.data
      const pesoEnabled =
        Number(productData.kilos_neto - productData.kilos_used) || 0
      setProductSelectedCurrent({
        enabled: true,
        pesoEnabled: Number(pesoEnabled).toFixed(2),
        product: productData,
      })
    } catch (e) {
      console.log(e)
    }
  }

  const httpCreate = ({
    idProduct,
    idOperator,
    idMachinery,
    idClient,
    tinaNumTintoreria,
    kilosNetoTintoreria,
    kilosLessTintoreria,
    observationsTintoreria,
  }) => {
    setIsLoading(true)
    const payload = {
      id_product: idProduct,
      id_machinery: idMachinery,
      id_operator: idOperator,
      id_client: idClient,
      tina_num: tinaNumTintoreria,
      kilos_neto: kilosNetoTintoreria,
      kilos_less: kilosLessTintoreria,
      observations: observationsTintoreria,
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
                onClick: () => navigate("/produccion/tintoreria"),
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
    idMachinery,
    idOperator,
    idClient,
    tinaNumTintoreria,
    observationsTintoreria,
  }) => {
    setIsLoading(true)
    const payload = {
      id: params?.id,
      id_machinery: idMachinery,
      id_operator: idOperator,
      id_client: idClient,
      tina_num: tinaNumTintoreria,
      observations: observationsTintoreria,
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
                onClick: () => navigate("/produccion/tintoreria"),
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

  const handleSubmit = async ({
    productSelected,
    operatorSelected,
    machinerySelected,
    tinaNumTintoreria,
    kilosNetoTintoreria,
    kilosLessTintoreria,
    observationsTintoreria,
    clientSelected,
  }) => {
    const idProduct = getIDFromSelected(productSelected)
    const idOperator = getIDFromSelected(operatorSelected)
    const idMachinery = getIDFromSelected(machinerySelected)
    const idClient = getIDFromSelected(clientSelected)

    if (!productSelectedCurrent.enabled) {
      toast.error("Lote Agotado, no se puede guardar")
      return
    }

    if (edit) {
      httpUpdate({
        idMachinery,
        idOperator,
        idClient,
        tinaNumTintoreria,
        observationsTintoreria,
      })
    } else {
      httpCreate({
        idProduct,
        idOperator,
        idMachinery,
        idClient,
        tinaNumTintoreria,
        kilosNetoTintoreria,
        kilosLessTintoreria,
        observationsTintoreria,
      })
    }
  }

  const handleBack = () => {
    navigate(-1)
  }

  const handleProductSelected = (data) => {
    if (data.optionValue) {
      const product = data.optionValue
      const pesoEnabled = Number(product.kilos_neto - product.kilos_used) || 0
      setProductSelectedCurrent({
        enabled: pesoEnabled > 0,
        pesoEnabled: Number(pesoEnabled).toFixed(2),
        product,
      })
    } else {
      setProductSelectedCurrent({
        enabled: false,
        pesoEnabled: 0,
        product: null,
      })
    }
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
          {edit ? "Editar Producto Tintoreria" : "Nuevo Producto Tintoreria"}
        </div>
        <form
          onSubmit={onSubmit(handleSubmit)}
          autoComplete="off"
          className="flex flex-col gap-4 pb-56 w-[400px]"
        >
          <div className="flex flex-col gap-4 border border-dashed border-white px-5 py-4 rounded-lg">
            <h3
              className="text-xl pb-4"
              style={{ color: THEME_COLOR_PRODUCTIONS }}
            >
              Producto:
            </h3>
            <div
              className={`flex flex-col ${
                edit ? "pointer-events-none opacity-60" : ""
              }`}
            >
              <ProductInputSelect
                register={register}
                errors={errors}
                productSelected={handleProductSelected}
                defaultValue={waitData?.productSelected}
              />
            </div>
          </div>

          {productSelectedCurrent.product &&
            !productSelectedCurrent.enabled && (
              <div
                className="flex flex-col gap-4 border border-dashed border-white px-5 py-4 rounded-lg"
                style={{
                  backgroundColor: `${
                    productSelectedCurrent.product &&
                    !productSelectedCurrent.enabled
                      ? "#dc626d"
                      : "transparent"
                  }`,
                }}
              >
                <h3 className="text-xl text-white font-openSans font-bold">
                  ¡Lote agotado!
                </h3>
                <div className="flex flex-col gap-2 font-dmSans text-base">
                  <div>
                    <strong className="text-black">Peso disponible:</strong>{" "}
                    {productSelectedCurrent.pesoEnabled}kg
                  </div>
                  <div>
                    <strong className="text-black">Peso Usado:</strong>{" "}
                    {productSelectedCurrent.product.kilos_used}kg
                  </div>
                  <div>
                    <strong className="text-black">Peso Neto:</strong>{" "}
                    {productSelectedCurrent.product.kilos_neto}kg
                  </div>
                  <div>
                    <strong className="text-black">Veces usado:</strong>{" "}
                    {productSelectedCurrent.product.usage_counter}
                  </div>
                </div>
              </div>
            )}

          {productSelectedCurrent.product && productSelectedCurrent.enabled && (
            <div className="flex flex-col gap-4 border border-dashed border-white px-5 py-4 rounded-lg">
              <h3
                className="text-xl pb-4"
                style={{ color: THEME_COLOR_PRODUCTIONS }}
              >
                Proceso de Producción:
              </h3>
              <OperatorInputSelect
                register={register}
                errors={errors}
                defaultValue={waitData?.operatorSelected}
              />
              <MachineryInputSelect
                register={register}
                errors={errors}
                defaultValue={waitData?.machinerySelected}
              />

              <div className="flex flex-col">
                <label>
                  Número de tina: <span className="text-rose-700">*</span>
                </label>
                <div className="flex gap-2">
                  <InputForm
                    type="number"
                    defaultValue={waitData?.tinaNumTintoreria || ""}
                    min={0}
                    step={1}
                    {...register("tinaNumTintoreria", {
                      required: "Ingrese el número de tina usado",
                    })}
                  />
                  <div className="flex justify-center items-center gap-2 py-2 px-3 rounded-lg text-[#dc626d] bg-[#dc626d]/20 select-none">
                    <DatabaseArrowDownFilled
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                </div>
                {errors.tinaNumTintoreria && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.tinaNumTintoreria.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {productSelectedCurrent.product && productSelectedCurrent.enabled && (
            <div className="flex flex-col gap-4 border border-dashed border-white px-5 py-4 rounded-lg">
              <h3
                className="text-xl pb-4"
                style={{ color: THEME_COLOR_PRODUCTIONS }}
              >
                Caracteristicas
                <br />
                {!edit && (
                  <small className="text-white">
                    Peso disponible: {productSelectedCurrent.pesoEnabled}kg
                  </small>
                )}
              </h3>
              <div className={`flex flex-col ${edit && "opacity-60"}`}>
                <label>
                  Peso Neto: (Ej: 99,5) <span className="text-rose-700">*</span>
                </label>
                <div className="flex gap-2">
                  <InputForm
                    type="number"
                    defaultValue={waitData?.kilosNetoTintoreria || ""}
                    step="0.01"
                    min={0}
                    {...register("kilosNetoTintoreria", {
                      required: "Ingrese el peso neto de la tintoreria",
                    })}
                    className={`${
                      edit ? "pointer-events-none opacity-60" : ""
                    }`}
                  />
                  <div className="flex justify-center items-center gap-2 py-2 px-3 rounded-lg text-[#dc626d] bg-[#dc626d]/20 select-none">
                    <Box24Regular />
                    <span>Kg</span>
                  </div>
                </div>
                {errors.kilosNetoTintoreria && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.kilosNetoTintoreria.message}
                  </p>
                )}
              </div>
              <div className={`flex flex-col ${edit && "opacity-60"}`}>
                <label>
                  Peso Menos: (Ej: 10,5){" "}
                  <span className="text-rose-700">*</span>
                </label>
                <div className="flex gap-2">
                  <InputForm
                    type="number"
                    defaultValue={waitData?.kilosLessTintoreria || ""}
                    step="0.01"
                    min={0}
                    {...register("kilosLessTintoreria", {
                      required: "Ingrese el peso menos de la tintoreria",
                    })}
                    className={`${
                      edit ? "pointer-events-none opacity-60" : ""
                    }`}
                  />
                  <div className="flex justify-center items-center gap-2 py-2 px-3 rounded-lg text-[#dc626d] bg-[#dc626d]/20 select-none">
                    <Box24Regular />
                    <span>Kg</span>
                  </div>
                </div>
                {errors.kilosLessTintoreria && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.kilosLessTintoreria.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label>Observaciones:</label>
                <TextareaForm
                  defaultValue={waitData?.observationsTintoreria || ""}
                  {...register("observationsTintoreria")}
                />
                {errors.observationsTintoreria && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.observationsTintoreria.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {productSelectedCurrent.product && productSelectedCurrent.enabled && (
            <div className="flex flex-col gap-4 border border-dashed border-white px-5 py-4 rounded-lg">
              <h3
                className="text-xl pb-4"
                style={{ color: THEME_COLOR_PRODUCTIONS }}
              >
                Cliente
              </h3>
              <ClientInputSelect
                register={register}
                errors={errors}
                defaultValue={waitData?.clientSelected}
              />
            </div>
          )}

          {productSelectedCurrent.product && productSelectedCurrent.enabled && (
            <ButtonPrimary
              style={{
                background: THEME_COLOR_PRODUCTIONS,
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
          )}
        </form>
      </div>
    </div>
  )
}

TintoreriaForm.propTypes = {
  edit: PropTypes.bool,
}

TintoreriaForm.defaultProps = {
  edit: false,
}
