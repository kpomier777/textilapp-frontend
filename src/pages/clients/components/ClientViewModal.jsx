import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import { EditRegular, EyeRegular } from "@fluentui/react-icons"
import { NavLink } from "react-router-dom"
import { toast } from "sonner"
import TextilService from "@/services/textil-service"
import {
  ButtonPrimary,
  InputForm,
} from "@/pages/products/components/styles-tailwind"
import { DotAnimation } from "@/pages/products/components/styles"
import { ENTITY_CLIENTS } from "@/config/entities"
import { THEME_COLOR_CLIENTS, THEME_TEXT_CLIENTS } from "@/config/theme-color"

export default function ClientViewModal({ id }) {
  const [waitData, setWaitData] = useState(null)
  const { token } = useSelector((state) => state.userAuth)
  TextilService.setAuthorization(token)

  const httpGetOne = async () => {
    try {
      const clientResponse = await TextilService.getOnePromise(
        id,
        ENTITY_CLIENTS
      )
      const clientData = clientResponse.data
      if (clientData?.status) {
        const result = clientData?.data
        setWaitData({
          idClient: result?.id,
          codClient: result?.cod_client,
          firstNameClient: result?.first_name,
          lastNameClient: result?.last_name,
        })
      } else {
        throw new Error(clientData.message)
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
              Cliente - {waitData?.codClient}
            </h1>
          </div>
          <NavLink to={`/clientes/view/${waitData?.idClient}`}>
            <ButtonPrimary
              style={{
                background: THEME_COLOR_CLIENTS,
                color: THEME_TEXT_CLIENTS,
              }}
            >
              <EyeRegular />
              Ver
            </ButtonPrimary>
          </NavLink>
          <NavLink to={`/clientes/${waitData?.idClient}`}>
            <ButtonPrimary
              style={{
                background: THEME_COLOR_CLIENTS,
                color: THEME_TEXT_CLIENTS,
              }}
            >
              <EditRegular />
              Editar
            </ButtonPrimary>
          </NavLink>
        </div>
        <div className="flex flex-col gap-4 w-full px-[10%]">
          <div className="flex flex-col">
            <label>
              Código Cliente: <span className="text-rose-700">*</span>
            </label>
            <InputForm
              defaultValue={waitData?.codClient || ""}
              className="pointer-events-none opacity-80"
            />
          </div>
          <div className="flex flex-col">
            <label>
              Nombres: <span className="text-rose-700">*</span>
            </label>
            <InputForm
              defaultValue={waitData?.firstNameClient || ""}
              className="pointer-events-none opacity-80"
            />
          </div>
          <div className="flex flex-col">
            <label>
              Apellidos: <span className="text-rose-700">*</span>
            </label>
            <InputForm
              defaultValue={waitData?.lastNameClient || ""}
              className="pointer-events-none opacity-80"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

ClientViewModal.propTypes = {
  id: PropTypes.string.isRequired,
}
