import AccountLayout from 'src/layouts/AccountLayout'
import MainLayout from 'src/layouts/MainLayout'
import AccountHero from 'src/libs/account/shared/AccountHero'
import customStaticProps from 'src/utils/appData'
import { makeStyles } from '@material-ui/core'
import { CurrentBalanceCard } from 'src/libs/account/my-billing/balance'
import { BillingTile } from 'src/libs/account/my-billing'
import { useAccountPageLoadEvents, useBreadcrumbParser } from 'src/hooks'
import colors from 'src/styles/theme/colors'
import { useAppData } from 'src/hooks'
import { BILLING_PAGE, COMPONENT_WRAPPER } from 'src/constants'
import { AppRoutes } from 'src/constants/appRoutes'
import { StatementCard } from 'src/libs/account/my-billing/statement/StatementCard'
import {
  AutopayCard,
  PaperLessBillingCard,
  PaymentMethodsCard,
} from 'src/libs/account/my-billing/shared'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  fetchAutopayDetails,
  fetchPaymentMethods,
} from 'src/redux/slicers/payment'
import { useActiveAccount } from 'src/selector-hooks'
import { fetchAvailableBills, fetchCurrentBill } from 'src/redux/slicers/bills'
interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function BillingPage(props: PageProps): JSX.Element {
  const classes = useStyles()
  const hero = useAppData('heroBannerSitecore', true)
  const { data: activeAccount } = useActiveAccount()
  const dispatch = useDispatch()
  const breadCrumbData = useBreadcrumbParser(hero?.breadcrumb?.targetItems)
  useAccountPageLoadEvents(BILLING_PAGE)
  useEffect(() => {
    const activeAccountId = activeAccount?.id
    if (activeAccountId) {
      dispatch(fetchAvailableBills(activeAccountId))
      dispatch(fetchCurrentBill(activeAccountId))
      dispatch(fetchPaymentMethods(activeAccountId))
    }
    if (activeAccountId && isEnrolledInAutopay(activeAccount?.autopayType)) {
      dispatch(
        fetchAutopayDetails(
          activeAccountId,
          activeAccount.autopayType as string,
        ),
      )
    }
  }, [activeAccount?.id])

  return (
    <MainLayout {...props}>
      <AccountLayout {...props}>
        <AccountHero
          title={hero?.title?.value}
          breadcrumb={breadCrumbData}
          dashboard={false}
          showAccountsDropdown
        />
        <section className={classes.wrapper}>
          <main className={classes.container}>
            <div className={`${classes.column} ${classes.columnLeft}`}>
              <CurrentBalanceCard />
              <BillingTile />
              <StatementCard />
            </div>
            <div className={`${classes.column} ${classes.columnRight}`}>
              <AutopayCard />
              <PaperLessBillingCard />
              <PaymentMethodsCard />
            </div>
          </main>
        </section>
      </AccountLayout>
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps(AppRoutes.BillingPage)

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    width: '100vw',
    background: `linear-gradient(to bottom, ${colors.main.dark} 0%, ${colors.main.dark} 60px, ${colors.main.newBackgroundGray} 60px)`,
    [breakpoints.down('sm')]: {
      paddingBottom: '5rem',
    },
  },
  container: {
    ...COMPONENT_WRAPPER,
    display: 'flex',
    width: '100%',
    gap: '1rem',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  columnLeft: {
    flexGrow: 1,
  },
  columnRight: {
    flexShrink: 0,
    width: '19.75rem',
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}))

const isEnrolledInAutopay = (autopayType: string | boolean) =>
  !(autopayType === false || autopayType === 'false')

export default BillingPage
