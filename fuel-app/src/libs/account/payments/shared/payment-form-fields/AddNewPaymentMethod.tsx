/* eslint-disable @typescript-eslint/indent */
import { Field } from 'formik'
import React from 'react'
import { format } from 'date-fns'
import FormHelperText from '@material-ui/core/FormHelperText'
import BankAccountForm from '../BankAccountForm'
import CreditCardForm from '../CreditCardForm'
import css from '../../payments.module.scss'
import { FormikProps } from 'formik'
import { Info } from 'src/libs/account/shared/Info'
import { BlockType } from '../../util'
import useAppData from '@/shared-ui/hooks/useAppData'

type AddNewPaymentMethodProps = {
  formikProps: FormikProps<any>
  blockType: BlockType
}

const getPaymentOptions = (blockType: BlockType) => {
  const bankAccountOption = {
    type: 'radio',
    name: 'newPaymentOption',
    value: 'bankAccountForm',
    label: 'Bank Account',
    icon: 'https://frontier.com/~/media/my-account/fiserve/signup-for-auto-pay/bankIcon',
  }
  const cardOption = {
    type: 'radio',
    name: 'newPaymentOption',
    value: 'creditCardForm',
    label: 'Credit/Debit card',
    icon: 'https://frontier.com/~/media/my-account/fiserve/signup-for-auto-pay/CC-Icon',
  }
  if (
    blockType === BlockType.None ||
    ![BlockType.Checking, BlockType.Card].includes(blockType)
  ) {
    return [bankAccountOption, cardOption]
  }
  return [blockType === BlockType.Card ? bankAccountOption : cardOption]
}

const paymentDateOptions = [
  {
    label: 'Pay today',
    value: format(new Date(), 'eeee, dd, yyyy'),
    type: 'radio',
    name: 'paymentDate',
  },
]

const AddNewPaymentMethod = (props: AddNewPaymentMethodProps) => {
  const { paymentDate, paymentMethodErrMsg } = useAppData('paymentMethod', true)

  const { formikProps, blockType = BlockType.None } = props
  const paymentOptions = getPaymentOptions(blockType)
  return (
    <div role="group" aria-labelledby="paymentOption">
      <div className={css.paymentOption}>
        {paymentOptions.map((paymentOption, paymentIndex) => {
          const { type, value, name, label, icon } = paymentOption
          return (
            <React.Fragment key={paymentIndex}>
              <label className={css.newPaymentFormFields}>
                <Field type={type} name={name} value={value} />
                <img src={icon} alt={label} />
                {label}
              </label>
            </React.Fragment>
          )
        })}
      </div>

      <div className={css.paymentDateOptions}>
        <div>
          <FormHelperText className={css.sectionHeader}>
            {paymentDate?.value}{' '}
          </FormHelperText>
        </div>
        <div>
          {paymentDateOptions.map((option, index) => {
            const { type, value, name, label } = option
            return (
              <React.Fragment key={`payment-date${index}`}>
                <label className={css.newPaymentFormFields}>
                  <Field type={type} name={name} value={value} />
                  {label}
                </label>
              </React.Fragment>
            )
          })}
        </div>
      </div>

      <div>
        {paymentOptions.length > 0 ? (
          formikProps.values.newPaymentOption === 'bankAccountForm' ? (
            <BankAccountForm />
          ) : (
            <CreditCardForm />
          )
        ) : (
          <Info type="error" message={paymentMethodErrMsg?.value} />
        )}
      </div>
    </div>
  )
}

export default AddNewPaymentMethod
