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
import { ENTITY_MACHINERY } from "@/config/entities"
import {
  THEME_COLOR_PRODUCTIONS,
  THEME_TEXT_PRODUCTIONS,
} from "@/config/theme-color"

export default function MachineryViewModal({ id }) {
  const [waitData, setWaitData] = useState(null)
  const { token } = useSelector((state) => state.userAuth)
  TextilService.setAuthorization(token)

  const httpGetOne = async () => {
    try {
      const MachineryResponse = await TextilService.getOnePromise(
        id,
        ENTITY_MACHINERY
      )
      const machineryData = MachineryResponse.data
      if (machineryData?.status) {
        const result = machineryData?.data
        setWaitData({
          idMachinery: result?.id,
          codMachine: result?.cod_machine,
          nameMachinery: result?.name,
        })
      } else {
        throw new Error(machineryData.message)
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
              Maquinaria - {waitData?.codMachine}
            </h1>
          </div>
          <NavLink to={`/produccion/maquinarias/view/${waitData?.idMachinery}`}>
            <ButtonPrimary
              style={{
                background: THEME_COLOR_PRODUCTIONS,
                color: THEME_TEXT_PRODUCTIONS,
              }}
            >
              <EyeRegular />
              Ver
            </ButtonPrimary>
          </NavLink>
          <NavLink to={`/produccion/maquinarias/${waitData?.idMachinery}`}>
            <ButtonPrimary
              style={{
                background: THEME_COLOR_PRODUCTIONS,
                color: THEME_TEXT_PRODUCTIONS,
              }}
            >
              <EditRegular />
              Editar
            </ButtonPrimary>
          </NavLink>
        </div>
        <div className="flex flex-col gap-4 w-full px-[10%]">
          <div className="flex flex-col">
            <label>Código Maquinaria:</label>
            <InputForm
              defaultValue={waitData?.codMachine || ""}
              className="pointer-events-none opacity-80"
            />
          </div>
          <div className="flex flex-col">
            <label>Nombre de la Maquinaria:</label>
            <InputForm
              defaultValue={waitData?.nameMachinery || ""}
              className="pointer-events-none opacity-80"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

MachineryViewModal.propTypes = {
  id: PropTypes.string.isRequired,
}
