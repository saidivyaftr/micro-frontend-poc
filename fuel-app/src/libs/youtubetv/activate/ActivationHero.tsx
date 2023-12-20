import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import {
  COMPONENT_WRAPPER,
  CTA_YTTV_GOOGLE_SIGN_IN,
  YTTV_REGISTRATION_PAGE,
} from 'src/constants'
import colors from 'src/styles/theme/colors'
import { signIn } from 'next-auth/react'
import { yttvCtaClickHandler } from '../shared/AnalyticsUtlis'
import router from 'next/router'
interface ActivationHerorops {
  activated?: boolean
  spaPageName?: string
}

const ActivationHero = ({ activated }: ActivationHerorops) => {
  const {
    heading,
    headingTwo,
    image,
    watchNowButton,
    yttvUrl,
    googleButton,
  }: any = useAppData('hero', true)

  const classes = useStyles({
    background: image?.src,
  })()

  const handleClicks = (ctaName: string) => {
    yttvCtaClickHandler(
      YTTV_REGISTRATION_PAGE.replace(
        '{NAME}',
        activated ? 'activated' : 'not-activated',
      ),
      'hero',
      ctaName,
    )
    if (ctaName === CTA_YTTV_GOOGLE_SIGN_IN) {
      signIn('google')
    } else {
      router.push(yttvUrl?.value)
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <div className={classes.mainContent}>
            {heading?.value && (
              <Typography
                tagType="h1"
                styleType="h2"
                fontType="boldFont"
                color="tertiary"
                className={classes.heading}
              >
                {activated ? headingTwo?.value : heading?.value}
              </Typography>
            )}
            <div className={classes.stripes}>
              <div className={classes.stripe}></div>
              <div className={classes.stripe}></div>
              <div className={classes.stripe}></div>
            </div>
          </div>
          {activated ? (
            <Button
              type="button"
              onClick={() => handleClicks(watchNowButton?.value)}
              href={yttvUrl?.value}
              hoverVariant="secondary"
              text={watchNowButton?.value}
              className={classes.compareButton}
            />
          ) : (
            <button
              className={classes.googleButton}
              onClick={() => handleClicks(CTA_YTTV_GOOGLE_SIGN_IN)}
            >
              <img src={googleButton?.src} alt={googleButton?.alt} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const useStyles = ({ background }: any) =>
  makeStyles(({ breakpoints }) => ({
    root: {
      backgroundColor: colors.main.midnightExpress,
      background: `url(${background})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '40vw',
      backgroundPosition: 'center right',
      backgroundOrigin: 'content-box',
      minHeight: '35rem',
      padding: `6rem 3.5rem`,
      [breakpoints.down('md')]: {
        padding: `3rem 1rem`,
        minHeight: '25rem',
        backgroundSize: '45vw',
      },
      [breakpoints.down('sm')]: {
        padding: `2rem 2rem`,
        minHeight: '55rem',
        backgroundSize: '90vw',
        backgroundPosition: 'center bottom',
      },
      [breakpoints.between(500, 'xs')]: {
        minHeight: '40rem !important',
      },
      [breakpoints.down('xs')]: {
        padding: `2rem 2rem`,
        minHeight: '35rem',
        backgroundSize: '80vw',
        backgroundPosition: 'center bottom',
      },
    },
    wrapper: {
      ...COMPONENT_WRAPPER,
      padding: 0,
    },
    heading: {
      textTransform: 'none',
      [breakpoints.down('xs')]: {
        fontSize: '2.25rem',
        lineHeight: '2.75rem',
      },
    },
    content: {
      [breakpoints.up('md')]: {
        width: '50%',
      },
    },
    mainContent: {
      position: 'relative',
      margin: '2rem 0',
      '& p': {
        maxWidth: '550px',
      },
      [breakpoints.down('md')]: {
        marginTop: `0rem`,
      },
    },
    stripes: {
      position: 'absolute',
      width: '100vw',
      height: '100%',
      right: 'calc(100% + 2rem)',
      top: '10px',
    },
    stripe: {
      backgroundColor: colors.main.brightRed,
      height: 'calc(33% - 28px)',
      '&:nth-of-type(2)': {
        margin: '1.9rem 0',
      },
    },
    compareButton: {
      width: 'unset',
      display: 'inline-block',
    },
    googleButton: {
      background: colors.main.white,
      border: `1px solid ${colors.main.white}`,
      borderRadius: '5rem',
      padding: 0,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '50px',
      width: '250px',
    },
  }))

export default ActivationHero
