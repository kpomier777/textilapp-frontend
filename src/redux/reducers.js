import { SET_USER_AUTH, REMOVE_USER_AUTH, SET_THEME_FLOW } from "./actions"

export const userAuthDefault = {
  logged: false,
  userId: 0,
  username: "",
  token: "",
}

export const userAuth = (state = userAuthDefault, action = {}) => {
  switch (action?.type) {
    case SET_USER_AUTH:
      return action?.user
    case REMOVE_USER_AUTH:
      return userAuthDefault
    default:
      return state
  }
}

export const themeFlowDefault = {
  color: "#FFFFFF",
}

export const themeFlow = (state = themeFlowDefault, action = {}) => {
  switch (action?.type) {
    case SET_THEME_FLOW:
      return action?.theme
    default:
      return state
  }
}

export default () => {}
