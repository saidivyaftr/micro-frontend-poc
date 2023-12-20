/* eslint-disable @typescript-eslint/indent */
import { makeStyles } from '@material-ui/core'
import { ReactNode, useEffect, useState } from 'react'
import { CardWithTitle } from 'src/blitz/components/Card/Card'
import { Typography, Button, Skeleton } from 'src/blitz'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import clx from 'classnames'
import { AutopayIcon, ErrorTriangeOutline } from 'src/blitz/assets/react-icons'
import ErrorMessage from 'src/libs/account/shared/ErrorMessage'
import { useRouter } from 'next/router'
import { AppRoutes } from 'src/constants/appRoutes'
import colors from 'src/styles/theme/colors'
import { pick } from 'src/utils/appData/dataExtractor'
import { extractBill, getLabelAndIcon } from '../../welcome/helper'
import {
  TotalBalance,
  ManagePayments,
  SomethingWentWrong,
  AccountSuspended,
  AccountPaused,
} from 'src/constants/billing'
import {
  useActiveAccount,
  useAccountList,
  useBillList,
  useVacationServicesInfo,
} from 'src/selector-hooks'
import { useAppData } from 'src/hooks'
import { formatAmountInDollar } from 'src/utils/amount'

type SvgIcon = ReactNode | string

type IconTextProps = {
  icon: SvgIcon
  label: string
}

export const IconText = ({ icon, label }: IconTextProps) => {
  const classes = useStyles()
  return (
    <div className={classes.IconContainer}>
      <div>{icon}</div>
      <Typography styleType="p3" className={classes.IconLabel}>
        {label}
      </Typography>
    </div>
  )
}

const CurrentBalanceCard = () => {
  const classes = useStyles()
  const router = useRouter()
  const [accountPaused, setAccountPaused] = useState<boolean>(false)

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
  const { isLoading: vacationServiceLoading, data: vacationServicesInfo } =
    useVacationServicesInfo()
  const { isLoading: isStatementsLoading } = useBillList()

  const billInfo = extractBill(activeAccountDetails)
  const account: any = accountList?.find(
    (acc) => acc.id === activeAccountDetails.id,
  )
  const isSuspended = account?.accountStatusNew === 'disconnected'
  const { isPastDue, displayedCurrentBalance, isAutopayEnabled } = billInfo
  const billingConstants = useAppData('autoPayCard', false)

  const accountSuspended = pick(AccountSuspended, billingConstants)
  const accountPausedDesc = pick(AccountPaused, billingConstants)
  const [message, buttonText, goToRoute, bannerMessage] =
    (getLabelAndIcon(billInfo, billingConstants) as any) || []

  const handleMakePayment: any = (route: string) => {
    const MAKE_PAYMENT_CLICK = 'my account:make a payment click'
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: MAKE_PAYMENT_CLICK,
      },
      'tl_o',
      MAKE_PAYMENT_CLICK,
    )
    router.push({ pathname: route, query: router.query }, undefined, {
      shallow: false,
    })
  }

  useEffect(() => {
    const {
      vacationStatus = '',
      vacationPauseStartDate = '',
      vacationPauseEndDate = '',
    } = vacationServicesInfo

    const isZeroOrLess = parseFloat(displayedCurrentBalance) <= 0
    if (
      vacationStatus === 'On' &&
      vacationPauseStartDate &&
      vacationPauseEndDate &&
      isZeroOrLess
    ) {
      setAccountPaused(vacationStatus === 'On')
    } else setAccountPaused(false)
  }, [vacationServicesInfo, displayedCurrentBalance])

  const isLoading =
    isAccountsLoading ||
    isAccountLoading ||
    isStatementsLoading ||
    vacationServiceLoading
  const isError = accountsError || accountError

  const getBannerMessage = () => {
    if (isSuspended) return accountSuspended
    else if (accountPaused) return accountPausedDesc
    else return bannerMessage
  }

  return (
    <CardWithTitle
      title={pick(TotalBalance, billingConstants)}
      styleType="h5"
      labelLink={pick(ManagePayments, billingConstants)}
      url={AppRoutes.PaymentActivityPage}
    >
      {isLoading ? (
        <div className={classes.loadingCtr}>
          <Skeleton data-testid="current-balance-card-loader" height={40} />
        </div>
      ) : isError ? (
        <ErrorMessage
          message={pick(SomethingWentWrong, billingConstants)}
          styleType="p2"
        />
      ) : (
        <div className={classes.billingInnerWrapper}>
          <div className={`${classes.amtMessageCtr}`}>
            <div className={classes.priceMessage}>
              <Typography styleType="h3" fontType="boldFont">
                {formatAmountInDollar(displayedCurrentBalance)}
              </Typography>
              <Typography
                styleType="p3"
                className={clx({
                  [classes.redColor]: isPastDue && !isAutopayEnabled,
                })}
              >
                {message}
              </Typography>
            </div>
          </div>
          <div
            className={clx(
              classes.banner,
              (isPastDue && !isAutopayEnabled) || isSuspended || accountPaused
                ? classes.lightRedBanner
                : classes.lightBlueBanner,
            )}
          >
            {(isPastDue && !isAutopayEnabled) ||
            isSuspended ||
            accountPaused ? (
              <ErrorTriangeOutline className={classes.icon} />
            ) : (
              <AutopayIcon className={classes.icon} />
            )}
            <Typography styleType="p2">{getBannerMessage()}</Typography>
          </div>
          {buttonText && (
            <Button
              type="button"
              className={classes.btn}
              onClick={() => handleMakePayment(goToRoute)}
              text={buttonText}
              disabled={accountPaused}
            />
          )}
        </div>
      )}
    </CardWithTitle>
  )
}
export default CurrentBalanceCard

const useStyles = makeStyles(({ breakpoints }) => ({
  loadingCtr: {
    padding: '2rem 0',
  },
  billingInnerWrapper: {
    display: 'flex',
    gap: '1rem 2rem',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '2rem',
    flexWrap: 'wrap',
    [breakpoints.down('xs')]: {
      marginTop: '1rem',
      flexDirection: 'column',
      justifyContent: 'unset',
      alignItems: 'unset',
    },
  },
  amtMessageCtr: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem 2rem',
    maxWidth: '25%',
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'unset',
    },
  },

  IconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: '4px 0px',
  },
  IconLabel: {
    fontWeight: 400,
    fontSize: '16px',
    marginLeft: 8,
    marginBottom: 5,
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
  priceMessage: {
    display: 'flex',
    flexDirection: 'column',
  },
  banner: {
    width: 309,
    padding: '.5rem',
    borderRadius: '8px',
    display: 'flex',
    gap: '.5rem',
    alignItems: 'center',
  },
  lightBlueBanner: {
    background: colors.main.secondaryLight,
  },
  lightRedBanner: {
    background: colors.main.fireRed,
  },
  redColor: {
    color: colors.main.inputError,
  },
  icon: {
    width: '24px',
    height: '24px',
    '& path': {
      fill: colors.main.midnightExpress,
    },
  },
}))
