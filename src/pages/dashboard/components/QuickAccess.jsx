import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import MenuList from "@/config/menu-list"
import { UserEnabledToView } from "@/components/Navbar/NavbarMenu"

const QuickAccess = () => {
  const userAuth = useSelector((state) => state.userAuth)
  return (
    <div className="w-full flex flex-col justify-center py-4 px-8">
      <div className="flex items-stretch flex-wrap gap-2 justify-center md:justify-start">
        {MenuList.map((option, index) => (
          <UserEnabledToView
            key={`option${index}${option.path}`}
            access={option.access}
            rol={userAuth.userRol}
          >
            <NavLink
              to={option.path}
              className="group w-32 h-auto flex justify-center items-stretch"
            >
              <div className="flex flex-col items-center">
                <div className="bg-black/30 w-24 h-24 rounded group-hover:border-2 group-hover:border-solid group-hover:border-white overflow-hidden flex justify-center items-center">
                  <div className="flex justify-center align-center group-hover:scale-110 transition ease-linear duration-300">
                    <option.icon
                      style={{ width: 40, height: 40 }}
                      color={option.color}
                    />
                  </div>
                </div>
                <p className="font-workSans font-medium group-hover:text-ww-normal text-ww-lighter text-center text-lg mt-2 leading-6">
                  {option.label}
                </p>
              </div>
            </NavLink>
          </UserEnabledToView>
        ))}
      </div>
    </div>
  )
}
export default QuickAccess
