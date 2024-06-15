import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import { EditRegular, EyeRegular } from "@fluentui/react-icons"
import { NavLink } from "react-router-dom"
import TextilService from "@/services/textil-service"
import {
  ButtonPrimary,
  InputForm,
} from "@/pages/products/components/styles-tailwind"
import { DotAnimation } from "@/pages/products/components/styles"
import { ENTITY_OPERATORS } from "@/config/entities"
import {
  THEME_COLOR_OPERATORS,
  THEME_TEXT_OPERATORS,
} from "@/config/theme-color"

export default function OperatorViewModal({ id }) {
  const [waitData, setWaitData] = useState(null)
  const { token } = useSelector((state) => state.userAuth)
  TextilService.setAuthorization(token)

  const httpGetOne = async () => {
    try {
      const response = await TextilService.getOnePromise(id, ENTITY_OPERATORS)
      const { data, message } = response.data
      if (data) {
        setWaitData({
          idOperator: data?.id,
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

  useEffect(() => {
    if (id) {
      httpGetOne()
    }
  }, [])

  if (!waitData) {
    return (
      <div className="relative">
        <div className="relative flex flex-col items-center w-full pb-14 gap-6">
          <div className="text-4xl font-workSans font-medium">
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
      <div className="relative flex flex-col items-center w-full p-14 gap-6">
        <div className="flex items-center justify-between w-full gap-4 px-[10%]">
          <div className="flex flex-col">
            <h1 className="text-4xl font-workSans font-medium">
              Operador - {waitData?.codOperator}
            </h1>
          </div>
          <NavLink to={`/operadores/view/${waitData?.idOperator}`}>
            <ButtonPrimary
              style={{
                background: THEME_COLOR_OPERATORS,
                color: THEME_TEXT_OPERATORS,
              }}
            >
              <EyeRegular />
              Ver
            </ButtonPrimary>
          </NavLink>
          <NavLink to={`/operadores/${waitData?.idOperator}`}>
            <ButtonPrimary
              style={{
                background: THEME_COLOR_OPERATORS,
                color: THEME_TEXT_OPERATORS,
              }}
            >
              <EditRegular />
              Editar
            </ButtonPrimary>
          </NavLink>
        </div>
        <div className="flex flex-col gap-4 w-full px-[10%]">
          <div className="flex flex-col">
            <label>Código Operador:</label>
            <InputForm
              defaultValue={waitData?.codOperator || ""}
              className="pointer-events-none opacity-80"
            />
          </div>
          <div className="flex flex-col">
            <label>Nombres:</label>
            <InputForm
              defaultValue={waitData?.firstNameOperator || ""}
              className="pointer-events-none opacity-80"
            />
          </div>
          <div className="flex flex-col">
            <label>Apellidos:</label>
            <InputForm
              defaultValue={waitData?.lastNameOperator || ""}
              className="pointer-events-none opacity-80"
            />
          </div>
          <div className="flex flex-col">
            <label>Celular:</label>
            <div className="flex justify-center items-center gap-2">
              <div className="font-bold">(+591)</div>
              <InputForm
                defaultValue={waitData?.cellphoneOperator || ""}
                className="pointer-events-none opacity-80"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label>Ocupación:</label>
            <InputForm
              defaultValue={waitData?.idOccupationOperator || ""}
              className="pointer-events-none opacity-80"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

OperatorViewModal.propTypes = {
  id: PropTypes.string.isRequired,
}
