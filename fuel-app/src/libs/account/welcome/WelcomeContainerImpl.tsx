import { useWelcomePageData } from 'src/selector-hooks'
import { makeStyles } from '@material-ui/core'
import { COMPONENT_WRAPPER } from 'src/constants'
import PrepareForInstallationCard from './components/PrepareForInstallationCard'
import TrackOrdersCard from './components/TrackOrdersCard'
import YourInformationCard from './components/YourInformationCard'
import QuestionsAboutOrderCard from './components/QuestionsAboutOrderCard'
import OrderDetailsCard from './components/OrderDetailsCard'
import colors from '@/shared-ui/colors'
import { pageSubTitle } from './helper'
import WelcomePageModal from './components/WelcomePageModal'
import WelcomeHero from 'src/libs/account/welcome/components/WelcomeHero'
import useAppData from '@/shared-ui/hooks/useAppData'
import BillingSummary from './components/BillingSummary'
import FaqCard from './components/FaqCard'

export const WelcomeContainerImpl = () => {
  const classes = useStyles()
  const { unprovisionedServiceOrder, isCancelledOrder, isNoInstallationOrder } =
    useWelcomePageData()
  const { title, selfInstallSubTitle, techInstallSubTitle } =
    useAppData('WelcomeMessage', true) || {}

  const subTitle = pageSubTitle(
    selfInstallSubTitle?.value,
    techInstallSubTitle?.value,
    unprovisionedServiceOrder,
  )

  return (
    <div className={classes.welcomePageContainer}>
      <WelcomeHero title={title?.value} subTitle={subTitle} />
      <section className={classes.wrapper}>
        <div className={classes.root}>
          <div className={classes.layout}>
            <div className={classes.orderDetails}>
              <OrderDetailsCard />
            </div>
            <div className={classes.rightCol}>
              <BillingSummary />
              <YourInformationCard />
              {!isCancelledOrder && <QuestionsAboutOrderCard />}
            </div>
            {!isCancelledOrder && (
              <div className={classes.trackAndPrepare}>
                <PrepareForInstallationCard />
                <TrackOrdersCard />
              </div>
            )}
            {isNoInstallationOrder && <FaqCard />}
          </div>
        </div>
      </section>
      <WelcomePageModal />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    background: colors.main.dark,
  },
  root: {
    ...COMPONENT_WRAPPER,
    paddingBottom: '3rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  layout: {
    display: 'grid',
    gap: '1rem',
    [breakpoints.up('lg')]: {
      alignItems: 'flex-start',
      gridTemplateAreas: `"orderDetails rightCol" "trackAndPrepare rightCol" "trackAndPrepare rightCol"`,
      gridTemplateColumns: 'auto 316px',
    },
  },
  orderDetails: {
    [breakpoints.up('lg')]: {
      gridArea: 'orderDetails',
    },
  },
  trackAndPrepare: {
    maxWidth: '100%',
    display: 'grid',
    gap: '1rem',
    overflow: 'hidden',
    [breakpoints.up('lg')]: {
      gridArea: 'trackAndPrepare',
    },
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    [breakpoints.up('lg')]: {
      gridArea: 'rightCol',
    },
  },
  welcomePageContainer: {
    background: colors.main.dark,
    minHeight: 'calc(100vh - 195px)',
  },
}))
