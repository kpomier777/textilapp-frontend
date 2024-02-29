import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setThemeFlow } from "@/redux/actionCreators"
import HeroProductsPreview from "./components/HeroProductsPreview"
import QuickAccess from "./components/QuickAccess"
import { dataTest } from "@/config/dataTest"
import QuickLinks from "./components/QuickLinks"
import { THEME_COLOR_DASHBOARD } from "@/config/theme-color"

const DashboardPage = () => {
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
          <h1 className="font-dmSans font-bold text-3xl">Acceso Rápido</h1>
        </div>
        <QuickLinks />
        <QuickAccess />
        <HeroProductsPreview data={dataTest} />
      </div>
    </>
  )
}

export default DashboardPage
