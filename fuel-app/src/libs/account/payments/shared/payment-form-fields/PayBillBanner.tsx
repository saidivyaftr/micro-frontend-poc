import colors from '@/shared-ui/colors'
import { ArrowLink, Typography } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { AppRoutes } from 'src/constants'
import { PP_OBJECT_SANS_BOLD } from 'src/constants/fontFamilyNames'
import { PaymentHistory } from 'src/redux/types/payments'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import useAppData from '@/shared-ui/hooks/useAppData'
interface PageProps {
  scheduledPayment: PaymentHistory[] | null
  isAutoPayOn: boolean
  autoPayDate: string
}

const PayBillBanner = ({
  scheduledPayment,
  autoPayDate,
  isAutoPayOn,
}: PageProps) => {
  const styles = useStyles()
  const paymentFormFields = useAppData('paymentFormFields', true)

  const handleEvent = (isAutoPay: boolean) => {
    let event = 'make a payment: manage payments'
    if (isAutoPay) {
      event = 'make a payment: manage autopay'
    }
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: event,
      },
      'tl_o',
      event,
    )
  }

  const scheduledPayments = scheduledPayment?.filter(
    (payment: PaymentHistory) => !['Cancelled'].includes(payment?.status),
  )

  let scheduledPaymentsLabel =
    paymentFormFields?.totalNumScheduledPayments?.value ||
    'You have {{count}} scheduled payments'
  scheduledPaymentsLabel = scheduledPaymentsLabel.replace(
    '{{count}}',
    `${scheduledPayments?.length || 0}`,
  )

  let autoPayScheduledLabel =
    paymentFormFields?.autoPayIsScheduledFor?.value ||
    'Your Auto Pay is scheduled for {{date}}'
  autoPayScheduledLabel = autoPayScheduledLabel.replace('{{date}}', autoPayDate)

  return (
    <>
      {!!scheduledPayments?.length && (
        <div
          data-testid="payment-methods-card-list"
          className={styles.container}
        >
          <Typography
            testId="no-saved-methods-text"
            tagType="h6"
            styleType="p2"
            fontType="boldFont"
            className={styles.description}
          >
            {scheduledPaymentsLabel}
          </Typography>
          <ArrowLink
            dataTestId="manage-payment-methods"
            label={
              paymentFormFields?.managePayments?.value || 'Manage payments'
            }
            onClick={() => handleEvent(false)}
            url={AppRoutes.PaymentActivityPage}
            styleType="p2"
            className={styles.link}
            wrapperClassName={styles.linkCtr}
          />
        </div>
      )}
      {!scheduledPayment?.length && isAutoPayOn && (
        <div
          data-testid="payment-methods-card-list"
          className={styles.container}
        >
          <Typography
            testId="no-saved-methods-text"
            tagType="h6"
            styleType="p2"
            fontType="boldFont"
            className={styles.description}
          >
            {autoPayScheduledLabel}
          </Typography>
          <ArrowLink
            dataTestId="manage-auto-pay"
            label={paymentFormFields?.manageAutoPay?.value || 'Manage Auto Pay'}
            onClick={() => handleEvent(isAutoPayOn)}
            url={AppRoutes.PaymentMethodsPage}
            styleType="p2"
            className={styles.link}
            wrapperClassName={styles.linkCtr}
          />
        </div>
      )}
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    display: 'flex',
    padding: '1rem',
    background: colors.main.secondaryLight,
    alignItems: 'center',
    borderRadius: '1rem',
    marginBottom: '1rem',
    justifyContent: 'space-between',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  description: {
    margin: 0,
  },
  linkCtr: {
    justifyContent: 'unset',
  },
  link: {
    fontFamily: PP_OBJECT_SANS_BOLD,
  },
}))
export default PayBillBanner
