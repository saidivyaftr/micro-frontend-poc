import { makeStyles } from '@material-ui/core'
import { useMemo, useState } from 'react'
import { ArrowLink, Skeleton, Typography } from 'src/blitz'
import { CardWithTitle } from 'src/blitz/components/Card/Card'
import { AppRoutes } from 'src/constants/appRoutes'
import {
  Default,
  Expired,
  ManagePaymentMethods,
  NoSavedMethods,
  PaymentMethods,
  SomethingWentWrong,
} from 'src/constants/billing'
import useAppData from 'src/hooks/useAppData'
import { PaymentMethod, PaymentMethodList } from 'src/redux/types/payments'
import {
  useAccountList,
  useActiveAccount,
  usePaymentMethods,
} from 'src/selector-hooks'
import ErrorMessage from 'src/libs/account/shared/ErrorMessage'
import colors from 'src/styles/theme/colors'
import { pick } from 'src/utils/appData/dataExtractor'
import clx from 'classnames'

const PaymentMethodsCard: React.FC = () => {
  const classes = useStyles()
  const [noPaymentMethods, setNoPaymentMethods] = useState(false)
  const { isLoading: isAccountsLoading, error: accountsError } =
    useAccountList()
  const { isLoading: accountLoading, error: accountError } = useActiveAccount()
  const { isLoading, data: paymentMethodsData, error } = usePaymentMethods()
  const billingConstants = useAppData('autoPayCard')

  const partitionedPaymentMethods = useMemo(() => {
    const displayList: {
      default: PaymentMethodList
      rest: PaymentMethodList
    } = { default: [], rest: [] }
    if (paymentMethodsData.paymentMethods?.length > 0) {
      paymentMethodsData.paymentMethods.forEach((pmtMethod) => {
        if (pmtMethod.default) {
          displayList.default.push(pmtMethod)
        } else {
          displayList.rest.push(pmtMethod)
        }
      })
      setNoPaymentMethods(false)
      return displayList
    } else {
      setNoPaymentMethods(true)
    }
  }, [paymentMethodsData])

  const renderPaymentMethodRow = (paymentMethod: PaymentMethod) => {
    return (
      <div
        data-testid="payment-method-row"
        key={paymentMethod.id}
        className={classes.paymentMethodRow}
      >
        <div
          className={classes.accountNumberCtr}
          title={paymentMethod.nickName}
        >
          <Typography
            className={classes.nickName}
            testId="payment-method-row-nickname"
          >
            {paymentMethod.nickName}
          </Typography>
        </div>
        <div>
          {paymentMethod.default && (
            <Typography
              styleType="p3"
              testId="payment-method-row-default"
              className={classes.defaultLabel}
            >
              {pick(Default, billingConstants)}
            </Typography>
          )}
          {paymentMethod.status?.toLowerCase() === 'expired' && (
            <Typography
              styleType="p3"
              className={clx(classes.defaultLabel, classes.expired)}
              testId="payment-method-row-expired"
            >
              {pick(Expired, billingConstants)}
            </Typography>
          )}
        </div>
      </div>
    )
  }

  const renderPaymentMethodList = () => {
    if (noPaymentMethods || !partitionedPaymentMethods) {
      return (
        <Typography testId="no-saved-methods-text" className={classes.ySpacing}>
          {pick(NoSavedMethods, billingConstants)}
        </Typography>
      )
    }
    const hasDefault = partitionedPaymentMethods.default.length > 0
    return (
      <>
        {hasDefault &&
          renderPaymentMethodRow(partitionedPaymentMethods.default[0])}
        {partitionedPaymentMethods.rest.length > 0 &&
          partitionedPaymentMethods.rest.map(renderPaymentMethodRow)}
      </>
    )
  }

  const loading = isAccountsLoading || accountLoading || isLoading
  const isError = error || accountsError || accountError

  return (
    <CardWithTitle
      title={pick(PaymentMethods, billingConstants)}
      size="big-rectangle"
      styleType="h5"
      dataTestId="payment-methods-card"
    >
      {loading ? (
        <>
          <Skeleton
            height={35}
            width={200}
            className={classes.loadingSkeleton}
          />
          <Skeleton
            height={35}
            width={200}
            className={classes.loadingSkeleton}
          />
        </>
      ) : isError ? (
        <ErrorMessage
          data-testid="autopay-card-error"
          message={pick(SomethingWentWrong, billingConstants)}
        />
      ) : (
        <div
          data-testid="payment-methods-card-list"
          className={classes.paymentMethodRowCtr}
        >
          {renderPaymentMethodList()}
          <ArrowLink
            dataTestId="manage-payment-methods"
            label={pick(ManagePaymentMethods, billingConstants)}
            url={AppRoutes.PaymentMethodsPage}
            tagType="h6"
            styleType="p2"
            wrapperClassName={classes.linkCtr}
            className={classes.link}
            fontType="boldFont"
            dtmMessage={`my account:manage payments click`}
          />
        </div>
      )}
    </CardWithTitle>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  noMargin: {
    margin: 0,
  },
  ySpacing: {
    paddingBottom: '1rem',
  },
  linkCtr: {
    justifyContent: 'unset',
  },
  link: {
    padding: '1rem 0',
    margin: 0,
  },
  paymentMethodRowCtr: {
    marginTop: '2rem',
    [breakpoints.down('xs')]: {
      marginTop: '1rem',
    },
  },
  paymentMethodRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 4rem',
    alignItems: 'center',
    columnGap: '1rem',
    paddingBottom: '1rem',
  },
  accountNumberCtr: {
    display: 'grid',
  },
  nickName: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textTransform: 'capitalize',
  },
  expired: {
    color: colors.main.errorRed,
  },
  defaultLabel: {
    color: colors.main.grayOpacity50,
  },
  loadingSkeleton: {
    marginBottom: 10,
  },
}))

export default PaymentMethodsCard
