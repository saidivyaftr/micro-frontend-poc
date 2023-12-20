import { makeStyles } from '@material-ui/core'
import { Typography, InjectHTML, Button } from '@/shared-ui/components'
import {
  COMPONENT_WRAPPER,
  OFFER_DIRECTV_PAGE,
  SITE_INTERACTION,
} from 'src/constants'
import useAppData from '@/shared-ui/hooks/useAppData'
import {
  PP_OBJECT_SANS,
  PP_OBJECT_SANS_MEDIUM,
} from 'src/constants/fontFamilyNames'
import colors from 'src/styles/theme/colors'
const Hero = () => {
  const classes = useStyles()
  const {
    description,
    logoUrl,
    getDirectv,
    price,
    taxandPriceDescription,
    orderNowCta,
    orderNowUrl,
  } = useAppData('hero', true)
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.leftCol}>
          <img className={classes.img} src={logoUrl?.src} alt={logoUrl?.alt} />
          <Typography
            tagType="h1"
            styleType="h4"
            color="default"
            fontType="regularFont"
            className={classes.description}
          >
            {description?.value}
          </Typography>
        </div>
        <div className={classes.rightCol}>
          <InjectHTML
            className={classes.getDirectv}
            styleType="p3"
            value={getDirectv?.value}
          />
          <InjectHTML
            className={classes.price}
            styleType="h1"
            value={price?.value}
          />
          <InjectHTML
            styleType="p3"
            className={classes.taxandPriceDescription}
            value={taxandPriceDescription?.value}
          />
          <Button
            className={classes.btn}
            type="link"
            variant="primary"
            hoverVariant="primary"
            href={orderNowUrl?.value}
            text={orderNowCta?.value}
            target="_blank"
            triggerEvent={true}
            interactionType={SITE_INTERACTION}
            eventObj={{
              events: 'event14',
              eVar14: `${OFFER_DIRECTV_PAGE}:hero-${orderNowCta?.value
                ?.toLowerCase()
                ?.replace(' ', '-')}`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: colors.main.grey,
    padding: '4rem 1rem',
    width: '100%',
  },
  btn: {
    marginTop: '2rem',
    borderRadius: '.25rem',
    fontSize: '22px',
    padding: '1rem 2rem',
    width: '100%',
    maxWidth: '360px',
    height: 'auto',
    [breakpoints.down('xs')]: {
      maxWidth: '100%',
    },
  },
  taxandPriceDescription: {
    textAlign: 'center',
    maxWidth: '350px',
    [breakpoints.down('xs')]: {
      maxWidth: '100%',
    },
  },
  price: {
    fontSize: '6rem',
    lineHeight: '6rem',
    '& sup': {
      fontSize: '50%',
    },
    '& sub': {
      fontSize: '30%',
      lineHeight: '2rem',
      position: 'relative',
      top: '-20px',
      fontFamily: PP_OBJECT_SANS,
      textTransform: 'none',
    },
    fontFamily: PP_OBJECT_SANS_MEDIUM,
  },
  getDirectv: {
    '& sup': {
      fontSize: '50%',
    },
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    [breakpoints.down('xs')]: {
      gridTemplateColumns: '100%',
    },
  },
  leftCol: {},
  img: {
    maxWidth: 360,
    [breakpoints.down('xs')]: {
      maxWidth: '90%',
    },
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [breakpoints.down('xs')]: {
      marginTop: 20,
    },
  },
  description: {
    maxWidth: 508,
    marginTop: 20,
    marginBottom: 10,
    [breakpoints.down('xs')]: {
      maxWidth: '100%',
    },
  },
}))

export default Hero
