import { makeStyles } from '@material-ui/core'
import { Typography } from 'src/blitz'
import colors from 'src/styles/theme/colors'
import { useAppData } from 'src/hooks'

const AccountInformation = ({
  serviceAddressValue,
  emailAddress,
}: {
  serviceAddressValue: string
  emailAddress: string
}) => {
  const classes = useStyles()
  const {
    title,
    serviceAddress,
    paymentMethod,
    emailLabel,
    paymentMethodValue,
  } = useAppData('confirmationPageAccountInfo', true) || {}

  return (
    <>
      <div className={classes.accountInfoWrapper}>
        <Typography styleType="h5" tagType="h5" className={classes.labelMargin}>
          {title?.value}
        </Typography>
        <hr className={classes.margin32} />
        <div className={classes.space20}>
          <div className={classes.grid}>
            <Typography styleType="h6" tagType="label">
              {serviceAddress?.value}
            </Typography>
            <div>
              <Typography styleType="p1" tagType="span">
                {serviceAddressValue}
              </Typography>
            </div>
          </div>
        </div>
        <div className={classes.space20}>
          <div className={classes.grid}>
            <Typography
              styleType="h6"
              tagType="label"
              className={classes.labelMargin}
            >
              {emailLabel?.value}
            </Typography>
            <div>
              <Typography
                styleType="p1"
                tagType="span"
                className={classes.emailText}
              >
                {emailAddress}
              </Typography>
            </div>
          </div>
        </div>
        <div className={classes.space20}>
          <div className={classes.grid}>
            <Typography
              styleType="h6"
              tagType="label"
              className={classes.labelMargin}
            >
              {paymentMethod?.value}
            </Typography>
            <div>
              <Typography styleType="p1" tagType="span">
                {paymentMethodValue?.value}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  accountInfoWrapper: {
    backgroundColor: colors.main.white,
    borderRadius: '1rem',
    padding: '2.5rem 1rem',
    [breakpoints.down('md')]: {
      padding: '2.5rem 1rem',
    },
    [breakpoints.down('sm')]: {
      padding: '2.5rem 1rem',
    },
    [breakpoints.down('xs')]: {
      padding: '1.5rem 1rem',
    },
  },
  grid: {
    display: 'block',
    alignItems: 'center',
    gap: 42,
    justifyContent: 'space-between',
    [breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  space20: {
    margin: '20px 0',
  },
  margin32: {
    margin: '32px 0px',
    [breakpoints.down('xs')]: {
      margin: '24px 0 16px 0px',
    },
  },
  labelMargin: {
    [breakpoints.down('xs')]: {
      display: 'block',
      marginBottom: 8,
    },
  },
  emailText: {
    wordBreak: 'break-word',
  },
}))

export default AccountInformation
