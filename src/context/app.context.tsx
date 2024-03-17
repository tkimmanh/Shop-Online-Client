import React, { createContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import usersService from 'src/services/users.service'
import { TUser } from 'src/types/auth'
import { getAccessTokenFromLocalStorage } from 'src/utils/localStorage'

interface AppContextInterface {
  isOpenModal: boolean
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  user: TUser | null
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>
}
const initialAppContext: AppContextInterface = {
  user: null,
  setUser: () => {},
  isOpenModal: false,
  setIsOpenModal: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [user, setUser] = useState<TUser | null>(initialAppContext.user)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(initialAppContext.isOpenModal)
  const accessToken = getAccessTokenFromLocalStorage()
  useEffect(() => {
    usersService
      .getCurrentUser()
      .then((response) => {
        setIsAuthenticated(true)
        setUser(response.data.user)
      })
      .catch(() => {
        setIsAuthenticated(false)
        setUser(null)
      })
  }, [accessToken])

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        isOpenModal,
        setIsOpenModal
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
