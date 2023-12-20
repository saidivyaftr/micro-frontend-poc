import { makeStyles } from '@material-ui/core'
import { useRouter } from 'next/router'
import { Button, Typography } from 'src/blitz'
import { AutopayIcon, ErrorTriangeOutline } from 'src/blitz/assets/react-icons'
import { CardWithTitle } from 'src/blitz/components/Card/Card'
import {
  useActiveAccount,
  useAccountList,
  useVacationServicesInfo,
} from 'src/selector-hooks'
import colors from 'src/styles/theme/colors'
import { useAppData } from 'src/hooks'
import { Skeleton } from '@/shared-ui/components'
import clx from 'classnames'
import { getLabelAndIcon, extractBill } from 'src/libs/account/helper'
import ErrorMessage from 'src/libs/account/shared/ErrorMessage'
import { SomethingWentWrong, AccountSuspended } from 'src/constants/billing'
import { pick } from 'src/utils/appData/dataExtractor'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { formatAmountInDollar } from 'src/utils/amount'

const MyBillingCard = ({ className = '' }: { className?: string }) => {
  const css = useStyles()
  const router = useRouter()
  const { data: vacationServicesInfo } = useVacationServicesInfo()
  const myBillingCardData = useAppData('myBillingCardData', true)
  const { headerLabel, linkLabel, linkUrl, totalBalanceLabel } =
    myBillingCardData

  const billingconstants = {
    fields: {
      data: {
        datasource: { ...myBillingCardData },
      },
    },
  }
  const {
    isLoading: isAccountsLoading,
    error: accountsError,
    data: accountList,
  } = useAccountList()

  const {
    data: activeAccountDetails,
    isLoading: isAccountLoading,
    error: accountError,
  } = useActiveAccount()
  const billInfo = extractBill(activeAccountDetails)
  const account: any = accountList?.find(
    (acc) => acc.id === activeAccountDetails.id,
  )
  const isSuspended = account?.accountStatusNew === 'disconnected'
  const { autopayType } = activeAccountDetails

  const {
    isPastDue,
    currentBalance: { amount: currentBalanceAmount },
  } = activeAccountDetails.bill ?? {
    pastDueBalance: {},
    pendingPayment: {},
    currentBalance: {},
  }

  const displayedCurrentBalance = formatAmountInDollar(currentBalanceAmount)

  const isAutopayEnabled = !(autopayType === false || autopayType === 'false')
  const accountSuspended = pick(AccountSuspended, billingconstants)
  const [message, buttonText, goToRoute, bannerMessage] =
    (getLabelAndIcon(billInfo, billingconstants) as any) || []

  const isLoading = isAccountsLoading || isAccountLoading
  const isError = accountsError || accountError

  const handleMakePayment: any = (route: string) => {
    const MAKE_PAYMENT = 'my account:make a payment click'
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: MAKE_PAYMENT,
      },
      'tl_o',
      MAKE_PAYMENT,
    )
    router.push(
      {
        pathname: route,
        query: router.query,
      },
      undefined,
      { shallow: false },
    )
  }

  const shouldShowServicePausedLabel =
    vacationServicesInfo?.vacationStatus === 'On' &&
    (currentBalanceAmount || 0) <= 0

  return (
    <CardWithTitle
      title={headerLabel?.value}
      labelLink={linkLabel?.value}
      url={linkUrl?.value}
      className={className}
      styleType="h6"
    >
      {isLoading ? (
        <MyBillingCardSkeleton />
      ) : isError ? (
        <ErrorMessage
          message={pick(SomethingWentWrong, billingconstants)}
          styleType="p2"
          className={css.errorWrapper}
        />
      ) : (
        <>
          <section className={css.contentName}>
            <div className={css.contentBalance}>
              <Typography styleType="p2">{totalBalanceLabel?.value}</Typography>
              <Typography
                className={css.currency}
                fontType="boldFont"
              >{`${displayedCurrentBalance}`}</Typography>
              <Typography
                className={clx({
                  [css.colorRed]: isPastDue && !isAutopayEnabled,
                })}
                styleType="p3"
              >
                {message}
              </Typography>
            </div>
          </section>
          {shouldShowServicePausedLabel ? (
            <div className={clx(css.banner, css.lightRedBanner)}>
              <ErrorTriangeOutline className={css.icon} />
              <Typography styleType="p2">Service Paused</Typography>
            </div>
          ) : (
            <div
              className={clx(
                css.banner,
                (isPastDue && !isAutopayEnabled) || isSuspended
                  ? css.lightRedBanner
                  : css.lightBlueBanner,
              )}
            >
              {(isPastDue && !isAutopayEnabled) || isSuspended ? (
                <ErrorTriangeOutline className={css.icon} />
              ) : (
                <AutopayIcon className={css.icon} />
              )}
              <Typography styleType="p2">
                {isSuspended ? accountSuspended : bannerMessage}
              </Typography>
            </div>
          )}
          <Button
            type="button"
            text={buttonText}
            style={{ marginTop: '2rem' }}
            disabled={shouldShowServicePausedLabel}
            onClick={() => handleMakePayment(goToRoute)}
          />
        </>
      )}
    </CardWithTitle>
  )
}

const MyBillingCardSkeleton = () => {
  return (
    <div>
      <Skeleton width={'70%'} height={30} />
      <Skeleton width={'80%'} height={90} />
      <Skeleton width={'60%'} height={30} />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  contentName: {
    paddingTop: '2rem',
    gap: '16px',
    display: 'flex',
    flexDirection: 'column',
  },
  alerts: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
  },
  specialNoticeCtr: {
    display: 'flex',
    gap: '0.5rem',
  },
  colorRed: {
    color: colors.main.errorRed,
  },
  btn: {
    width: 'auto',
    padding: '1rem 2rem',
    fontSize: '1.125rem',
    lineHeight: '1.125rem',
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  linkBtn: {
    marginTop: '1rem',
    textAlign: 'center',
    textDecoration: 'underline',
    fontSize: '1.125rem',
    fontWeight: 500,
    textUnderlineOffset: '2px',
  },
  currency: {
    fontSize: '42px',
    lineHeight: '50px',
    [breakpoints.down('xs')]: {
      fontSize: '24px',
      lineHeight: '32px',
    },
  },
  contentBalance: {
    display: 'flex',
    gap: '.25rem',
    flexDirection: 'column',
  },
  banner: {
    maxWidth: 309,
    padding: '.5rem',
    borderRadius: '8px',
    display: 'flex',
    gap: '.5rem',
    alignItems: 'center',
    marginTop: '1rem',
  },
  lightBlueBanner: {
    background: colors.main.secondaryLight,
  },
  lightRedBanner: {
    background: colors.main.fireRed,
  },
  icon: {
    width: '24px',
    height: '24px',
    '& path': {
      fill: colors.main.midnightExpress,
    },
  },
  errorWrapper: {
    paddingTop: '1.5rem',
  },
}))

export default MyBillingCard
