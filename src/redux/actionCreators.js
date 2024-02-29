import { SET_USER_AUTH, REMOVE_USER_AUTH, SET_THEME_FLOW } from "./actions"

export const setUserAuth = (user) => ({
  type: SET_USER_AUTH,
  user,
})

export const removeUserAuth = () => ({
  type: REMOVE_USER_AUTH,
})

export const setThemeFlow = (theme) => ({
  type: SET_THEME_FLOW,
  theme,
})

export default () => {}
