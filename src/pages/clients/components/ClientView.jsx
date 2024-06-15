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
import { ENTITY_CLIENTS } from "@/config/entities"
import { THEME_COLOR_CLIENTS, THEME_TEXT_CLIENTS } from "@/config/theme-color"

export default function ClientView() {
  const [waitData, setWaitData] = useState(null)
  const { token } = useSelector((state) => state.userAuth)
  TextilService.setAuthorization(token)
  TextilService.setEntity(ENTITY_CLIENTS)

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
              idClient: result?.id,
              codClient: result?.cod_client,
              firstNameClient: result?.first_name,
              lastNameClient: result?.last_name,
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
              Cliente - {waitData?.codClient}
            </h1>
          </div>
          <NavLink to={`/clientes/${waitData?.idClient}`}>
            <ButtonPrimary
              style={{
                background: THEME_COLOR_CLIENTS,
                color: THEME_TEXT_CLIENTS,
              }}
            >
              <EditRegular />
              Editar Cliente
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
