import { NavLink } from "react-router-dom"
import ThunderIcon from "@/common/icons/ThunderIcon"

const QuickLinksOperator = () => (
  <div className="w-full flex justify-start items-center gap-4 font-workSans py-2 px-8 rounded-3xl">
    <div className="flex justify-center items-center gap-1">
      <ThunderIcon size={20} color="#d5af63" />
    </div>
    <NavLink
      to="./ocupaciones/nuevo"
      className="py-2 px-3 rounded-lg text-[#d5af63] hover:bg-[#d5af63]/20"
    >
      /Nueva_Ocupación
    </NavLink>
    <NavLink
      to="./turnos/nuevo"
      className="py-2 px-3 rounded-lg text-[#d5af63] hover:bg-[#d5af63]/20"
    >
      /Nuevo_Turno
    </NavLink>
  </div>
)

export default QuickLinksOperator
