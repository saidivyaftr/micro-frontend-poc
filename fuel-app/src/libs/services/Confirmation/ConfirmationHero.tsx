import { makeStyles } from '@material-ui/core'
import { Typography } from 'src/blitz'
import { COMPONENT_WRAPPER } from 'src/constants'
import colors from 'src/styles/theme/colors'
import { InjectHTML } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import BreadcrumbNav from 'src/libs/services/shared/BreadcrumbNav'

const ConfirmationHero = () => {
  const classes = useStyles()
  const { title, heroIcon, subTitle, subTitleIcon } =
    useAppData('selfServiceHero', true) || {}
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.breadcrumbContainer}>
          <BreadcrumbNav />
        </div>
        <div className={classes.leftPanel}>
          <div className={classes.titleContainer}>
            {heroIcon && <InjectHTML value={heroIcon?.rendered} />}
            <Typography
              styleType="h1"
              tagType="h1"
              color="tertiary"
              fontType="regularFont"
              className={classes.heroTitleCase}
            >
              {title?.value}
            </Typography>
          </div>
          <div className={classes.iconContainer}>
            <InjectHTML
              className={classes.tickIcon}
              value={subTitleIcon?.rendered}
            />
            <Typography
              styleType="h5"
              tagType="h5"
              color="tertiary"
              fontType="regularFont"
            >
              {subTitle?.value}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    background: colors.main.dark,
  },
  breadcrumbContainer: {
    ...COMPONENT_WRAPPER,
    position: 'absolute',
    top: '20px',
    padding: 0,
    '& a': {
      fontFamily: 'PP Object Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: 16,
      lineHeight: 24,
    },
    '& svg': {
      display: 'none',
    },
  },
  container: {
    ...COMPONENT_WRAPPER,
    padding: '5.75rem 1rem',
    position: 'relative',
    [breakpoints.down('xs')]: {
      padding: '4rem 1rem',
    },
  },
  leftPanel: {
    margin: '0',
    [breakpoints.down('xs')]: {
      '&& h1': {
        fontSize: '1.875rem !important',
      },
    },
  },
  titleContainer: {
    marginBottom: 16,
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    columnGap: 9,
  },
  tickIcon: {
    display: 'flex',
  },
  heroTitleCase: {
    textTransform: 'none',
  },
}))

export default ConfirmationHero
