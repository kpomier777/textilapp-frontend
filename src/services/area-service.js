import axios from "axios"
import { ENTITY_AREAS } from "@/config/entities"

const HTTP_SERVICE = import.meta.env.VITE_HTTP_SERVICE // eslint-disable-line

const AreaService = {
  controller: null,
  headers: {
    Authorization: "",
  },
  setAuthorization: (token) => {
    AreaService.headers.Authorization = `Bearer ${token}`
  },
  getList: (paramsURL, success, error, end) => {
    AreaService.controller = new AbortController()
    axios
      .request({
        url: `${HTTP_SERVICE}/${ENTITY_AREAS}${paramsURL}`,
        method: "GET",
        headers: AreaService.headers,
        signal: AreaService.controller?.signal,
      })
      .then(success)
      .catch(error)
      .finally(end)
  },
  cancelPetition: () => {
    AreaService.controller?.abort()
  },
}

export default AreaService
