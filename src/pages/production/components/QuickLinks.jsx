import { NavLink } from "react-router-dom"
import ThunderIcon from "@/common/icons/ThunderIcon"

const QuickLinks = () => (
  <div className="w-full flex justify-start items-center gap-4 font-workSans py-2 px-8 rounded-3xl">
    <div className="flex justify-center items-center gap-1">
      <ThunderIcon size={20} color="#d5af63" />
    </div>
    <NavLink
      to="./produccion/maquinarias/nuevo"
      className="py-2 px-3 rounded-lg text-[#9EC3D3] hover:bg-[#9EC3D3]/20"
    >
      /Nueva_Maquinaria
    </NavLink>
    <NavLink
      to="./produccion/tintorerias/nuevo"
      className="py-2 px-3 rounded-lg text-[#b2d563] hover:bg-[#b2d563]/20"
    >
      /Nueva_Tintoreria
    </NavLink>
    <NavLink
      to="./produccion/devanado/nuevo"
      className="py-2 px-3 rounded-lg text-[#d5af63] hover:bg-[#d5af63]/20"
    >
      /Nuevo_Devanado
    </NavLink>
    <NavLink
      to="./produccion/ovillado/nuevo"
      className="py-2 px-3 rounded-lg text-[#dc626d] hover:bg-[#dc626d]/20"
    >
      /Nuevo_Ovillado
    </NavLink>
  </div>
)

export default QuickLinks
