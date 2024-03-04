import React, { createContext, useState } from 'react'
// import { getAccessTokenFromLocalStorage } from 'src/utils/localStorage'

interface AppContextInterface {
  isOpenModal: boolean
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}
const initialAppContext: AppContextInterface = {
  isOpenModal: false,
  setIsOpenModal: () => {},
  isAuthenticated: true,
  setIsAuthenticated: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(initialAppContext.isOpenModal)
  return (
    <AppContext.Provider
      value={{
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
