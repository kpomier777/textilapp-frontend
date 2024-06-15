import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import ThunderIcon from "@/common/icons/ThunderIcon"
import { ROLES_ENABLED } from "@/config/access"

const QuickLinks = () => {
  const userAuth = useSelector((state) => state.userAuth)
  return (
    <div className="w-full flex items-stretch flex-wrap gap-4 font-workSans py-2 px-8 rounded-3xl">
      <div className="flex justify-center items-center gap-1">
        <ThunderIcon size={20} color="#d5af63" />
      </div>
      {(userAuth.userRol === ROLES_ENABLED.ADMIN ||
        userAuth.userRol === ROLES_ENABLED.SUPERVISOR) && (
        <>
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
        </>
      )}

      {userAuth.userRol === ROLES_ENABLED.OPERATOR && (
        <>
          <NavLink
            to="./clientes/nuevo"
            className="py-2 px-3 rounded-lg text-[#9EC3D3] hover:bg-[#9EC3D3]/20"
          >
            /Nuevo_Cliente
          </NavLink>
          <NavLink
            to="./produccion/maquinarias/nuevo"
            className="py-2 px-3 rounded-lg text-[#dc626d] hover:bg-[#dc626d]/20"
          >
            /Nueva_Maquinaria
          </NavLink>
          <NavLink
            to="./produccion/tintoreria/nuevo"
            className="py-2 px-3 rounded-lg text-[#dc626d] hover:bg-[#dc626d]/20"
          >
            /Nueva_Tintoreria
          </NavLink>
          <NavLink
            to="./produccion/devanado/nuevo"
            className="py-2 px-3 rounded-lg text-[#dc626d] hover:bg-[#dc626d]/20"
          >
            /Nuevo_Devanado
          </NavLink>
          <NavLink
            to="./produccion/ovillado/nuevo"
            className="py-2 px-3 rounded-lg text-[#dc626d] hover:bg-[#dc626d]/20"
          >
            /Nuevo_Ovillado
          </NavLink>
        </>
      )}

      {userAuth.userRol === ROLES_ENABLED.RRHH && (
        <>
          <NavLink
            to="./operadores/nuevo"
            className="py-2 px-3 rounded-lg text-[#d5af63] hover:bg-[#d5af63]/20"
          >
            /Nuevo_Operador
          </NavLink>
        </>
      )}
    </div>
  )
}

export default QuickLinks
