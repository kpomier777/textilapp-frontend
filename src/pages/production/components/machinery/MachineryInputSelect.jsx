import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { Option, useId } from "@fluentui/react-components"
import {
  InputForm,
  ComboBoxFluent,
} from "@/pages/products/components/styles-tailwind"
import TextilService from "@/services/textil-service"
import { ENTITY_MACHINERY } from "@/config/entities"

export default function MachineryInputSelect({
  register,
  errors,
  defaultValue,
}) {
  const comboId = useId("combo-default")
  const { token } = useSelector((state) => state.userAuth)

  const [list, setList] = useState(null)

  TextilService.setAuthorization(token)

  const httpList = async () => {
    try {
      const response = await TextilService.getListPromise(
        "?notlimit=true",
        ENTITY_MACHINERY
      )
      const { data, message } = response.data
      if (data) {
        setList(data)
      } else {
        throw new Error(message)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (!list) {
      httpList()
      window.addEventListener("reset", () => {
        setList(null)
        httpList()
      })
    }
  }, [])

  const selectedList = defaultValue ? [defaultValue] : []
  const defaultItem = defaultValue || ""

  return (
    <div className="flex flex-col">
      <label>
        Maquinaria: <span className="text-rose-700">*</span>
      </label>
      {list ? (
        <>
          {list?.length === 0 ? (
            <div className="my-4">
              Aún no tienes maquinarias registradas{" "}
              <NavLink
                to="/produccion/maquinarias/nuevo"
                className="block py-2 px-3 rounded-lg text-[#d5af63] hover:bg-[#d5af63]/20"
              >
                /Crear_Maquinaria
              </NavLink>
            </div>
          ) : (
            <ComboBoxFluent
              aria-labelledby={comboId}
              defaultValue={defaultItem}
              defaultSelectedOptions={selectedList}
              listbox={{
                className: "h-36",
              }}
              {...register("machinerySelected", {
                required: "Elija una maquinaria",
              })}
              placeholder="Elija una opción"
            >
              {list.map((item) => (
                <Option
                  key={item.id}
                  text={`${item.id} - ${item.name}`}
                  value={`${item.id} - ${item.name}`}
                >
                  {item.id} - {item.name}
                </Option>
              ))}
            </ComboBoxFluent>
          )}
        </>
      ) : (
        <div className="bg-neutral-600 rounded-lg p-2">
          <InputForm
            className="h-[30px] pl-3 text-sm pointer-events-none"
            defaultValue="Cargando..."
          />
        </div>
      )}
      {errors.machinerySelected && (
        <p className="text-red-500 text-sm mt-1">
          {errors.machinerySelected.message}
        </p>
      )}
    </div>
  )
}

MachineryInputSelect.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.shape().isRequired,
  defaultValue: PropTypes.string,
}

MachineryInputSelect.defaultProps = {
  defaultValue: null,
}
