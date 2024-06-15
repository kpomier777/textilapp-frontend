import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import { Box24Regular, EditRegular, EyeRegular } from "@fluentui/react-icons"
import { NavLink } from "react-router-dom"
import { toast } from "sonner"
import TextilService from "@/services/textil-service"
import { ButtonPrimary, InputForm, TextareaForm } from "./styles-tailwind"
import { DotAnimation } from "./styles"
import { ENTITY_PRODUCTS } from "@/config/entities"
import { THEME_COLOR_PRODUCTS, THEME_TEXT_PRODUCTS } from "@/config/theme-color"

export default function ProductViewModal({ id }) {
  const [waitData, setWaitData] = useState(null)
  const { token } = useSelector((state) => state.userAuth)
  TextilService.setAuthorization(token)

  const httpGetOne = async () => {
    try {
      const productResponse = await TextilService.getOnePromise(
        id,
        ENTITY_PRODUCTS
      )
      const productData = productResponse.data
      if (productData?.status) {
        const result = productData?.data
        setWaitData({
          idProduct: result?.id,
          loteProduct: result?.lote,
          nameProduct: result?.name,
          kilosNetoProduct: result?.kilos_neto,
          kilosUsedProduct: result?.kilos_used,
          observationsProduct: result?.observations,
          colorSelected: `${result?.colorId} - ${result?.colorName}`,
          titleSelected: `${result?.titleId} - ${result?.titleCod} ${result?.titleName}`,
        })
      } else {
        throw new Error(productData.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (id) {
      httpGetOne()
    }
  }, [])

  if (!waitData) {
    return (
      <div className="relative">
        <div className="relative flex flex-col items-center w-full p-14 gap-6">
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
      <div className="relative flex flex-col w-full p-14 gap-6">
        <div className="flex items-center justify-between w-full gap-4 px-[10%]">
          <div className="flex flex-col">
            <h1 className="text-4xl font-workSans font-medium">
              Producto - {waitData?.loteProduct}
            </h1>
            <h3 className="text-2xl font-workSans font-medium">
              {waitData?.nameProduct}
            </h3>
          </div>
          <NavLink to={`/productos/view/${waitData?.idProduct}`}>
            <ButtonPrimary
              style={{
                background: THEME_COLOR_PRODUCTS,
                color: THEME_TEXT_PRODUCTS,
              }}
            >
              <EyeRegular />
              Ver
            </ButtonPrimary>
          </NavLink>
          <NavLink to={`/productos/${waitData?.idProduct}`}>
            <ButtonPrimary
              style={{
                background: THEME_COLOR_PRODUCTS,
                color: THEME_TEXT_PRODUCTS,
              }}
            >
              <EditRegular />
              Editar
            </ButtonPrimary>
          </NavLink>
        </div>
        <div className="flex flex-col gap-4 pb-56 w-full px-[10%]">
          <div className="flex flex-col gap-4 border border-dashed border-tx-green-700 px-5 py-4 rounded-lg">
            <h3
              className="text-xl pb-4"
              style={{ color: THEME_COLOR_PRODUCTS }}
            >
              Identificador
            </h3>
            <div className="flex flex-col">
              <label>Lote:</label>
              <InputForm
                defaultValue={waitData?.loteProduct || ""}
                className="pointer-events-none opacity-80"
              />
            </div>
            <div className="flex flex-col">
              <label>Nombre del producto:</label>
              <InputForm
                defaultValue={waitData?.nameProduct || ""}
                className="pointer-events-none opacity-80"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 border border-dashed border-tx-green-700 px-5 py-4 rounded-lg">
            <h3
              className="text-xl pb-4"
              style={{ color: THEME_COLOR_PRODUCTS }}
            >
              Caracteristicas
            </h3>
            <div className="flex flex-col">
              <label>Color:</label>
              <InputForm
                defaultValue={waitData?.colorSelected || ""}
                className="pointer-events-none opacity-80"
              />
            </div>
            <div className="flex flex-col">
              <label>Titulo:</label>
              <InputForm
                defaultValue={waitData?.titleSelected || ""}
                className="pointer-events-none opacity-80"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 border border-dashed border-tx-green-700 px-5 py-4 rounded-lg">
            <h3
              className="text-xl pb-4"
              style={{ color: THEME_COLOR_PRODUCTS }}
            >
              Peso del Lote
            </h3>
            <div className="flex flex-col">
              <label>Peso Neto:</label>
              <div className="flex gap-2">
                <InputForm
                  defaultValue={waitData?.kilosNetoProduct || ""}
                  className="pointer-events-none opacity-80"
                />
                <div className="flex justify-center items-center gap-2 py-2 px-3 rounded-lg text-[#b2d563] bg-[#b2d563]/20 select-none">
                  <Box24Regular />
                  <span>Kg</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label>Peso Usado:</label>
              <div className="flex gap-2">
                <InputForm
                  defaultValue={waitData?.kilosUsedProduct || ""}
                  className="pointer-events-none opacity-80"
                />
                <div className="flex justify-center items-center gap-2 py-2 px-3 rounded-lg text-[#b2d563] bg-[#b2d563]/20 select-none">
                  <Box24Regular />
                  <span>Kg</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label>Observaciones:</label>
              <TextareaForm
                defaultValue={waitData?.observationsProduct || ""}
                className="pointer-events-none opacity-80"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ProductViewModal.propTypes = {
  id: PropTypes.string.isRequired,
}
