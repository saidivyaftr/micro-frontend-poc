import { useAppData } from 'src/hooks'
import { Button, Hero, InjectHTML, Typography } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { MessageIcon } from '@/shared-ui/react-icons/index'

const HeroSection = () => {
  const classes = useStyles()
  const {
    initialTitle,
    heading,
    priceDescription,
    priceAndFrequency,
    legalDisclaimer,
    bgImage,
    mobileBgImage,
    btnText,
    btnUrl,
  }: any = useAppData('HeroACP', true)
  const cohesionHandler = () => {
    const payload = {
      '@type': 'redventures.usertracking.v3.ElementClicked',
      webElement: {
        elementType: 'BUTTON',
        location: 'ACP',
        position: 'Module',
        htmlId: null,
        text: 'Chat Now',
      },
      actionOutcome: 'EXTERNALLINK',
      outboundUrl: null,
    }
    // @ts-ignore: Unreachable code error
    tagular('beam', payload, true, false)
  }
  return (
    <Hero
      backgroundColor="clarity"
      backgroundImage={bgImage?.src}
      mobileBackgroundImage={mobileBgImage.src}
      leftContentClassName={classes.leftContent}
      content={
        <div className={classes.content}>
          <div className={classes.mainContent}>
            {initialTitle?.value && (
              <Typography fontType="boldFont" styleType="p3">
                {initialTitle?.value}
              </Typography>
            )}
            {heading?.value && (
              <InjectHTML
                tagType="h1"
                styleType="h2"
                className={classes.heading}
                value={heading?.value}
                fontType="boldFont"
              />
            )}
            {priceDescription?.value && (
              <Typography tagType="p" styleType="h5">
                {priceDescription?.value}
              </Typography>
            )}
            {priceAndFrequency?.value && (
              <InjectHTML
                tagType="p"
                styleType="h1"
                fontType="boldFont"
                className={classes.priceAndFrequency}
                value={priceAndFrequency?.value}
              />
            )}
            {btnText?.value && (
              <Button
                type="link"
                target="_blank"
                hoverVariant="secondary"
                text={
                  <span className={classes.messageBtnText}>
                    <MessageIcon /> {btnText?.value}
                  </span>
                }
                href={btnUrl.value}
                className={classes.messageBtn}
                onClick={cohesionHandler}
              />
            )}
            {legalDisclaimer && (
              <InjectHTML
                styleType="legal"
                className={classes.legalDisclaimer}
                value={legalDisclaimer?.value}
              />
            )}
          </div>
        </div>
      }
    />
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  priceAndFrequency: {
    [breakpoints.up('sm')]: {
      marginTop: '0.5rem',
    },
    '& sub': {
      fontSize: '18px',
      position: 'relative',
      bottom: '16px',
      right: '20px',
      textTransform: 'none',
      [breakpoints.down('md')]: {
        bottom: '8px',
        right: '8px',
      },
    },
  },
  heading: {
    margin: '1rem 0',
    textTransform: 'none',
    [breakpoints.down('sm')]: {
      margin: '0.5rem 0',
    },
  },
  content: {
    [breakpoints.down('md')]: {
      margin: '1.75rem 0',
    },
  },
  legalDisclaimer: {
    marginTop: '0.5rem',
    '& a': {
      color: 'inherit',
    },
  },
  messageBtnText: { display: 'flex', justifyContent: 'center', gap: '1rem' },
  messageBtn: {
    textTransform: 'uppercase',
    width: 'fit-content',
    [breakpoints.down('sm')]: {
      padding: '0.625rem',
      width: '100%',
    },
  },
  mainContent: {
    position: 'relative',
    marginBottom: '2rem',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  leftContent: { maxWidth: 'unset' },
}))
export default HeroSection
