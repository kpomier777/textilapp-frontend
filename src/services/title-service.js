import axios from "axios"
import { ENTITY_TITLES } from "@/config/entities"

const HTTP_SERVICE = import.meta.env.VITE_HTTP_SERVICE // eslint-disable-line

const TitleService = {
  controller: null,
  headers: {
    Authorization: "",
  },
  setAuthorization: (token) => {
    TitleService.headers.Authorization = `Bearer ${token}`
  },
  getList: (paramsURL, success, error, end) => {
    TitleService.controller = new AbortController()
    axios
      .request({
        url: `${HTTP_SERVICE}/${ENTITY_TITLES}${paramsURL}`,
        method: "GET",
        headers: TitleService.headers,
        signal: TitleService.controller?.signal,
      })
      .then(success)
      .catch(error)
      .finally(end)
  },
  cancelPetition: () => {
    TitleService.controller?.abort()
  },
}

export default TitleService
