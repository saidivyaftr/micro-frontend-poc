import { Typography } from '@/shared-ui/components'
import { Grid, makeStyles } from '@material-ui/core'
import { Account } from 'src/redux/types/accountTypes'
import { useMemo, useState } from 'react'
import {
  capitalizeString,
  formSingleLineAddressForServiceAddress,
} from 'src/utils/addressHelpers'
import useFormatterAccountNumber from '@/shared-ui/hooks/useFormatterAccountNumber'
import colors from '@/shared-ui/colors'
import { EyeClosed, EyeOpen } from 'src/blitz/assets/react-icons'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import useAppData from '@/shared-ui/hooks/useAppData'

export const LinkedAccountRow = ({
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
    <Grid container className={classes.row}>
      <Grid item xs={4} className={classes.tableCell}>
        <Typography styleType="p2">
          <>
            {serviceAddressLine[0]}, <br /> {serviceAddressLine[1]}
          </>
        </Typography>
      </Grid>
      <Grid item xs={3} className={classes.tableCell}>
        <Typography styleType="p2">{name}</Typography>
      </Grid>
      <Grid item xs={4} className={classes.tableCell}>
        <Typography styleType="p2">
          <span className={classes.showHideContainer}>
            <span className={showAccountNumber ? classes.accountNumber : ''}>
              {accountNumberToDisplay}
            </span>
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
      </Grid>
      <Grid item xs={1} className={classes.tableCell}>
        <Typography
          styleType="p3"
          fontType="mediumFont"
          className={classes.unlink}
          onClick={() => setUnlinkId(account?.serviceDetails?.id || null)}
        >
          {linkedAccountsData?.unlink?.value}
        </Typography>
      </Grid>
    </Grid>
  )
}

export const LinkedAccountRowHeader = () => {
  const classes = useStyles()
  const linkedAccountsData = useAppData('linkedAccountsData', true)

  return (
    <Grid container className={classes.row}>
      <Grid item xs={4} className={classes.tableCell}>
        <Typography styleType="p2" fontType="boldFont">
          {linkedAccountsData?.serviceAddress?.value}
        </Typography>
      </Grid>
      <Grid item xs={3} className={classes.tableCell}>
        <Typography styleType="p2" fontType="boldFont">
          {linkedAccountsData?.name?.value}
        </Typography>
      </Grid>
      <Grid item xs={4} className={classes.tableCell}>
        <Typography styleType="p2" fontType="boldFont">
          {linkedAccountsData?.accountNumber?.value}
        </Typography>
      </Grid>
      <Grid item xs={1} className={classes.tableCell}>
        <Typography styleType="p2" fontType="boldFont">
          {linkedAccountsData?.actions?.value}
        </Typography>
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  row: {
    borderBottom: `1px solid ${colors.main.borderGrey}`,
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
  tableCell: {
    padding: 16,
  },
  unlink: {
    textDecoration: 'underline',
    '&:hover': {
      color: colors.main.brightRed,
      cursor: 'pointer',
    },
  },
  accountNumber: {
    minWidth: 210,
    [breakpoints.down('md')]: {
      minWidth: 'unset',
      maxWidth: 190,
    },
  },
}))
