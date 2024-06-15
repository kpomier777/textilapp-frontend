export const ROLES_ENABLED = {
  ADMIN: "ADMIN",
  SUPERVISOR: "SUPERVISOR",
  OPERATOR: "OPERATOR",
  RRHH: "RRHH",
  NONE: "NONE",
}

export const ACCESS_CONFIG = {
  ADMIN: [
    "/",
    "/clientes",
    "/clientes/nuevo",
    "/clientes/:id",
    "/clientes/view/:id",
    "/produccion",
    "/produccion/maquinarias",
    "/produccion/maquinarias/nuevo",
    "/produccion/maquinarias/:id",
    "/produccion/maquinarias/view/:id",
    "/produccion/tintoreria",
    "/produccion/tintoreria/nuevo",
    "/produccion/tintoreria/:id",
    "/produccion/devanado",
    "/produccion/devanado/nuevo",
    "/produccion/devanado/:id",
    "/produccion/ovillado",
    "/produccion/ovillado/nuevo",
    "/produccion/ovillado/:id",
    "/productos",
    "/productos/nuevo",
    "/productos/:id",
    "/productos/view/:id",
    "/productos/colores",
    "/productos/colores/nuevo",
    "/productos/colores/:id",
    "/productos/titulos",
    "/productos/titulos/nuevo",
    "/productos/titulos/:id",
    "/operadores",
    "/operadores/nuevo",
    "/operadores/:id",
    "/operadores/view/:id",
    "/operadores/ocupaciones",
    "/operadores/ocupaciones/nuevo",
    "/operadores/ocupaciones/:id",
    "/operadores/turnos",
    "/operadores/turnos/nuevo",
    "/operadores/turnos/:id",
    "/configuracion",
    "/configuracion/nuevo",
    "/configuracion/:id",
    "/logout",
    "/historial",
  ],
  SUPERVISOR: [
    "/",
    "/clientes",
    "/clientes/nuevo",
    "/clientes/:id",
    "/clientes/view/:id",
    "/produccion",
    "/produccion/maquinarias",
    "/produccion/maquinarias/nuevo",
    "/produccion/maquinarias/:id",
    "/produccion/maquinarias/view/:id",
    "/produccion/tintoreria",
    "/produccion/tintoreria/nuevo",
    "/produccion/tintoreria/:id",
    "/produccion/devanado",
    "/produccion/devanado/nuevo",
    "/produccion/devanado/:id",
    "/produccion/ovillado",
    "/produccion/ovillado/nuevo",
    "/produccion/ovillado/:id",
    "/productos",
    "/productos/nuevo",
    "/productos/:id",
    "/productos/view/:id",
    "/productos/colores",
    "/productos/colores/nuevo",
    "/productos/colores/:id",
    "/productos/titulos",
    "/productos/titulos/nuevo",
    "/productos/titulos/:id",
    "/operadores",
    "/operadores/nuevo",
    "/operadores/:id",
    "/operadores/view/:id",
    "/operadores/ocupaciones",
    "/operadores/ocupaciones/nuevo",
    "/operadores/ocupaciones/:id",
    "/operadores/turnos",
    "/operadores/turnos/nuevo",
    "/operadores/turnos/:id",
    "/configuracion",
    "/logout",
    "/historial",
  ],
  OPERATOR: [
    "/",
    "/clientes",
    "/clientes/nuevo",
    "/clientes/:id",
    "/clientes/view/:id",
    "/produccion",
    "/produccion/maquinarias",
    "/produccion/maquinarias/nuevo",
    "/produccion/maquinarias/:id",
    "/produccion/maquinarias/view/:id",
    "/produccion/tintoreria",
    "/produccion/tintoreria/nuevo",
    "/produccion/tintoreria/:id",
    "/produccion/devanado",
    "/produccion/devanado/nuevo",
    "/produccion/devanado/:id",
    "/produccion/ovillado",
    "/produccion/ovillado/nuevo",
    "/produccion/ovillado/:id",
    "/productos",
    "/logout",
    "/historial",
  ],
  RRHH: [
    "/",
    "/operadores",
    "/operadores/nuevo",
    "/operadores/:id",
    "/operadores/view/:id",
    "/operadores/ocupaciones",
    "/operadores/ocupaciones/nuevo",
    "/operadores/ocupaciones/:id",
    "/operadores/turnos",
    "/operadores/turnos/nuevo",
    "/operadores/turnos/:id",
    "/logout",
    "/historial",
  ],
  NONE: ["/", "/logout", "/historial"],
}

export default {}