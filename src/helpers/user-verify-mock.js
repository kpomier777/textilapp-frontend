export default function verifyUserMock(username, password) {
  if (username === "qwe@qwe.com" && password === "#qwe") {
    return true
  }
  if (username === "abc@abc.com" && password === "a&b!_") {
    return true
  }
  if (username === "zxc@zxc.com" && password === "1abc") {
    return true
  }
  return false
}
