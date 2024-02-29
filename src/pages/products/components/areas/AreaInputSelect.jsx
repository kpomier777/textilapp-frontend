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
import { ENTITY_AREAS } from "@/config/entities"

export default function AreaInputSelect({ register, errors, defaultValue }) {
  const comboId = useId("combo-default")
  const { token } = useSelector((state) => state.userAuth)

  const [list, setList] = useState(null)

  TextilService.setAuthorization(token)

  const httpList = async () => {
    try {
      const response = await TextilService.getListPromise(
        "?notlimit=true",
        ENTITY_AREAS
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
    <div className="flex flex-col h">
      <label>
        Area: <span className="text-rose-700">*</span>
      </label>
      {list ? (
        <>
          {list?.length === 0 ? (
            <div className="my-4">
              Aún no tienes areas registradas{" "}
              <NavLink
                to="/productos/areas/nuevo"
                className="block py-2 px-3 rounded-lg text-[#d5af63] hover:bg-[#d5af63]/20"
              >
                /Crear_Area
              </NavLink>
            </div>
          ) : (
            <ComboBoxFluent
              aria-labelledby={comboId}
              defaultValue={defaultItem}
              defaultSelectedOptions={selectedList}
              listbox={{
                className: "h-40",
              }}
              {...register("areaSelected", {
                required: "Elija un area",
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
      {errors.areaSelected && (
        <p className="text-red-500 text-sm mt-1">
          {errors.areaSelected.message}
        </p>
      )}
    </div>
  )
}

AreaInputSelect.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.shape().isRequired,
  defaultValue: PropTypes.string,
}

AreaInputSelect.defaultProps = {
  defaultValue: null,
}
