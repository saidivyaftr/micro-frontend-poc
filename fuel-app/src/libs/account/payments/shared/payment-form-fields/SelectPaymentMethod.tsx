import { Field, FormikProps } from 'formik'
import InputSelect from './InputSelect'
import {
  NewPaymentMethodType,
  PaymentMethod,
  PaymentMethodList,
} from 'src/redux/types/payments'
import { BlockType } from '../../util'
import { InjectHTML } from '@/shared-ui/components'
import { useEffect, useMemo } from 'react'
import InfoIconWhite from '@/shared-ui/react-icons/info-icon-white'
import { makeStyles } from '@material-ui/core'
import css from '../../payments.module.scss'
import { IPaymentFormValues } from '../types'
import useAppData from '@/shared-ui/hooks/useAppData'

type SelectPaymentMethodProps = {
  paymentMethods: PaymentMethodList
  formikProps: FormikProps<IPaymentFormValues>
  blockType: BlockType
  setSelectedCard?: (card: PaymentMethod) => void
}

const NEW_OPTION = {
  id: 'new',
  value: 'new',
  displayLabel: 'Add New Payment Method',
}

const parsePaymentMethods = (
  methods: PaymentMethodList,
  blockType: BlockType,
) => {
  let result: Array<PaymentMethod | NewPaymentMethodType> = []
  if (methods && methods.length) {
    result = methods.map(function (method) {
      return {
        ...method,
        id: method.id,
        value: method.id,
        disabled: method.type === blockType,
        type: method.type,
        default: method.default,
        displayLabel: method.nickName,
      }
    })
  }
  result.push(NEW_OPTION)
  return result
}

export const SelectPaymentMethod = ({
  formikProps,
  paymentMethods = [],
  blockType = BlockType.None,
  setSelectedCard,
}: SelectPaymentMethodProps) => {
  const classes = useStyle()
  const paymentInformationData = useAppData('paymentInformationData', true)
  const paymentFormFields = useAppData('paymentFormFields', true)

  const selectedCard = useMemo(
    () =>
      paymentMethods.find(
        (option) => option.id === formikProps.values.paymentMethod,
      ),
    [paymentMethods, formikProps.values.paymentMethod],
  )

  useEffect(() => {
    if (selectedCard && setSelectedCard) {
      setSelectedCard(selectedCard)
    }
  }, [selectedCard])

  const isBusinessClass = selectedCard?.class === 'BUSINESS'
  return (
    <div
      role="group"
      aria-labelledby="paymentOption"
      className={
        formikProps.values.paymentMethod === 'new'
          ? classes.newPayContainer
          : css.formFieldsContent
      }
    >
      <InjectHTML
        addAnchorStyles
        tagType="h6"
        styleType="h6"
        value={
          paymentInformationData?.paymentMethod?.value ||
          'Select payment method'
        }
        className={css.formSubTitle}
      />

      <Field
        name="paymentMethod"
        options={parsePaymentMethods(paymentMethods, blockType)}
        component={InputSelect}
      />
      {isBusinessClass && (
        <div className={css.tooltipWithText}>
          <InfoIconWhite />
          <InjectHTML
            tagType="span"
            styleType="p1"
            className={css.formFieldLegal}
            value={
              paymentFormFields?.creditCardSurcharge?.value ||
              'If using a commercial or Business credit card, a 3% surcharge will be assessed on the bill payment amount.'
            }
          />
        </div>
      )}
    </div>
  )
}

const useStyle = makeStyles(() => ({
  newPayContainer: {
    paddingBottom: 0,
  },
}))
