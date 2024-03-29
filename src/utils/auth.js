import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  return localStorage.getItem('token')

}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  //return Cookies.remove(TokenKey)
  return localStorage.removeItem('token')
}
