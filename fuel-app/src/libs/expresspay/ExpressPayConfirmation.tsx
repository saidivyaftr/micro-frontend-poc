import { EXPRESS_PAY_PAYMENT_HEADING } from 'src/constants'
import { Button, Typography } from '@/shared-ui/components'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import Link from '@material-ui/core/Link'
import PrintIcon from '@material-ui/icons/Print'
import { makeStyles } from '@material-ui/core/styles'
import { PaymentConfirmationDetails } from './expresspayTypes'
import colors from '@/shared-ui/colors'
import { useAppData } from '../../hooks'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'

const ExpressPaymentConfirmation = ({
  paymentConfirmation,
}: {
  paymentConfirmation: PaymentConfirmationDetails
}) => {
  const classes = useStyles()

  const {
    title,
    subTitle,
    accountNumber,
    paymentAmount,
    paymentData,
    paymentMethod,
    confirmationCode,
    confirmationText,
    statusText,
    printLabel,
    promotionalQuestion,
    promotionalAnswer,
    learnMoreBtn,
  } = useAppData('expresspayConfirmation', true)

  return (
    <>
      <Typography tagType="h1" styleType="h3" className={classes.pageTitle}>
        {title?.value}
      </Typography>
      <Typography tagType="h2" styleType="h5">
        {subTitle?.value}
      </Typography>
      <div className={classes.paymentConfirmationContainer}>
        <div className={classes.confirmationHeading}>
          <CheckCircleIcon color="inherit" />
          <Typography tagType="h4" styleType="h5">
            {EXPRESS_PAY_PAYMENT_HEADING}
          </Typography>
        </div>
        <div className={classes.confirmationDetails}>
          <p>
            {accountNumber?.value}: {paymentConfirmation?.accountNumber}
          </p>
          <p>
            {paymentAmount?.value}: {paymentConfirmation?.paymentAmount}
          </p>
          <p>
            {paymentData?.value}: {paymentConfirmation?.paymentDate}
          </p>
          <p>
            {paymentMethod?.value}: {paymentConfirmation?.paymentMethod}
          </p>
          <p>
            {confirmationCode?.value}: {paymentConfirmation?.confirmationNumber}
          </p>
          <p style={{ marginTop: '1rem' }}>{confirmationText?.value}</p>
          <p style={{ marginTop: '1rem' }}>{statusText?.value}</p>
        </div>
        <div className={classes.printContainer}>
          <PrintIcon />
          <Link
            color="secondary"
            component="button"
            variant="body2"
            onClick={() => {
              window.print()
            }}
            className={classes.printLink}
          >
            {printLabel?.value}
          </Link>
        </div>
        <div className={classes.promotionalBannerWrapper}>
          <h3>{promotionalQuestion?.value}</h3>
          <div className={classes.promotionalBannerAction}>
            <p>{promotionalAnswer?.value}</p>
            <Button
              type="link"
              variant="primary"
              hoverVariant="primary"
              text={learnMoreBtn?.value}
              buttonSize="large"
              href={'/resources/autopay'}
            />
          </div>
        </div>
      </div>
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  pageTitle: {
    marginBottom: '1rem',
  },
  promotionalBannerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    margin: '0 -5rem',
    padding: '0 5rem',
    borderTop: `1px solid ${colors.main.grayBox}`,
    [breakpoints.down('md')]: {
      margin: 0,
      padding: 0,
    },
  },
  promotionalBannerAction: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'start',
    [breakpoints.down('md')]: {
      alignItems: 'center',
      flexDirection: 'column',
    },
  },
  printContainer: {
    margin: '1rem 0',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  printLink: {
    color: colors.main.dark,
  },
  confirmationDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: '3rem',
    '& p': {
      margin: '0.3rem',
    },
    [breakpoints.down('md')]: {
      marginLeft: 0,
    },
  },
  confirmationHeading: {
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex',
    marginBottom: '1rem',
    '& svg': {
      height: '2rem',
      width: '2em',
      color: 'green',
    },
  },
  paymentConfirmationContainer: {
    padding: '2rem 5rem',
    border: `1px solid ${colors.main.grayBox}`,
    maxWidth: '63rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1rem',
    fontFamily: PP_OBJECT_SANS,
    [breakpoints.down('md')]: {
      padding: '2rem 1rem 1rem 1rem',
      margin: '1rem .5rem',
    },
  },
}))

export default ExpressPaymentConfirmation
