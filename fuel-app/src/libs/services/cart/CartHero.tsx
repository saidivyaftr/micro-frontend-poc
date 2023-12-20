import { makeStyles } from '@material-ui/core'
import { Breadcrumb, Typography } from 'src/blitz'
import { COMPONENT_WRAPPER } from 'src/constants'
import colors from 'src/styles/theme/colors'
import { useAppData } from 'src/hooks'
import { InjectHTML } from '@/shared-ui/components'
import { useCartDataContext } from '../CartContextProvider'

const CartHero = () => {
  const classes = useStyles()
  const { title, heroIcon } = useAppData('selfServiceHero', true)
  const productUrlMapping = {
    'whole-home-wifi': 'WWIFI',
    'eero-secure': 'FSWFI',
    'premium-tech-pro': 'RNPTP',
  }
  const previousUrl = Object.keys(productUrlMapping).filter(
    (productPath) => document.referrer.indexOf(productPath) > -1,
  )[0]
  const { cartDataFromSession } = useCartDataContext()
  const previousPageOfferData = cartDataFromSession?.Offers?.filter(
    // @ts-ignore
    (offer) => offer.ItemCode === productUrlMapping[previousUrl],
  )?.length
  const breadcrumbData = [
    {
      href: previousPageOfferData ? document.referrer : '/account/services',
      pageName: '< Back',
      useHistory: true,
    },
  ]
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.breadcrumbContainer}>
          <Breadcrumb variant="secondary" links={breadcrumbData} />
        </div>
        <div className={classes.leftPanel}>
          <span className={classes.titleContainer}>
            {heroIcon && (
              <InjectHTML
                value={heroIcon?.rendered}
                className={classes.heroIcon}
              />
            )}
            <Typography
              styleType="h1"
              tagType="h1"
              color="tertiary"
              fontType="regularFont"
              className={classes.heroTitleCase}
            >
              {title?.value}
            </Typography>
          </span>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    background: colors.main.dark,
    paddingTop: 0,
    paddingBottom: 116,
    [breakpoints.down('xs')]: {
      paddingBottom: 86,
    },
  },
  breadcrumbContainer: {
    ...COMPONENT_WRAPPER,
    position: 'absolute',
    top: '20px',
    padding: 0,
    '& a': {
      textDecoration: 'none',
      fontFamily: 'PP Object Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: 16,
      lineHeight: 24,
    },
  },
  container: {
    ...COMPONENT_WRAPPER,
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: '116px 16px 0 16px',
    position: 'relative',
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      padding: '86px 16px 0 16px',
      gap: '1rem',
    },
  },
  leftPanel: {
    margin: '0',
    alignItems: 'flex-start',
    [breakpoints.down('xs')]: {
      '&& h1': {
        fontSize: '1.875rem !important',
      },
    },
  },
  titleContainer: {
    display: 'flex',
    gap: 16,
    alignItems: 'center',
  },
  heroIcon: {
    '& svg': {
      width: 54,
      height: 56,
      [breakpoints.down('xs')]: {
        width: 30,
        height: 36,
      },
    },
  },
  heroTitleCase: {
    textTransform: 'none',
    fontFamily: 'PP Object Sans medium',
  },
}))

export default CartHero
