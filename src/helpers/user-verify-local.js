export function verifyUserLocal() {
  return localStorage.getItem("userAuth") !== null
}

export function getUserLocal() {
  return JSON.parse(localStorage.getItem("userAuth"))
}

export function setUserLocal(user) {
  localStorage.setItem("userAuth", JSON.stringify(user))
}

export function removeUserLocal() {
  localStorage.removeItem("userAuth")
}
