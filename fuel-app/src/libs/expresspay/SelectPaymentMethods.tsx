import { Field } from 'formik'
import React from 'react'
import { format } from 'date-fns'
import FormHelperText from '@material-ui/core/FormHelperText'
import css from '../account/payments/payments.module.scss'
import { FormikProps } from 'formik'
import { Info } from 'src/libs/account/shared/Info'
import useAppData from '@/shared-ui/hooks/useAppData'
import { PaymentMethodList } from 'src/redux/types/payments'
import BankAccountForm from '../account/payments/shared/BankAccountForm'
import CreditCardForm from '../account/payments/shared/CreditCardForm'
import { BlockType } from '../account/payments/util'
import { makeStyles } from '@material-ui/styles'
import colors from '@/shared-ui/colors'

type SelectPaymentMethodsProps = {
  formikProps: FormikProps<any>
  blockType: BlockType
  paymentMethods: PaymentMethodList
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

const SelectPaymentMethods = (props: SelectPaymentMethodsProps) => {
  const classes = useStyles()

  const { paymentDate, paymentMethodErrMsg } = useAppData('paymentMethod', true)

  const { formikProps, blockType = BlockType.None, paymentMethods } = props
  const paymentOptions = [
    ...getPaymentOptions(blockType),
    ...paymentMethods.map((item) => ({
      ...item,
      type: 'radio',
      name: 'newPaymentOption',
      value: item.id,
      label: item.description,
      icon: null,
    })),
  ]
  return (
    <div role="group" aria-labelledby="paymentOption">
      <div className={css.paymentOption}>
        {paymentOptions.map((paymentOption, paymentIndex) => {
          const { type, value, name, label, icon } = paymentOption
          return (
            <React.Fragment key={paymentIndex}>
              <label className={css.newPaymentFormFields}>
                <Field type={type} name={name} value={value} />
                {icon && <img src={icon} alt={label} />}
                {label}
              </label>
            </React.Fragment>
          )
        })}
      </div>

      <div className={css.paymentDateOptions}>
        <div className={classes.sectionHeader}>
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
        {paymentOptions?.length > 0 ? (
          formikProps?.values?.newPaymentOption === 'bankAccountForm' ? (
            <BankAccountForm />
          ) : formikProps?.values?.newPaymentOption === 'creditCardForm' ? (
            <CreditCardForm />
          ) : null
        ) : (
          <Info type="error" message={paymentMethodErrMsg?.value} />
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  sectionHeader: {
    '& p': {
      color: colors.main.dark,
    },
  },
}))

export default SelectPaymentMethods
