import { Field } from 'formik'
import InputDate from './InputDate'
import { InjectHTML } from '@/shared-ui/components'
import css from '../../payments.module.scss'
import { useAppData } from '@/shared-ui/hooks/index'

const SelectPaymentDate = ({ hideToday }: { hideToday?: boolean }) => {
  const paymentInformationData = useAppData('paymentInformationData', true)
  return (
    <div
      role="group"
      aria-labelledby="paymentDate"
      className={css.formFieldsContent}
    >
      <InjectHTML
        addAnchorStyles
        tagType="h6"
        styleType="h6"
        value={
          paymentInformationData?.paymentDate?.value || 'Select payment date'
        }
        className={css.formSubTitle}
      />
      <Field
        name="schedulePaymentDate"
        component={InputDate}
        hideToday={Boolean(hideToday)}
      />
    </div>
  )
}

export default SelectPaymentDate
