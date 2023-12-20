import { useMemo, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Skeleton, Typography } from '@/shared-ui/components'
import { useAccountList, useActiveAccount } from 'src/selector-hooks'
import { EyeClosed, EyeOpen } from 'src/blitz/assets/react-icons'
import colors from '@/shared-ui/colors'
import useFormatterAccountNumber from '@/shared-ui/hooks/useFormatterAccountNumber'
import LanguagePreference from './LanguagePreference'
import ServiceAndMailingAddress from './ServiceAndMailingAddress'
import { useAppData } from 'src/hooks'
import { capitalizeString } from 'src/utils/addressHelpers'
import ErrorMessage from '../../shared/ErrorMessage'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { useCurrentAccountName } from '@/shared-ui/hooks/index'

export const AccountInformation = () => {
  const {
    isLoading: isAccountsLoading,
    data: accounts,
    error: accountListError,
  } = useAccountList()
  const accountInformationData = useAppData('accountInformationData', true)
  const errorMessages = useAppData('errorMessages', true)
  const { formatterAccountNumber } = useFormatterAccountNumber()
  const {
    isLoading,
    data: activeAccountData,
    error: activeAccountError,
  } = useActiveAccount()
  const { fullName } = useCurrentAccountName()
  const { accountNumber, pin } = activeAccountData

  const [showAccountNumber, setShowAccountNumber] = useState(false)
  const [showPin, setShowPin] = useState(false)

  const classes = useStyles()

  const accountNumberToDisplay = useMemo(
    () =>
      showAccountNumber
        ? formatterAccountNumber(accountNumber)
        : accountNumber?.replace(/./g, '*'),
    [accountNumber, showAccountNumber],
  )

  const accountPinToDisplay = useMemo(() => {
    return showPin ? pin : pin?.replace(/./g, '*')
  }, [pin, showPin])

  if (isLoading || isAccountsLoading) {
    return <AccountInformationSkeleton />
  }

  if (accountListError || activeAccountError) {
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
          {accountInformationData?.name?.value}
        </Typography>
        <Typography styleType="p2">
          <>{capitalizeString(fullName || '')}</>
        </Typography>
      </div>
      <ServiceAndMailingAddress
        accountNumber={accountNumber}
        accounts={accounts}
      />
      <div className={classes.section}>
        <Typography
          styleType="p2"
          fontType="boldFont"
          className={classes.sectionItem}
        >
          {accountInformationData?.accountNo?.value}
        </Typography>
        <Typography styleType="p2">
          <span className={classes.showHideContainer}>
            {accountNumberToDisplay}
            <button
              className={classes.showHideBtn}
              onClick={() => {
                setShowAccountNumber(!showAccountNumber)
                const TOGGLE_ACCOUNT_NUM = showAccountNumber
                  ? 'my profile:hide account number'
                  : 'my profile:show account number'
                DTMClient.triggerEvent(
                  {
                    events: 'event14',
                    eVar14: TOGGLE_ACCOUNT_NUM,
                  },
                  'tl_o',
                  TOGGLE_ACCOUNT_NUM,
                )
              }}
            >
              {showAccountNumber ? <EyeOpen /> : <EyeClosed />}
            </button>
          </span>
        </Typography>
      </div>
      <div className={classes.section}>
        <Typography
          styleType="p2"
          fontType="boldFont"
          className={classes.sectionItem}
        >
          {accountInformationData?.pin?.value}
        </Typography>
        <Typography styleType="p2">
          <span className={classes.showHideContainer}>
            {accountPinToDisplay}
            <button
              className={classes.showHideBtn}
              onClick={() => {
                setShowPin(!showPin)
                const TOGGLE_ACCOUNT_PIN = showPin
                  ? 'my profile:hide passcode'
                  : 'my profile:show passcode'
                DTMClient.triggerEvent(
                  {
                    events: 'event14',
                    eVar14: TOGGLE_ACCOUNT_PIN,
                  },
                  'tl_o',
                  TOGGLE_ACCOUNT_PIN,
                )
              }}
            >
              {showPin ? <EyeOpen /> : <EyeClosed />}
            </button>
          </span>
        </Typography>
      </div>
      <LanguagePreference
        accountNumber={accountNumber}
        language={activeAccountData?.preferredLanguageCode}
        preferredLanguageEditable={activeAccountData?.preferredLanguageEditable}
      />
    </div>
  )
}

const AccountInformationSkeleton = () => {
  return (
    <div>
      <Skeleton width={'70%'} height={30} />
      <Skeleton width={'80%'} height={90} />
      <Skeleton width={'60%'} height={30} />
      <Skeleton width={'40%'} height={30} />
      <Skeleton width={'60%'} height={50} />
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
  showHideBtn: {
    background: 'transparent',
    border: 0,
    '&:hover': {
      cursor: 'pointer',
      '& svg': {
        '& path': {
          fill: colors.main.brightRed,
        },
      },
    },
  },
  showHideContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  address: {
    maxWidth: 300,
  },
}))
