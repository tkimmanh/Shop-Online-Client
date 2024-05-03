import React, { createContext, useEffect, useState } from 'react'
import usersService from 'src/services/users.service'
import { TUser } from 'src/types/auth'

interface AppContextInterface {
  isOpenModal: boolean
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  user: TUser | null
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>
  cartChanged: boolean
  setCartChanged: React.Dispatch<React.SetStateAction<boolean>>
}
const initialAppContext: AppContextInterface = {
  user: null,
  setUser: () => {},
  isOpenModal: false,
  setIsOpenModal: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => null,
  cartChanged: false,
  setCartChanged: () => {}
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [user, setUser] = useState<TUser | null>(initialAppContext.user)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(initialAppContext.isOpenModal)
  const [cartChanged, setCartChanged] = useState<boolean>(initialAppContext.cartChanged)
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
  }, [cartChanged])

  return (
    <AppContext.Provider
      value={{
        cartChanged,
        setCartChanged,
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
