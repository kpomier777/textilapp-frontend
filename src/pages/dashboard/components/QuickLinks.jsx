import { NavLink } from "react-router-dom"
import ThunderIcon from "@/common/icons/ThunderIcon"

const QuickLinks = () => (
  <div className="w-full flex justify-start items-center gap-4 font-workSans py-2 px-8 rounded-3xl">
    <div className="flex justify-center items-center gap-1">
      <ThunderIcon size={20} color="#d5af63" />
    </div>
    <NavLink
      to="./clientes/nuevo"
      className="py-2 px-3 rounded-lg text-[#9EC3D3] hover:bg-[#9EC3D3]/20"
    >
      /Nuevo_Cliente
    </NavLink>
    <NavLink
      to="./productos/nuevo"
      className="py-2 px-3 rounded-lg text-[#b2d563] hover:bg-[#b2d563]/20"
    >
      /Nuevo_Producto
    </NavLink>
    <NavLink
      to="./operadores/nuevo"
      className="py-2 px-3 rounded-lg text-[#d5af63] hover:bg-[#d5af63]/20"
    >
      /Nuevo_Operador
    </NavLink>
  </div>
)

export default QuickLinks
