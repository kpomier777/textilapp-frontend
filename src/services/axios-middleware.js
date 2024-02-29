import axios from "axios"

// Add a response interceptor
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      window.location.href = `/logout`
    }
    return Promise.reject(error)
  }
)

export default axios
