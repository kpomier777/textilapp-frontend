import axios from "axios"

const HTTP_SERVICE = import.meta.env.VITE_HTTP_SERVICE // eslint-disable-line

const AuthService = {
  login: (data, success, error) => {
    axios
      .request({
        url: `${HTTP_SERVICE}/auth/login`,
        method: "POST",
        data,
      })
      .then(success)
      .catch(error)
  },
}

export default AuthService
