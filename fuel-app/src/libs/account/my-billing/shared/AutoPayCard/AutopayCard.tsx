import { makeStyles } from '@material-ui/core'
import moment from 'moment'
import { useRouter } from 'next/router'
import { ArrowLink, Button, Skeleton, Typography } from 'src/blitz'
import AutopayEnrollIcon from 'src/blitz/assets/react-icons/autopay-enroll-icon'
import { CardWithTitle } from 'src/blitz/components/Card/Card'
import { AppRoutes } from 'src/constants/appRoutes'
import ErrorMessage from 'src/libs/account/shared/ErrorMessage'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import {
  AutoPayText,
  AutoPayEnrolledText,
  EnrollInAutoPay,
  EnrollAutoPay,
  ManageAutoPay,
  NextPayment,
  HeresPerkForYou,
  AutoPayTextOff,
  AutoPayEnrolledTitle,
  PaymentMethod,
  SomethingWentWrong,
} from 'src/constants/billing'
import {
  useActiveAccount,
  usePaymentMethods,
  useAutopayDetails,
  useAccountList,
} from 'src/selector-hooks'
import colors from 'src/styles/theme/colors'
import { pick } from 'src/utils/appData/dataExtractor'
import mockData from '../../mockData'
import { useAppData } from '@/shared-ui/hooks/index'

const AutopayCard: React.FC = () => {
  const classes = useStyles()
  const { isLoading: isAccountsLoading } = useAccountList()
  const {
    isLoading: accountLoading,
    data: activeAccount,
    error: accountError,
  } = useActiveAccount()
  const {
    isLoading: paymentMethodsLoading,
    data: paymentMethodsData,
    error: paymentMethodsError,
  } = usePaymentMethods()
  const {
    isLoading: autopayLoading,
    data: autopayData,
    error: autopayError,
  } = useAutopayDetails()
  const autoPayCardData = useAppData('autoPayCard')

  const billingConstantsMock = mockData.billing
  const billingConstants =
    Object.keys(autoPayCardData?.fields?.data?.datasource || {})?.length > 0
      ? autoPayCardData
      : billingConstantsMock

  const router = useRouter()

  const isEnrolledInAutopay = (autopayType: string | boolean) =>
    !(autopayType === false || autopayType === 'false')

  const isLoading =
    isAccountsLoading ||
    accountLoading ||
    autopayLoading ||
    paymentMethodsLoading
  const hasError = accountError || autopayError || paymentMethodsError

  const isAutoPayOn = isEnrolledInAutopay(activeAccount.autopayType)

  const renderAutopayEnrollDetails = () => {
    const paymentMethod =
      typeof autopayData[0].paymentMethod === 'object'
        ? autopayData[0].paymentMethod.name
        : autopayData[0].paymentMethod
    const defaultMethod = paymentMethodsData.paymentMethods?.find(
      (pm) => pm.default,
    )
    return (
      <>
        <Typography
          tagType="h6"
          styleType="p2"
          fontType="boldFont"
          className={classes.autoPayEnrolledTitle}
        >
          {pick(AutoPayEnrolledTitle, billingConstants)}
        </Typography>
        <Typography
          styleType="p2"
          className={classes.autoPayEnrolledMessage}
          testId="autopay-enrolled-text"
        >
          {pick(AutoPayEnrolledText, billingConstants)}
        </Typography>
        <Typography
          styleType="p2"
          fontType="boldFont"
          className={classes.autoPayEnrolledTitle}
        >
          {pick(PaymentMethod, billingConstants)}
        </Typography>
        <div>
          <div>
            <div className={classes.accountNumberCtr} title={paymentMethod}>
              <Typography testId="autopay-payment-method">
                {`${defaultMethod?.subtype} ****${defaultMethod?.accountNumberEndsWith}`}
              </Typography>
            </div>
          </div>
          <Typography
            styleType="p2"
            fontType="boldFont"
            testId="autopay-next-payment"
            className={classes.autoPayEnrolledTitle}
          >
            {pick(NextPayment, billingConstants)}
          </Typography>
          <Typography styleType="p2" testId="autopay-payment-date">
            {moment(activeAccount.bill?.currentBalance?.dueDate).format('ll')}
          </Typography>
        </div>
        <ArrowLink
          dataTestId="manage-payment-methods"
          label={pick(ManageAutoPay, billingConstants)}
          url={AppRoutes.PaymentMethodsPage}
          styleType="p2"
          tagType="h6"
          wrapperClassName={classes.linkCtr}
          className={classes.link}
          fontType="boldFont"
          dtmMessage={`my account:manage auto pay click`}
        />
      </>
    )
  }

  const renderAutopayNonEnrollDetails = () => {
    return (
      <div data-testid="non-enroll-ctr">
        <div className={classes.perkContainer}>
          <div className={classes.iconCtr}>
            <AutopayEnrollIcon />
          </div>
          <div className={classes.perkMessageCtr}>
            <Typography
              tagType="h6"
              styleType="p2"
              fontType="boldFont"
              testId="perk-message-title"
            >
              {pick(HeresPerkForYou, billingConstants)}
            </Typography>
            <Typography styleType="p2" testId="perk-message">
              {pick(EnrollInAutoPay, billingConstants)}
            </Typography>
          </div>
        </div>
        <Button
          type="button"
          className={classes.btn}
          onClick={() => {
            const SETUP_AUTOPAY = `my account:setup auto pay click`
            DTMClient.triggerEvent(
              {
                events: 'event14',
                eVar14: SETUP_AUTOPAY,
              },
              'tl_o',
              SETUP_AUTOPAY,
            )
            router.push({
              pathname: AppRoutes.PaymentMethodsPage,
              query: router.query,
            })
          }}
          variant="secondary"
          text={pick(EnrollAutoPay, billingConstants)}
        />
      </div>
    )
  }

  const cardTitle = isLoading
    ? ''
    : pick(isAutoPayOn ? AutoPayText : AutoPayTextOff, billingConstants)

  return (
    <CardWithTitle
      title={cardTitle}
      size="big-rectangle"
      styleType="h5"
      tagType="h5"
      dataTestId="autopay-card"
    >
      {isLoading ? (
        <>
          <Skeleton height={30} width={200} />
          <Skeleton height={30} width={150} />
        </>
      ) : hasError ? (
        <ErrorMessage
          data-testid="autopay-card-error"
          message={pick(SomethingWentWrong, billingConstants)}
        />
      ) : (
        <div data-testid="autopay-card-ctr" className={classes.container}>
          {isAutoPayOn && autopayData?.length > 0
            ? renderAutopayEnrollDetails()
            : renderAutopayNonEnrollDetails()}
        </div>
      )}
    </CardWithTitle>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  autoPayEnrolledTitle: {
    margin: 0,
    marginBottom: '.5rem',
  },
  ySpacing: {
    paddingBottom: '1rem',
  },
  container: {
    marginTop: '1rem',
    [breakpoints.down('xs')]: {
      marginTop: '0.5rem',
    },
  },
  twoColumn: {
    gridTemplateColumns: '1fr 7rem',
  },
  accountNumberCtr: {
    marginBottom: '1rem',
  },
  linkCtr: {
    justifyContent: 'unset',
  },
  autoPayEnrolledMessage: {
    marginBottom: '1rem',
  },
  link: {
    padding: '1rem 0',
    margin: 0,
  },
  perkContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 0.5rem',
    gap: '0.5rem',
    background: colors.main.secondaryLight,
    borderRadius: '1rem',
    marginBottom: '1rem',
  },
  iconCtr: {
    width: '2.5rem',
    height: '2.5rem',
    marginRight: '0.5rem',
  },
  perkMessageCtr: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    '& h6': {
      margin: 0,
      [breakpoints.down('sm')]: {
        lineHeight: '1.125rem',
      },
    },
  },
  btn: {
    padding: '0.75rem 2rem',
  },
}))
export default AutopayCard
