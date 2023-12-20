import { makeStyles } from '@material-ui/core'
import { Typography } from 'src/blitz'
import { COMPONENT_WRAPPER } from 'src/constants'
import colors from 'src/styles/theme/colors'
import { useProfileData, useWelcomePageData } from 'src/selector-hooks'
import cls from 'classnames'
import { WelcomePageAccountDropdown } from './WelcomePageAccountDropdown'
import useAppData from '@/shared-ui/hooks/useAppData'
const WelcomeHero = () => {
  const classes = useStyles()
  const profileData = useProfileData()
  const { isCancelledOrder, isTechInstallationOrder, isNoInstallationOrder } =
    useWelcomePageData()
  const { title, selfInstallSubTitle, techInstallSubTitle } =
    useAppData('WelcomeMessage', true) || {}
  return (
    <div className={classes.wrapper}>
      <div
        className={cls(classes.container, {
          [classes.fullHeight]: !(isCancelledOrder || isNoInstallationOrder),
        })}
      >
        <div className={classes.flex1}>
          <Typography
            testId="test-title"
            styleType="h1"
            tagType="h1"
            color="tertiary"
            className={classes.title}
          >
            {title.value}
          </Typography>
          <Typography
            testId="test-profileData"
            styleType="h1"
            tagType="h1"
            color="secondary"
            className={classes.title}
          >
            {profileData?.firstName || ''}
          </Typography>
          {!(isNoInstallationOrder || isCancelledOrder) && (
            <Typography
              testId="test-subTitle"
              styleType="h5"
              color="tertiary"
              className={classes.subTitle}
            >
              {isTechInstallationOrder
                ? techInstallSubTitle?.value
                : selfInstallSubTitle?.value}
            </Typography>
          )}
        </div>
        <div className={classes.welcomeDropdownContainer}>
          <WelcomePageAccountDropdown />
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    background: colors.main.dark,
  },
  container: {
    ...COMPONENT_WRAPPER,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    paddingTop: 100,
    paddingBottom: 100,
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'start',
      paddingTop: 50,
      paddingBottom: 50,
    },
  },
  fullHeight: {
    minHeight: '100%',
  },
  title: {
    fontSize: '30px',
    lineHeight: '38px',
    fontWeight: 400,
    [breakpoints.up('md')]: {
      fontSize: '3rem',
      lineHeight: '3.25rem',
    },
  },
  subTitle: {
    marginTop: 16,
  },
  flex1: {
    flex: '1',
    [breakpoints.down('xs')]: {
      flex: 'unset',
    },
  },
  welcomeDropdownContainer: {
    width: '350px',
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}))

export default WelcomeHero
