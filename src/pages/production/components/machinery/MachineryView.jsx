import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { ArrowLeft24Filled, EditRegular } from "@fluentui/react-icons"
import { NavLink, useNavigate, useParams } from "react-router-dom"
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

export default function MachineryView() {
  const [waitData, setWaitData] = useState(null)
  const { token } = useSelector((state) => state.userAuth)
  TextilService.setAuthorization(token)
  TextilService.setEntity(ENTITY_MACHINERY)

  const navigate = useNavigate()

  const params = useParams()

  const httpGetOne = (id) => {
    TextilService.getOne(
      id,
      (response) => {
        const { data } = response
        if (data) {
          if (data?.status) {
            const result = data?.data
            setWaitData({
              idMachinery: result?.id,
              codMachine: result?.cod_machine,
              nameMachinery: result?.name,
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

  const handleBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    if (params) {
      if (params?.id) {
        httpGetOne(params?.id)
      }
    }
  }, [])

  if (!waitData) {
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
        <div className="flex items-center justify-between w-full gap-4 mt-40 px-[10%]">
          <div className="flex flex-col">
            <h1 className="text-4xl font-workSans font-medium">
              Maquinaria - {waitData?.codMachine}
            </h1>
          </div>
          <NavLink to={`/produccion/maquinarias/${waitData?.idMachinery}`}>
            <ButtonPrimary
              style={{
                background: THEME_COLOR_PRODUCTIONS,
                color: THEME_TEXT_PRODUCTIONS,
              }}
            >
              <EditRegular />
              Editar Maquinaria
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
