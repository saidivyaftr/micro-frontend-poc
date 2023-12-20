import { useMemo } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Skeleton, Typography } from '@/shared-ui/components'
import {
  useActiveAccount,
  useActiveAccountId,
  usePaymentMethods,
} from 'src/selector-hooks'
import { Leaf } from 'src/blitz/assets/react-icons'
import { useAppData } from 'src/hooks'
import ErrorMessage from '../../shared/ErrorMessage'

export const BillingPreference = () => {
  const {
    isLoading: activeAccountLoading,
    data: activeAccountData,
    error: activeAccountError,
  } = useActiveAccount()
  const {
    isLoading: paymentMethodsLoading,
    data: paymentMethodsData,
    error: paymentMethodsError,
  } = usePaymentMethods()
  const billingPreference = useAppData('billingPreference', true)
  const errorMessages = useAppData('errorMessages', true)
  const activeAccountId = useActiveAccountId()

  const { paperless } = activeAccountData

  const classes = useStyles()

  const defaultPaymentMethod = useMemo(
    () => paymentMethodsData?.paymentMethods?.find((method) => method.default),
    [paymentMethodsData],
  )

  if (paymentMethodsLoading || activeAccountLoading || !activeAccountId) {
    return <BillingPreferenceSkeleton />
  }

  const getPaperlessBillingInfo = () => {
    if (!paperless) {
      return billingPreference?.paperlessBillingNotEnrolled?.value
    }
    return (
      <span className={classes.paperlessContainer}>
        <Leaf />
        {billingPreference?.paperlessBillingEnrolled?.value}
      </span>
    )
  }

  const getPaymentMethodInfo = () => {
    if (!defaultPaymentMethod) {
      return billingPreference?.noDefaultPayment?.value
    }
    if (defaultPaymentMethod?.nickName) {
      return <span>{defaultPaymentMethod.nickName}</span>
    }
    return (
      <span>{`${defaultPaymentMethod?.subtype} ****${defaultPaymentMethod?.accountNumberEndsWith}`}</span>
    )
  }

  if (activeAccountError || paymentMethodsError) {
    return <ErrorMessage message={errorMessages?.fetchFailed?.value} />
  }

  return (
    <div>
      <div className={classes.section}>
        <Typography
          styleType="p2"
          fontType="boldFont"
          className={classes.sectionItem}
        >
          {billingPreference?.defaultPaymentLabel?.value}
        </Typography>
        <Typography styleType="p2">{getPaymentMethodInfo()}</Typography>
      </div>
      <div>
        <Typography
          styleType="p2"
          fontType="boldFont"
          className={classes.sectionItem}
        >
          {billingPreference?.paperlessBilling?.value}
        </Typography>
        <Typography styleType="p2">{getPaperlessBillingInfo()}</Typography>
      </div>
    </div>
  )
}

const BillingPreferenceSkeleton = () => {
  return (
    <div>
      <Skeleton width={'70%'} height={56} />
      <Skeleton width={'80%'} height={56} />
    </div>
  )
}

const useStyles = makeStyles(() => ({
  section: {
    marginBottom: 32,
  },
  sectionItem: {
    marginBottom: 8,
  },
  paperlessContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
}))
