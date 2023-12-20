import { Typography, Button } from 'src/blitz'
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import useAppData from '@/shared-ui/hooks/useAppData'

export const PeopleCard = ({
  uid,
  fullName,
  email,
  isPrimaryAccount,
  handleRemoveAccount,
}: {
  uid: string
  fullName: string
  email: string
  isPrimaryAccount: boolean
  handleRemoveAccount?: any
}) => {
  const classes = useStyles()
  const peopleCard = useAppData('peopleCard', true)

  const getInitials = () => {
    const words = (fullName || email).split(' ')
    let initials = ''
    for (const word of words) {
      initials += word.charAt(0).toUpperCase()
    }
    return initials
  }

  return (
    <div className={classes.card}>
      <div className={classes.profileIcon}>
        <Typography fontType="regularBandwidthFont" styleType="h5">
          {getInitials()}
        </Typography>
      </div>
      <div className={classes.details}>
        <Typography
          styleType="p2"
          fontType="boldFont"
          className={classes.title}
          color="tertiary"
        >
          {fullName}
        </Typography>
        <Typography styleType="p4" className={classes.email} color="tertiary">
          {email}
        </Typography>
        {isPrimaryAccount ? (
          <Typography
            className={classes.primaryAccountText}
            styleType="p3"
            color="tertiary"
          >
            {peopleCard?.primaryAccountOwner?.value}
          </Typography>
        ) : (
          <Button
            type="button"
            onClick={() => handleRemoveAccount(uid)}
            text={
              <Typography
                styleType="p3"
                color="tertiary"
                fontType="mediumFont"
                className={classes.removeBtnText}
              >
                {peopleCard?.remove?.value}
              </Typography>
            }
            className={classes.removeBtn}
            variant="lite"
          />
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    wordBreak: 'break-all',
    background: colors.main.dark,
    width: 272,
    minHeight: 232,
    borderRadius: 8,
    padding: '32px 16px',
    textAlign: 'center',
    [breakpoints.down('xs')]: {
      flexDirection: 'row',
      gap: 16,
      textAlign: 'left',
      width: '100%',
      padding: '16px 16px',
      minHeight: 116,
    },
  },
  title: {
    marginBottom: 4,
  },
  email: {
    marginBottom: 16,
    fontSize: 12,
    lineHeight: '14px',
  },
  profileIcon: {
    minHeight: 80,
    height: '80px !important',
    width: 80,
    minWidth: 80,
    backgroundColor: colors.main.greenishBlue,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    [breakpoints.down('xs')]: {
      marginBottom: 0,
    },
  },
  removeBtn: {
    textAlign: 'center',
    textDecoration: 'underline',
    height: 'auto',
    [breakpoints.down('xs')]: {
      textAlign: 'left',
    },
  },
  removeBtnText: {
    fontSize: 14,
    lineHeight: '18px',
    textDecoration: 'underline',
    transition: 'all 0.2s',
    '&:hover': {
      color: colors.main.brightRed,
    },
  },
  details: {
    flex: 1,
  },
  primaryAccountText: {
    fontSize: 14,
    lineHeight: '18px',
  },
}))
