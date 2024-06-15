import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import PropTypes from "prop-types"
import { ArrowLeft24Filled, Box24Regular } from "@fluentui/react-icons"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import TextilService from "@/services/textil-service"
import {
  ButtonPrimary,
  InputForm,
  TextareaForm,
} from "@/pages/products/components/styles-tailwind"
import { DotAnimation } from "@/pages/products/components/styles"
import { ENTITY_PRODUCTS, ENTITY_DEVANADO } from "@/config/entities"
import {
  THEME_COLOR_PRODUCTIONS,
  THEME_TEXT_PRODUCTS,
} from "@/config/theme-color"
import { getIDFromSelected } from "@/helpers/list-helper"
import ProductInputSelect from "@/pages/products/components/ProductInputSelect"
import OperatorInputSelect from "@/pages/operators/components/OperatorInputSelect"
import ClientInputSelect from "@/pages/clients/components/ClientInputSelect"

export default function DevanadoForm({ edit }) {
  const [waitData, setWaitData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [productSelectedCurrent, setProductSelectedCurrent] = useState({
    enabled: false,
    pesoEnabled: 0,
    product: null,
  })
  const { token } = useSelector((state) => state.userAuth)
  TextilService.setAuthorization(token)
  TextilService.setEntity(ENTITY_DEVANADO)

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
      const devanado = await TextilService.getOnePromise(id, ENTITY_DEVANADO)
      const responseDevanado = await devanado.data
      const product = await TextilService.getOnePromise(
        responseDevanado.data.productId,
        ENTITY_PRODUCTS
      )
      const responseProduct = await product.data

      if (!responseDevanado.status) {
        throw new Error(responseDevanado.message)
      }
      if (!responseProduct.status) {
        throw new Error(responseProduct.message)
      }

      const devanadoData = responseDevanado?.data
      setValue(
        "productSelected",
        `${devanadoData?.productId} - ${devanadoData?.productName}`
      )
      setValue(
        "operatorSelected",
        `${devanadoData?.operatorId} - ${devanadoData?.operatorFirstName} ${devanadoData?.operatorLastName}`
      )
      setValue(
        "clientSelected",
        `${devanadoData?.clientId} - ${devanadoData?.clientFirstName} ${devanadoData?.clientLastName}`
      )
      setValue("kilosNetoDevanado", devanadoData.kilos_neto)
      setValue("observationsDevanado", devanadoData.kilos_less)

      setWaitData({
        productSelected: `${devanadoData?.productId} - ${devanadoData?.productName}`,
        operatorSelected: `${devanadoData?.operatorId} - ${devanadoData?.operatorFirstName} ${devanadoData?.operatorLastName}`,
        clientSelected: `${devanadoData?.clientId} - ${devanadoData?.clientFirstName} ${devanadoData?.clientLastName}`,
        kilosNetoDevanado: devanadoData.kilos_neto,
        observationsDevanado: devanadoData.observations,
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
    idClient,
    kilosNetoDevanado,
    observationsDevanado,
  }) => {
    setIsLoading(true)
    const payload = {
      id_product: idProduct,
      id_operator: idOperator,
      id_client: idClient,
      kilos_neto: kilosNetoDevanado,
      observations: observationsDevanado,
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
                onClick: () => navigate("/produccion/devanado"),
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

  const httpUpdate = ({ idOperator, idClient, observationsDevanado }) => {
    setIsLoading(true)
    const payload = {
      id: params?.id,
      id_operator: idOperator,
      id_client: idClient,
      observations: observationsDevanado,
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
                onClick: () => navigate("/produccion/devanado"),
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
    kilosNetoDevanado,
    observationsDevanado,
    clientSelected,
  }) => {
    const idProduct = getIDFromSelected(productSelected)
    const idOperator = getIDFromSelected(operatorSelected)
    const idClient = getIDFromSelected(clientSelected)

    if (!productSelectedCurrent.enabled) {
      toast.error("Lote Agotado, no se puede guardar")
      return
    }

    if (edit) {
      httpUpdate({
        idOperator,
        idClient,
        observationsDevanado,
      })
    } else {
      httpCreate({
        idProduct,
        idOperator,
        idClient,
        kilosNetoDevanado,
        observationsDevanado,
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
          {edit ? "Editar Producto Devanado" : "Nuevo Producto Devanado"}
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
                    defaultValue={waitData?.kilosNetoDevanado || ""}
                    step="0.01"
                    min={0}
                    {...register("kilosNetoDevanado", {
                      required: "Ingrese el peso neto del devanado",
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
                {errors.kilosNetoDevanado && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.kilosNetoDevanado.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label>Observaciones:</label>
                <TextareaForm
                  defaultValue={waitData?.observationsDevanado || ""}
                  {...register("observationsDevanado")}
                />
                {errors.observationsDevanado && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.observationsDevanado.message}
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

DevanadoForm.propTypes = {
  edit: PropTypes.bool,
}

DevanadoForm.defaultProps = {
  edit: false,
}
