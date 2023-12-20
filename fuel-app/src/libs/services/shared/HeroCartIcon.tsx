import { makeStyles } from '@material-ui/core/styles'
import CartWithDot from '@/shared-ui/react-icons/cartWithDot'
import CartWithoutDot from '@/shared-ui/react-icons/cartWithoutDot'
import { useCartDataContext } from 'src/libs/services/CartContextProvider'
import { useEffect, useState } from 'react'
import IntermediateCart from './IntermediateCart'
import EmptyCartModal from './EmptyCartModal'

export type ModalType = 'EMPTY_CART' | 'INTERMEDIATE_CART' | 'NO_MODAL'

const HeroCartIcon = () => {
  const classes = useStyles()
  const { contextCartData } = useCartDataContext()
  const [isEmptyCart, setIsEmptyCart] = useState<boolean>()

  const [modalType, setModalType] = useState<ModalType>('NO_MODAL')
  const handleCartIconClick = () => {
    if (!isEmptyCart) {
      setModalType('INTERMEDIATE_CART')
    } else {
      setModalType('EMPTY_CART')
    }
  }

  const handleCloseModal = () => {
    setModalType('NO_MODAL')
  }

  useEffect(() => {
    contextCartData?.newItemsInCart?.length
      ? setIsEmptyCart(false)
      : setIsEmptyCart(true)
  }, [contextCartData])

  return (
    <>
      <a className={classes.cartIcon} onClick={handleCartIconClick}>
        {!isEmptyCart ? <CartWithDot /> : <CartWithoutDot />}
      </a>

      {modalType === 'INTERMEDIATE_CART' && (
        <IntermediateCart
          showIntermediateCart={modalType === 'INTERMEDIATE_CART'}
          handleCloseModal={handleCloseModal}
          setModalType={setModalType}
        />
      )}

      <EmptyCartModal
        showEmptyCart={modalType === 'EMPTY_CART'}
        handleCloseModal={handleCloseModal}
      />
    </>
  )
}

const useStyles = makeStyles(() => ({
  cartIcon: {
    padding: 0,
    cursor: 'pointer',
  },
}))

export default HeroCartIcon
