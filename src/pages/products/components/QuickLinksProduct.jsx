import { NavLink } from "react-router-dom"
import ThunderIcon from "@/common/icons/ThunderIcon"

const QuickLinksProduct = () => (
  <div className="w-full flex justify-start items-center gap-4 font-workSans py-2 px-8 rounded-3xl">
    <div className="flex justify-center items-center gap-1">
      <ThunderIcon size={20} color="#d5af63" />
    </div>
    <NavLink
      to="./areas/nuevo"
      className="py-2 px-3 rounded-lg text-[#b2d563] hover:bg-[#b2d563]/20"
    >
      /Nueva_Area
    </NavLink>
    <NavLink
      to="./colores/nuevo"
      className="py-2 px-3 rounded-lg text-[#b2d563] hover:bg-[#b2d563]/20"
    >
      /Nuevo_Color
    </NavLink>
    <NavLink
      to="./titulos/nuevo"
      className="py-2 px-3 rounded-lg text-[#b2d563] hover:bg-[#b2d563]/20"
    >
      /Nuevo_Titulo
    </NavLink>
  </div>
)

export default QuickLinksProduct
