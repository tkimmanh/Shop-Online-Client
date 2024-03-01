const IS_AUTHENTICATED = 'isAuthenticated'
const ACCESS_TOKEN = 'accessToken'
const USER_INFOR = 'userInFor'

export const setAccessTokenToLocalStorage = (accessToken: string) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken)
}
export const setIsAuthenticated = (isAuthenticated: boolean) => {
  localStorage.setItem(IS_AUTHENTICATED, JSON.stringify(isAuthenticated))
}
export const clearLocalStorage = () => {
  localStorage.removeItem(ACCESS_TOKEN)
  localStorage.removeItem(USER_INFOR)
  localStorage.removeItem(IS_AUTHENTICATED)
}
export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem(ACCESS_TOKEN) || ''
}

export const getUserInforFromLocalStorage = () => {
  const result = localStorage.getItem(USER_INFOR)
  return result ? JSON.parse(result) : []
}
export const getIsAuthenticationFromLocalStorage = () => {
  const result = localStorage.getItem(IS_AUTHENTICATED)
  return result ? JSON.parse(result) : false
}
export const setUserInforToLocalStorage = (userInfor: any) => {
  localStorage.setItem(USER_INFOR, JSON.stringify(userInfor))
}
