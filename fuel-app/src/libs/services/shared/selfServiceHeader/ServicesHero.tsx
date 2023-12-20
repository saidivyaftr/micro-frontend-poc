import clx from 'classnames'
import { makeStyles } from '@material-ui/core'
import { InjectHTML, Typography } from 'src/blitz'
import { COMPONENT_WRAPPER } from 'src/constants'
import colors from 'src/styles/theme/colors'
import { Button } from '@/shared-ui/components'
import BreadcrumbNav from 'src/libs/services/shared/BreadcrumbNav'
import { offerData } from '../types'
import AddExtenderModal from '../AddExtenderModal'
import HeroCartIcon from '../HeroCartIcon'

interface PageProps {
  dashboard?: boolean
  cartStickyBarContent?: any
  showAddCartButton?: boolean
  addToCartHandler?: any
  pdpOfferData?: offerData
  showButtonLoading: boolean
  productPriceSubText?: string
  pageCode: string
  openExtenderModal: boolean
  setOpenExtenderModal: React.Dispatch<React.SetStateAction<boolean>>
  sourceId: string
}

const ServicesHero = ({
  cartStickyBarContent,
  showAddCartButton,
  addToCartHandler,
  pdpOfferData,
  showButtonLoading,
  productPriceSubText,
  pageCode,
  openExtenderModal,
  setOpenExtenderModal,
  sourceId,
}: PageProps) => {
  const classes = useStyles()

  const { AddToCartText, CheckoutText, AddToCartLink, addedToCart } =
    cartStickyBarContent

  return (
    <div className={classes.wrapper}>
      <div className={classes.containerTop}>
        <div className={classes.breadcrumbWrapper}>
          <BreadcrumbNav />
        </div>
        <HeroCartIcon />
      </div>
      <div className={classes.container}>
        <div className={classes.featureGridWrapper}>
          <Typography
            className={
              pdpOfferData?.Description?.toLocaleLowerCase() === 'eero secure'
                ? ''
                : classes.heroTitle
            }
            styleType="h2"
            tagType="h1"
            color="tertiary"
          >
            {pdpOfferData?.Description}
          </Typography>
          {showAddCartButton && (
            <div>
              <Typography
                className={clx(
                  classes.productSideMoney,
                  classes.productSideText,
                )}
                styleType="h3"
                tagType="h3"
                color="tertiary"
              >
                {`$${pdpOfferData?.Price}/mo.`}
              </Typography>
              {productPriceSubText && (
                <InjectHTML
                  styleType="p2"
                  tagType="p"
                  color="tertiary"
                  className={classes.productSideText}
                  value={productPriceSubText}
                />
              )}
              {/* {subField?.value && (
                <Typography
                  className={classes.productSideText}
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
          <div className={classes.btnPrimary}>
            {showAddCartButton ? (
              <Button
                type="button"
                href={AddToCartLink?.value}
                text={AddToCartText?.value}
                className={clx(classes.btnPrimary)}
                hoverVariant="secondary"
                onClick={addToCartHandler}
                isBusy={showButtonLoading}
              />
            ) : (
              <Button
                type="link"
                href={`cart${window.location.search}`}
                text={CheckoutText?.value}
                hoverVariant="secondary"
                className={clx(classes.btnPrimary)}
              />
            )}
          </div>
        </div>
      </div>
      <AddExtenderModal
        itemCategory={pageCode}
        openExtenderModal={openExtenderModal}
        setOpenExtenderModal={setOpenExtenderModal}
        sourceId={sourceId}
        cartItemCount={0}
      />
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100vw',
    background: colors.main.dark,
    height: 'auto',
  },
  breadcrumbWrapper: {
    ...COMPONENT_WRAPPER,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 0,
    '& .active-link': {
      '&:hover': {
        color: colors.main.brightRed,
      },
    },
    '& a': {
      '&:hover': {
        color: colors.main.brightRed,
      },
    },
    [theme.breakpoints.up('sm')]: {
      ...COMPONENT_WRAPPER,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      paddingTop: 22,
      '& .active-link': {
        '&:hover': {
          color: colors.main.brightRed,
        },
      },
      '& a': {
        '&:hover': {
          color: colors.main.brightRed,
        },
      },
    },
  },
  container: {
    ...COMPONENT_WRAPPER,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: '1rem',
    paddingTop: 48,
    paddingBottom: 32,

    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      paddingTop: 164,
      paddingBottom: 107,
    },
    [theme.breakpoints.up('xs')]: {
      paddingTop: 90,
      paddingBottom: 80,
    },
  },
  featureGridWrapper: {
    gridTemplateColumns: 'auto',
    gridGap: 8,
    [theme.breakpoints.up('md')]: {
      display: 'inline-grid',
      gridTemplateColumns: 'auto auto 280px',
      gridColumnGap: 23,
      alignItems: 'center',
      width: '100%',
    },
    [theme.breakpoints.up('xs')]: {
      gridTemplateColumns: '46% 26% 1fr',
    },
  },
  heroTitle: {
    textTransform: 'capitalize',
  },

  productSideText: {
    textAlign: 'start',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'end',
    },
  },
  productSideMoney: {
    color: colors.main.greenishBlue,
  },
  btnPrimary: {
    width: '100%',
    textAlign: 'start',
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
    width: 38,
    height: 38,
    [theme.breakpoints.up('sm')]: {
      width: 48,
      height: 48,
    },
  },
  addedToCartContainer: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    [theme.breakpoints.up('xs')]: {
      justifyContent: 'flex-end',
    },
  },
  /* Animation */

  '@keyframes drawCheck': {
    '100%': {
      strokeDashoffset: 0,
    },
  },
  checkmarkSuccess: {
    width: 40,
    height: 40,
    stroke: colors.main.greenishBlue,
    strokeWidth: 2,
    strokeDasharray: 47,
    strokeDashoffset: 47,
    fill: 'none',
    animation: 'drawCheck 0.2s 0.7s forwards',
    marginTop: '-4px',
    marginRight: '-4px',
  },
  containerTop: {
    ...COMPONENT_WRAPPER,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: '1rem',

    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
  },
  cartIcon: {
    paddingTop: 22,
  },
}))

export default ServicesHero
