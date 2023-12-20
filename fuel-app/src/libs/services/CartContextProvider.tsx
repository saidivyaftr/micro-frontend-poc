import { createContext, useContext, useState } from 'react'
import { SESSION_STORAGE } from 'src/constants'

const CartDataContext = createContext<any>(null)

export const CartContextProvider = ({ children }: any) => {
  const [cartDataFromSession, setCartDataFromSession] = useState()
  const initialCartData = JSON.parse(
    sessionStorage.getItem(SESSION_STORAGE.CART_DATA) || '{}',
  )
  const [contextCartData, setContextCartData] = useState(initialCartData)
  return (
    <CartDataContext.Provider
      value={{
        cartDataFromSession,
        setCartDataFromSession,
        contextCartData,
        setContextCartData,
      }}
    >
      {children}
    </CartDataContext.Provider>
  )
}

export const useCartDataContext = () => useContext(CartDataContext)
