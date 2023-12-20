import { createContext, useContext, useState } from 'react'

const MyServicesContext = createContext<any>(null)

export const MyServicesContextProvider = ({ children }: any) => {
  const [selectedTab, setSelectedTab] = useState(0)
  return (
    <MyServicesContext.Provider
      value={{
        selectedTab,
        setSelectedTab,
      }}
    >
      {children}
    </MyServicesContext.Provider>
  )
}

export const useMyServicesContext = () => useContext(MyServicesContext)
