import { makeStyles } from '@material-ui/core'
import clx from 'classnames'
import { ArrowLink } from 'src/blitz'
import { CardWithTitle } from 'src/blitz/components/Card/Card'
import colors from 'src/styles/theme/colors'
import { useAppData } from 'src/hooks'
import { AppRoutes } from 'src/constants/appRoutes'
import {
  AutopayIcon,
  TicketStatus,
  FrontierMail,
  QuestionMarkIcon,
  BillIcon,
  WifiCrop,
  PaymentHistory,
} from 'src/blitz/assets/react-icons'

type MyQuickLinksProps = {
  className?: string
}

const MyQuickLinks = ({ className }: MyQuickLinksProps) => {
  const classes = useStyles()
  const myQuickLinksData = useAppData('MyQuickLinksData', true)
  const {
    headerLabel,
    helpCenterLabel,
    helpCenterUrl,
    OrderTicketStatus,
    OrderTicketStatusUrl,
    autoPayLabel,
    autoPayUrl,
    paymentHistory,
    paymentHistoryUrl,
    frontierEmailLabel,
    frontierEmailUrl,
    statementHistory,
    statementHistoryUrl,
    checkForOutages,
    checkForOutagesUrl,
  } = myQuickLinksData

  return (
    <CardWithTitle
      title={headerLabel?.value}
      size="square"
      className={clx(className, classes.quickLinksWrapper)}
      styleType="h6"
      tagType="div"
    >
      <div className={classes.content}>
        <div key={AppRoutes.HelpCenterQuickLink} className={classes.wrapper}>
          <ArrowLink
            icon={
              <QuestionMarkIcon
                color={colors.main.black}
                width={'24px'}
                height={'24px'}
                class={classes.quickLinksSvg}
              />
            }
            label={helpCenterLabel?.value}
            url={helpCenterUrl?.url}
            styleType="p2"
            fontType="boldFont"
            className={classes.link}
          />
        </div>
        <div key={AppRoutes.PaymentMethodsPage} className={classes.wrapper}>
          <ArrowLink
            icon={
              <AutopayIcon
                width={'24px'}
                height={'24px'}
                color={colors.main.black}
                class={classes.quickLinksSvg}
              />
            }
            label={autoPayLabel?.value}
            url={autoPayUrl?.url}
            styleType="p2"
            fontType="boldFont"
            className={classes.link}
          />
        </div>
        <div key={AppRoutes.OrderStatusQuickLink} className={classes.wrapper}>
          <ArrowLink
            icon={
              <TicketStatus
                width={'24px'}
                height={'24px'}
                color={colors.main.black}
                class={classes.quickLinksSvg}
              />
            }
            label={OrderTicketStatus?.value}
            url={OrderTicketStatusUrl?.url}
            styleType="p2"
            fontType="boldFont"
            className={classes.link}
          />
        </div>
        <div key={AppRoutes.checkForOutages} className={classes.wrapper}>
          <ArrowLink
            icon={
              <WifiCrop
                width={'24px'}
                height={'24px'}
                color={colors.main.black}
                class={classes.quickLinksSvg}
              />
            }
            label={checkForOutages?.value}
            url={checkForOutagesUrl?.url}
            styleType="p2"
            fontType="boldFont"
            className={classes.link}
          />
        </div>
        <div key={AppRoutes.BillingHistory} className={classes.wrapper}>
          <ArrowLink
            icon={
              <BillIcon
                width={'24px'}
                height={'24px'}
                color={colors.main.black}
                class={classes.quickLinksSvg}
              />
            }
            label={statementHistory?.value}
            url={statementHistoryUrl?.url}
            styleType="p2"
            fontType="boldFont"
            className={classes.link}
          />
        </div>
        <div key={AppRoutes.PaymentActivityPage} className={classes.wrapper}>
          <ArrowLink
            icon={
              <PaymentHistory
                width={'24px'}
                height={'24px'}
                color={colors.main.black}
                class={classes.quickLinksSvg}
              />
            }
            label={paymentHistory?.value}
            url={paymentHistoryUrl?.url}
            styleType="p2"
            fontType="boldFont"
            className={classes.link}
          />
        </div>
        <div key={AppRoutes.FrontierEmailQuickLink} className={classes.wrapper}>
          <ArrowLink
            icon={
              <FrontierMail
                width={'24px'}
                height={'24px'}
                color={colors.main.black}
                class={classes.quickLinksSvg}
              />
            }
            label={frontierEmailLabel?.value}
            url={frontierEmailUrl?.url}
            styleType="p2"
            fontType="boldFont"
            className={classes.link}
          />
        </div>
      </div>
    </CardWithTitle>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  content: {
    boxSizing: 'border-box',
    paddingTop: '2rem',
    padding: '0 .5rem',
    width: '100%',
  },
  wrapper: {
    borderTop: `1px solid ${colors.main.borderGrey}`,
  },
  link: {
    width: '100%',
    height: '100%',
    padding: '1rem 0',
  },
  quickLinksWrapper: {
    marginBottom: '1rem',
  },
  quickLinksSvg: {
    height: '1.5rem',
    width: '1.5rem',
    minWidth: '1.5rem',
    [breakpoints.down('xs')]: {
      height: '1.25rem',
      width: '1.25rem',
      minWidth: '1.25rem',
    },
  },
}))

export default MyQuickLinks
