import axios from "axios"
import { ENTITY_COLORS } from "@/config/entities"

const HTTP_SERVICE = import.meta.env.VITE_HTTP_SERVICE // eslint-disable-line

const ColorService = {
  controller: null,
  headers: {
    Authorization: "",
  },
  setAuthorization: (token) => {
    ColorService.headers.Authorization = `Bearer ${token}`
  },
  getList: (paramsURL, success, error, end) => {
    ColorService.controller = new AbortController()
    axios
      .request({
        url: `${HTTP_SERVICE}/${ENTITY_COLORS}${paramsURL}`,
        method: "GET",
        headers: ColorService.headers,
        signal: ColorService.controller?.signal,
      })
      .then(success)
      .catch(error)
      .finally(end)
  },
  cancelPetition: () => {
    ColorService.controller?.abort()
  },
}

export default ColorService
