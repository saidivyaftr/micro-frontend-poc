import AccountLayout from 'src/layouts/AccountLayout'
import { useEffect } from 'react'
import MainLayout from 'src/layouts/MainLayout'
import AccountHero from 'src/libs/account/shared/AccountHero'
import customStaticProps from 'src/utils/appData'
import { makeStyles } from '@material-ui/core'
import { useAccountPageLoadEvents } from 'src/hooks'
import colors from 'src/styles/theme/colors'
import { fetchAvailableBills } from 'src/redux/slicers/bills'
import { useActiveAccountId, useActiveAccount } from 'src/selector-hooks'
import { useDispatch } from 'react-redux'
import {
  AppRoutes,
  BILLING_COMPARE_STATEMENTS,
  COMPONENT_WRAPPER,
} from 'src/constants'
import {
  AutopayCard,
  PaperLessBillingCard,
  PayYourBillCard,
} from 'src/libs/account/my-billing/shared'
import { fetchAutopayDetails } from 'src/redux/slicers/payment'
import { hero } from 'src/libs/account/my-billing/compare-statements/sitecore-mock'
import { useBreadcrumbParser } from 'src/hooks'
import StatementsTile from 'src/libs/account/my-billing/compare-statements/StatementsTile'

interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function CompareStatements(props: PageProps): JSX.Element {
  const classes = useStyles()
  const dispatch = useDispatch()
  const activeAccountId = useActiveAccountId()
  useAccountPageLoadEvents(BILLING_COMPARE_STATEMENTS)

  useEffect(() => {
    if (activeAccountId) {
      dispatch(fetchAvailableBills(activeAccountId))
    }
  }, [activeAccountId])

  const isEnrolledInAutopay = (autopayType: string | boolean) =>
    !(autopayType === false || autopayType === 'false')

  const { data: activeAccount } = useActiveAccount()

  useEffect(() => {
    if (activeAccount.id && isEnrolledInAutopay(activeAccount.autopayType)) {
      dispatch(
        fetchAutopayDetails(
          activeAccount.id,
          activeAccount.autopayType as string,
        ),
      )
    }
  }, [activeAccount.id])

  const { title, breadcrumb } = hero
  const breadCrumbData = useBreadcrumbParser(breadcrumb)

  return (
    <MainLayout {...props}>
      <AccountLayout {...props}>
        <AccountHero
          title={title?.value}
          dashboard={false}
          breadcrumb={breadCrumbData}
        />
        <section className={classes.wrapper}>
          <main className={classes.container}>
            <div className={`${classes.column} ${classes.columnLeft}`}>
              <StatementsTile />
            </div>
            <div className={`${classes.column} ${classes.columnRight}`}>
              <PayYourBillCard />
              <AutopayCard />
              <PaperLessBillingCard />
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
    [breakpoints.down('xs')]: {
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
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}))

export default CompareStatements
