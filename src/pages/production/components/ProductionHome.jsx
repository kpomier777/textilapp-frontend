import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setThemeFlow } from "@/redux/actionCreators"
import QuickAccess from "./QuickAccess"
import QuickLinks from "./QuickLinks"
import { THEME_COLOR_DASHBOARD } from "@/config/theme-color"

const ProduccionHome = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setThemeFlow({
        color: THEME_COLOR_DASHBOARD,
      })
    )
  }, [])
  return (
    <>
      <div className="flex flex-col p-16 gap-4">
        <div className="w-full flex justify-start">
          <h1 className="font-dmSans font-bold text-3xl">Producción</h1>
        </div>
        <QuickLinks />
        <QuickAccess />
      </div>
    </>
  )
}

export default ProduccionHome
