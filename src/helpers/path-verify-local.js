export function verifyPathLocal() {
  return localStorage.getItem("userPath") !== null
}

export function getPathLocal() {
  return localStorage.getItem("userPath")
}

export function setPathLocal(path) {
  localStorage.setItem("userPath", path)
}

export function removePathLocal() {
  localStorage.removeItem("userPath")
}
