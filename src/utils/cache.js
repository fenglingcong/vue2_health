import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export default {
  getToken () {
    return Cookies.get(TokenKey)
  },
  setToken (token) {
    return Cookies.set(TokenKey, token, { expires: 7 })
  },
  removeToken () {
    return Cookies.remove(TokenKey)
  },
  getSession (name) {
    if (!name) return
    return window.sessionStorage.getItem(name)
  },
  setSession (name, content) {
    if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    return window.sessionStorage.setItem(name, content)
  },
  removeSession (name) {
    if (!name) return
    return window.sessionStorage.removeItem(name)
  },
  getLocal (name) {
    if (!name) return
    return window.loaclStorage.getItem(name)
  },
  setLocal (name, content) {
    if (!name) return
    if (typeof content !== 'string') {};
    return window.loaclStorage.setItem(name, content)
  },
  removeLocal (name) {
    if (!name) return
    return window.loaclStorage.removeItem(name)
  }
}
