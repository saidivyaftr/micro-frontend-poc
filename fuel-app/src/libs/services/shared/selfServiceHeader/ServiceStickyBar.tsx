import { useEffect, useState } from 'react'
import { Typography, Button } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import colors from '@/shared-ui/colors'
import clx from 'classnames'
import { COMPONENT_WRAPPER } from 'src/constants'
import { offerData } from '../types'
import useIsLoadingFromApp from '@/shared-ui/hooks/useIsLoadingFromApp'
import { formatUrl } from 'src/utils/urlHelpers'
import HeroCartIcon from '../HeroCartIcon'

interface PageProps {
  dashboard?: boolean
  cartStickyBarContent?: any
  showAddCartButton?: boolean
  addToCartHandler?: any
  pdpOfferData?: offerData
  showButtonLoading: boolean
  authToken?: string
  source?: string
}

const ServiceStickyBar = ({
  cartStickyBarContent,
  showAddCartButton,
  addToCartHandler,
  pdpOfferData,
  showButtonLoading,
}: PageProps) => {
  const classes = useStyles()
  const { AddToCartText, CheckoutText, addedToCart } = cartStickyBarContent

  const [show, setShow] = useState(false)
  const controlNavbar = () => {
    if (window.scrollY > 300) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar)
    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  }, [])
  const isFromMobileApp = useIsLoadingFromApp()

  return (
    <div
      className={clx({
        [classes.hidden]: !show,
        [classes.active]: show,
        [classes.stickyTop]: isFromMobileApp,
      })}
    >
      <div className={classes.stickyBar}>
        <div className={classes.stickyContent}>
          <div className={classes.container}>
            <div className={classes.featureGridWrapper}>
              <Typography
                className={classes.heroTitle}
                styleType="h4"
                tagType="h3"
                color="tertiary"
              >
                {pdpOfferData?.Description}
              </Typography>
              {showAddCartButton && (
                <div>
                  <Typography
                    className={clx(
                      classes.productSideText,
                      classes.productSideMoney,
                    )}
                    styleType="h3"
                    tagType="h3"
                    color="tertiary"
                  >
                    {`$${pdpOfferData?.Price}/mo.`}
                  </Typography>
                  {/* {subField?.value && (
                    <Typography
                      className={clx(
                        classes.productSideText,
                        classes.legalCopy,
                      )}
                      styleType="p1"
                      tagType="div"
                      color="tertiary"
                    >
                      {subField?.value}
                    </Typography>
                  )} */}
                </div>
              )}
              {!showAddCartButton && (
                <div className={classes.addedToCartContainer}>
                  <svg
                    className={classes.checkIcon}
                    id="checkmark-group"
                    viewBox="0 0 128 128"
                  >
                    <path
                      className={clx({
                        [classes.checkmark]: !showAddCartButton,
                      })}
                      id="checkmark"
                      d="M24.75 62l27.5 27.5 51-51"
                    />
                  </svg>
                  <Typography
                    className={clx(
                      classes.productSideText,
                      classes.productSideMoney,
                      {
                        [classes.btnPrimaryHidden]: showAddCartButton,
                        [classes.btnPrimaryVisible]: !showAddCartButton,
                      },
                    )}
                    styleType="h4"
                    tagType="h4"
                    color="tertiary"
                  >
                    {addedToCart?.value}
                  </Typography>
                </div>
              )}
              <div className={classes.btnWrapper}>
                <div className={classes.addToCartBtn}>
                  {showAddCartButton ? (
                    <Button
                      type="button"
                      text={AddToCartText?.value}
                      className={classes.btnPrimary}
                      hoverVariant="secondary"
                      onClick={addToCartHandler}
                      isBusy={showButtonLoading}
                    />
                  ) : (
                    <Button
                      type="link"
                      href={`${formatUrl('/services/cart')}${
                        window.location.search
                      }`}
                      text={CheckoutText?.value}
                      hoverVariant="secondary"
                      className={classes.btnPrimary}
                    />
                  )}
                </div>
                <HeroCartIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  stickyRoot: {
    ...COMPONENT_WRAPPER,
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },

  active: {
    top: 60,
    position: 'sticky',
    opacity: 1,
    transition: 'top 1s ease',
    zIndex: 99,
  },
  stickyTop: {
    top: 0,
  },
  hidden: {
    position: 'absolute',
    opacity: 0,
    top: -100,
    transition: 'top 0.5s ease',
  },
  stickyBar: {
    position: 'absolute',
    width: '100%',
    background: colors.main.blackBackground,
    paddingBottom: 32,
    paddingTop: 32,
    [theme.breakpoints.down('sm')]: {
      borderRadius: 0,
      paddingBottom: 8,
      paddingTop: 16,
    },
  },
  stickyContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'inherit',
    gap: 32,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: 5,
    },
  },
  container: {
    ...COMPONENT_WRAPPER,
    display: 'flex',
    width: '100%',
    paddingTop: 0,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
  },

  wrapper: {
    background: colors.main.dark,
  },

  featureGridWrapper: {
    display: 'inline-grid',
    gridTemplateColumns: '50% auto 22%',
    gridGap: 24,
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '44% auto auto',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '40% auto auto',
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
      gridGap: 1,
    },
  },
  heroTitle: {
    fontFamily: 'PP Object Sans bold',
    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
      lineHeight: '18px',
    },
  },
  productSideText: {
    fontFamily: 'PP Object Sans',
    justifyContent: 'end',
    textAlign: 'end',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.4rem',
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      textAlign: 'start',
      fontSize: 10,
    },
  },
  productSideMoney: {
    fontFamily: 'PP Object Sans bold',
    color: colors.main.greenishBlue,
    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
      lineHeight: '18px',
      textAlign: 'right',
    },
  },
  legalCopy: {
    [theme.breakpoints.down('xs')]: {
      lineHeight: '18px',
    },
  },
  btnPrimary: {
    fontSize: '1.125rem',
    textAlign: 'end',
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px',
      lineHeight: 18,
      width: '100%',
      textAlign: 'start',
      height: 38,
      margin: '8px auto 8px auto',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      gridColumn: '3/3',
    },
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1/3',
    },
  },
  hideText: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  '@keyframes fadeInLeft': {
    from: {
      opacity: 0,
      transform: 'translate3d(-50%, 0, 0)',
    },
    to: {
      opacity: 1,
      transform: 'none',
    },
  },
  btnPrimaryHidden: {
    opacity: 0,
    display: 'none',
  },
  btnPrimaryVisible: {
    animation: `$fadeInLeft 2s ${theme.transitions.easing.easeInOut}`,
  },
  '@keyframes checkmark-stroke': {
    from: {
      strokeDashoffset: 120,
      opacity: 1,
    },
    to: {
      strokeDashoffset: 1,
      opacity: 1,
    },
  },
  checkmark: {
    stroke: colors.main.greenishBlue,
    strokeWidth: 3,
    strokeDasharray: 120,
    animationDelay: '2s',
    animation: `$checkmark-stroke 1s forwards`,
    opacity: 0,
    fill: 'none',
  },
  checkIcon: {
    width: 48,
    height: 48,
    [theme.breakpoints.down('sm')]: {
      width: 30,
      height: 30,
    },
  },
  addedToCartContainer: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  /* Animation */
  check: {
    fontSize: 40,
    color: 'white',
    marginRight: 20,
  },
  '@keyframes drawCheck': {
    '100%': {
      strokeDashoffset: 0,
    },
  },
  addToCartBtn: {
    padding: 0,
  },
  cartIcon: {
    padding: 0,
  },
}))

export default ServiceStickyBar
