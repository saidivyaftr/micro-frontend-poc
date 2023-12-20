import colors from '@/shared-ui/colors'
import { Typography } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { Account } from 'src/redux/types/accountTypes'
import {
  capitalizeString,
  formSingleLineAddressForServiceAddress,
} from 'src/utils/addressHelpers'
import { useMemo, useState } from 'react'
import { useAppData, useFormatterAccountNumber } from '@/shared-ui/hooks/index'
import { EyeClosed, EyeOpen } from 'src/blitz/assets/react-icons'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

export const LinkedAccountRowMobile = ({
  account,
  setUnlinkId,
}: {
  account: Account
  setUnlinkId: any
}) => {
  const classes = useStyles()
  const linkedAccountsData = useAppData('linkedAccountsData', true)

  const [showAccountNumber, setShowAccountNumber] = useState(false)
  const { formatterAccountNumber } = useFormatterAccountNumber()

  const accountNumberToDisplay = useMemo(
    () =>
      showAccountNumber
        ? formatterAccountNumber(account.accountNumber)
        : account.accountNumber?.replace(/./g, '*'),
    [account, showAccountNumber],
  )

  const name = [
    capitalizeString(account.firstName),
    capitalizeString(account.lastName),
  ]
    .filter(Boolean)
    .join(' ')

  const serviceAddress = account?.serviceDetails?.details?.serviceAddress
  const serviceAddressLine =
    formSingleLineAddressForServiceAddress(serviceAddress) || ''
  return (
    <div className={classes.card}>
      <div className={classes.item}>
        <Typography
          styleType="p2"
          fontType="boldFont"
          className={classes.title}
        >
          {linkedAccountsData?.serviceAddress?.value}
        </Typography>
        <Typography>
          <>
            {serviceAddressLine[0]}, <br /> {serviceAddressLine[1]}
          </>
        </Typography>
      </div>
      <div className={classes.item}>
        <Typography
          styleType="p2"
          fontType="boldFont"
          className={classes.title}
        >
          {linkedAccountsData?.name?.value}
        </Typography>
        <Typography>{name}</Typography>
      </div>
      <div className={classes.item}>
        <Typography
          styleType="p2"
          fontType="boldFont"
          className={classes.title}
        >
          {linkedAccountsData?.accountNumber?.value}
        </Typography>
        <Typography>
          <span className={classes.showHideContainer}>
            {accountNumberToDisplay}
            <button
              className={classes.showHideBtn}
              onClick={() => {
                setShowAccountNumber(!showAccountNumber)

                DTMClient.triggerEvent(
                  {
                    events: 'event14',
                    eVar14: `account access:${
                      !showAccountNumber ? 'show' : 'hide'
                    } account number`,
                  },
                  'tl_o',
                  `account access:${
                    !showAccountNumber ? 'show' : 'hide'
                  } account number`,
                )
              }}
            >
              {showAccountNumber ? <EyeOpen /> : <EyeClosed />}
            </button>
          </span>
        </Typography>
      </div>
      <div className={classes.item}>
        <Typography
          styleType="p2"
          fontType="mediumFont"
          className={classes.unlink}
          onClick={() => setUnlinkId(account?.serviceDetails?.id || null)}
        >
          {linkedAccountsData?.unlink?.value}
        </Typography>
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  card: {
    borderBottom: `1px solid ${colors.main.borderGrey}`,
    margin: '24px 0',
  },
  item: {
    marginBottom: 32,
  },
  title: {
    marginBottom: 8,
  },
  unlink: {
    textDecoration: 'underline',
    '&:hover': {
      color: colors.main.brightRed,
      cursor: 'pointer',
    },
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
}))
