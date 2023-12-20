import { useMemo } from 'react'
import { InputAdornment, makeStyles } from '@material-ui/core'
import { Field } from 'formik'
import { AccountDetails } from 'src/redux/types/accountTypes'
import css from '../../payments.module.scss'
import { InputField } from './InputField'
import { IPaymentFormValues } from '../types'
import { FormikProps } from 'formik'
import { InjectHTML, TooltipPopover } from '@/shared-ui/components'
import InfoIconWhite from '@/shared-ui/react-icons/info-icon-white'
import clx from 'classnames'
import colors from '@/shared-ui/colors'
import { formatAmount, formatAmountInDollar } from 'src/utils/amount'
import useAppData from '@/shared-ui/hooks/useAppData'

type PaymentSelectionPropType = {
  accountDetails: AccountDetails | Record<string, never>
  formikProps: FormikProps<IPaymentFormValues>
}

const useHelperTextStyles = makeStyles(() => ({
  root: {
    width: 'max-content',
    margin: 0,
    position: 'absolute',
    top: '2.5rem',
    '&.Mui-error': {
      color: colors.main.inputError,
    },
  },
}))

const SelectPaymentAmount = ({
  accountDetails,
  formikProps,
}: PaymentSelectionPropType) => {
  const paymentFormFields = useAppData('paymentFormFields', true)

  const classes = useHelperTextStyles()
  const paymentInformationData = useAppData('paymentInformationData', true)

  const { currentBalance, pastDueBalance } = useMemo(
    () => ({
      currentBalance: formatAmount(accountDetails.bill?.currentBalance?.amount),
      pastDueBalance: formatAmount(accountDetails.bill?.pastDueBalance?.amount),
    }),
    [accountDetails],
  )
  const getpaymentsFormFields = () => {
    const fields = [
      {
        type: 'radio',
        name: 'paymentAmount',
        value: 'currentBalance',
        disabled: parseFloat(currentBalance) <= 0,
        label: paymentFormFields?.totalBalance?.value,
        amount: formatAmountInDollar(currentBalance),
        tooltip: paymentFormFields?.totalBalanceToolTip?.value,
      },
      {
        id: 'payPastDue',
        type: 'radio',
        name: 'paymentAmount',
        value: 'pastDueBalance',
        disabled: parseFloat(pastDueBalance) <= 0,
        label: paymentFormFields?.pastDueAmount?.value,
        amount: formatAmountInDollar(pastDueBalance),
      },
    ]
    return fields
  }
  return (
    <div
      role="group"
      aria-labelledby="paymentAmount"
      className={css.formFieldsContent}
    >
      <InjectHTML
        addAnchorStyles
        tagType="h6"
        styleType="h6"
        value={
          paymentInformationData?.paymentAmount?.value ||
          'Select payment amount'
        }
        className={css.formSubTitle}
      />
      <div className={css.radioContainer}>
        {getpaymentsFormFields().map((fieldItem, fieldIndex) => {
          const { type, value, name, label, disabled, amount, tooltip } =
            fieldItem
          return (
            <div key={fieldIndex} className={css.radioContent}>
              <label className={`${disabled && css.disableField}`}>
                <Field
                  type={type}
                  name={name}
                  value={value}
                  disabled={disabled}
                />
                <InjectHTML
                  addAnchorStyles
                  tagType="p"
                  styleType="p2"
                  value={label}
                />
                {value === 'currentBalance' && tooltip && (
                  <TooltipPopover
                    tooltipIcon={<InfoIconWhite />}
                    tooltipDirection={'bottom'}
                    tooltipContent={tooltip}
                  />
                )}
              </label>
              <InjectHTML
                addAnchorStyles
                tagType="p"
                styleType="p2"
                value={amount}
                className={css.radioWithAmount}
              />
            </div>
          )
        })}
        <div
          className={clx(css.radioWithInput, {
            [css.radioWithInputError]: formikProps.errors.paymentAmountOther,
          })}
        >
          <label>
            <Field
              id="payOther"
              type="radio"
              name="paymentAmount"
              value="Others"
            />
            {paymentFormFields?.enterCustomAmount?.value}
          </label>
          <Field
            name="paymentAmountOther"
            type="number"
            min={accountDetails.constraints?.payments?.minimumAmount}
            max={accountDetails.constraints?.payments?.maximumAmount}
            label=""
            size="small"
            restrictToNumber
            disabled={formikProps.values.paymentAmount !== 'Others'}
            FormHelperTextProps={{
              classes: {
                root: classes.root,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            component={InputField}
          />
        </div>
      </div>
    </div>
  )
}

export default SelectPaymentAmount
