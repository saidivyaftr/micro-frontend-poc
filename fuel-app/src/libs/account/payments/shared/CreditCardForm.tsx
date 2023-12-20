import { useState } from 'react'
import NextImage from 'next/image'
import { IconButton, Modal } from '@material-ui/core'
import css from '../payments.module.scss'
import { CloseOutlined } from '@material-ui/icons'
import Image from 'next/image'
import PaymentIframe from './PaymentIframe'

const CreditCardForm = () => {
  const [acceptedCardsModal, setAcceptedCardsModal] = useState<boolean>(false)

  const handleAcceptedCards = (value: boolean): void => {
    setAcceptedCardsModal(value)
  }

  return (
    <>
      <p className={css.linkText} onClick={() => handleAcceptedCards(true)}>
        Which cards are accepted?
      </p>
      <Modal
        onClose={() => handleAcceptedCards(false)}
        open={acceptedCardsModal}
        className={css.acceptedCardsModal}
      >
        <div className={css.acceptedCardsModalContent}>
          <IconButton
            onClick={() => handleAcceptedCards(false)}
            className={css.acceptedCardsModalClose}
          >
            <CloseOutlined />
          </IconButton>
          <NextImage
            src="https://frontier.com/img/accepted-cards.png"
            height={300}
            width={500}
            alt="accepted cards"
          />
        </div>
      </Modal>
      <section className={css.creditCardid}>
        <div>
          <PaymentIframe type="Card" />
        </div>
        <div>
          <Image
            src="https://frontier.com/~/media/my-account/fiserve/signup-for-auto-pay/cardIcons"
            alt="credit card Id"
            height={400}
            width={500}
          />
        </div>
      </section>
    </>
  )
}

export default CreditCardForm
