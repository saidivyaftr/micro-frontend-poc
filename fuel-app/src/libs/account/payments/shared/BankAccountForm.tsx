import Image from 'next/image'
import css from '../payments.module.scss'
import PaymentIframe from './PaymentIframe'

const BankAccountForm = () => {
  return (
    <section className={css.bankAccountForm}>
      <div>
        <PaymentIframe type="BankAccount" />
      </div>
      <div>
        <Image
          src="https://frontier.com/~/media/my-account/fiserve/signup-for-auto-pay/check"
          alt="bank account check"
          height={300}
          width={500}
        />
      </div>
    </section>
  )
}

export default BankAccountForm
