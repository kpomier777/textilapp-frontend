import axiosMiddleware from "./axios-middleware"

const HTTP_SERVICE = import.meta.env.VITE_HTTP_SERVICE // eslint-disable-line

const TextilService = {
  entity: "",
  controller: null,
  headers: {
    Authorization: "",
  },
  setAuthorization: (token) => {
    TextilService.headers.Authorization = `Bearer ${token}`
  },
  setEntity: (entity) => {
    TextilService.entity = entity
  },
  getList: (paramsURL, success, error, end) => {
    TextilService.controller = new AbortController()
    axiosMiddleware
      .request({
        url: `${HTTP_SERVICE}/${TextilService.entity}${paramsURL}`,
        method: "GET",
        headers: TextilService.headers,
        signal: TextilService.controller?.signal,
      })
      .then(success)
      .catch(error)
      .finally(end)
  },
  getML: (success, error, end) => {
    TextilService.controller = new AbortController()
    axiosMiddleware
      .request({
        url: `${HTTP_SERVICE}/${TextilService.entity}`,
        method: "GET",
        headers: TextilService.headers,
        signal: TextilService.controller?.signal,
      })
      .then(success)
      .catch(error)
      .finally(end)
  },
  getOne: (id, success, error, end) => {
    TextilService.controller = new AbortController()
    axiosMiddleware
      .request({
        url: `${HTTP_SERVICE}/${TextilService.entity}/${id}`,
        method: "GET",
        headers: TextilService.headers,
        signal: TextilService.controller?.signal,
      })
      .then(success)
      .catch(error)
      .finally(end)
  },
  create: (data, success, error, end) => {
    TextilService.controller = new AbortController()
    axiosMiddleware
      .request({
        url: `${HTTP_SERVICE}/${TextilService.entity}`,
        method: "POST",
        data,
        headers: TextilService.headers,
        signal: TextilService.controller?.signal,
      })
      .then(success)
      .catch(error)
      .finally(end)
  },
  update: (data, success, error, end) => {
    TextilService.controller = new AbortController()
    axiosMiddleware
      .request({
        url: `${HTTP_SERVICE}/${TextilService.entity}`,
        method: "PUT",
        data,
        headers: TextilService.headers,
        signal: TextilService.controller?.signal,
      })
      .then(success)
      .catch(error)
      .finally(end)
  },
  getListPromise: (paramsURL, entity) => {
    TextilService.controller = new AbortController()
    return axiosMiddleware.request({
      url: `${HTTP_SERVICE}/${entity}${paramsURL}`,
      method: "GET",
      headers: TextilService.headers,
      signal: TextilService.controller?.signal,
    })
  },
  getOnePromise: (id, entity) => {
    TextilService.controller = new AbortController()
    return axiosMiddleware.request({
      url: `${HTTP_SERVICE}/${entity}/${id}`,
      method: "GET",
      headers: TextilService.headers,
      signal: TextilService.controller?.signal,
    })
  },
  createPromise: (data, entity) => {
    TextilService.controller = new AbortController()
    return axiosMiddleware.request({
      url: `${HTTP_SERVICE}/${entity}`,
      method: "POST",
      data,
      headers: TextilService.headers,
      signal: TextilService.controller?.signal,
    })
  },
  updatePromise: (data, entity) => {
    TextilService.controller = new AbortController()
    return axiosMiddleware.request({
      url: `${HTTP_SERVICE}/${entity}`,
      method: "PUT",
      data,
      headers: TextilService.headers,
      signal: TextilService.controller?.signal,
    })
  },
  getParamsURL: (params) => {
    const paramsQuery = []
    params.forEach((paramItem) => {
      paramsQuery.push(`${paramItem.key}=${paramItem.value}`)
    })
    if (paramsQuery.length !== 0) {
      return `?${paramsQuery.join("&")}`
    }
    return ""
  },
  cancelPetition: () => {
    TextilService.controller?.abort()
  },
}

export default TextilService
