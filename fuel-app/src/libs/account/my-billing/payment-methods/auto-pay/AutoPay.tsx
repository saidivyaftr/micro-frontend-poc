import { makeStyles } from '@material-ui/core'
import { Skeleton } from 'src/blitz'
import { CardWithTitle } from '@/shared-ui/components/Card/Card'
import {
  useAccountList,
  useActiveAccount,
  useAutopayDetails,
  usePaymentMethods,
} from 'src/selector-hooks'
import { AutoPayEnrolled } from './AutoPayEnrolled'
import { AutoPayNotEnrolled } from './AutoPayNotEnrolled'
import ErrorMessage from 'src/libs/account/shared/ErrorMessage'
import useAppData from '@/shared-ui/hooks/useAppData'

const AutoPayContainer = () => {
  const classes = useStyles()
  const autoPayData = useAppData('autoPayData', true)
  const errorMessages = useAppData('errorMessages', true)
  const { isLoading: isAccountsLoading } = useAccountList()
  const { isLoading: isActiveAccountLoading } = useActiveAccount()
  const {
    isLoading: isPaymentMethodsLoading,
    data: paymentMethods,
    error: paymentMethodsError,
  } = usePaymentMethods()
  const { isLoading, data: autoPayDetails, error } = useAutopayDetails()

  const autoPayPaymentDetails = paymentMethods?.paymentMethods?.find(
    ({ id }) => id === autoPayDetails?.[0]?.paymentMethodId,
  )

  // Loading state
  if (
    isLoading ||
    isActiveAccountLoading ||
    isAccountsLoading ||
    isPaymentMethodsLoading
  ) {
    return <AutoPaySkeleton />
  }

  // Error fallback
  if (error || paymentMethodsError) {
    return (
      <CardWithTitle
        title={autoPayData?.title.value}
        styleType="h5"
        classNameTitle={classes.title}
      >
        <ErrorMessage message={errorMessages?.fetchFailed?.value} />
      </CardWithTitle>
    )
  }

  // Where the auto pay is already enabled
  if (autoPayPaymentDetails) {
    return <AutoPayEnrolled autoPayPaymentDetails={autoPayPaymentDetails} />
  }

  // When the auto pay is not enabled
  return <AutoPayNotEnrolled />
}

const AutoPaySkeleton = () => (
  <CardWithTitle>
    <>
      <Skeleton width={100} height={30} />
      <Skeleton width={350} height={50} />
    </>
  </CardWithTitle>
)

const useStyles = makeStyles(() => ({
  title: {
    marginBottom: 32,
  },
  warningContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 8,
  },
  warningText: {
    flex: 1,
  },
}))

export default AutoPayContainer
