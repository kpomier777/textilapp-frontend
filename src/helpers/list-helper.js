export const getIDFromSelected = (param) => {
  const paramRemoveSpaces = param.replace(" ", "")
  const paramRemoveLine = paramRemoveSpaces.split("-")
  const paramNumber = +paramRemoveLine[0] || 0
  return paramNumber
}

export default {}
