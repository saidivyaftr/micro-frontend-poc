import { makeStyles } from '@material-ui/core'
import {
  AccountCards,
  MyServices,
  PromotionalCards,
  AddOnBanner,
} from 'src/libs/account/dashboard/index'
import { useVacationServicesInfo } from 'src/selector-hooks'
import MyQuickLinks from 'src/libs/account/dashboard/components/MyQuickLinks'
import { COMPONENT_WRAPPER } from 'src/constants'
import colors from 'src/styles/theme/colors'

export const DashboardContainer = () => {
  const classes = useStyles()
  const { data: vacationServicesInfo } = useVacationServicesInfo()

  return (
    <section className={classes.wrapper}>
      <div className={classes.dark}>
        <div className={classes.container}>
          <div className={classes.leftColumn}>
            <AccountCards />
            <div className={classes.mobileRightColumn}>
              <div>
                <MyQuickLinks />
              </div>
            </div>
            <MyServices />
            {!(vacationServicesInfo?.vacationStatus === 'On') && (
              <AddOnBanner />
            )}
            <PromotionalCards />
          </div>
          <div className={classes.rightColumn}>
            <MyQuickLinks />
          </div>
        </div>
      </div>
    </section>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    background: colors.main.dark,
  },
  container: {
    ...COMPONENT_WRAPPER,
    padding: 0,
    width: '100%',
    position: 'relative',
    display: 'flex',
    gap: 32,
    [breakpoints.down('sm')]: {
      gap: 0,
    },
  },
  dark: {
    background: colors.main.dark,
  },
  gray: {
    background: colors.main.grey,
  },
  leftColumn: {
    width: '100%',
  },
  rightColumn: {
    minWidth: '300px',
    width: '300px',
    position: 'sticky',
    height: '0%',
    top: 80,
    paddingBottom: 120,
    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  mobileRightColumn: {
    display: 'none',
    [breakpoints.down('sm')]: {
      display: 'block',
      paddingTop: '1rem',
      left: '0rem',
      width: '100%',
    },
  },
}))
