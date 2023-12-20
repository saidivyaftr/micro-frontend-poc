import { makeStyles } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Hero, InjectHTML, Button } from '@/shared-ui/components'
import { CTA_BUTTON, SITE_INTERACTION } from 'src/constants'
import { useAppData } from 'src/hooks'
const HeroSection = () => {
  const classes = useStyles()

  const {
    title,
    focusTitle,
    description,
    button,
    loggedInUserButton,
    image,
    mobileImage,
  } = useAppData('hero', true)
  const { loggedInState } = useSelector((state: any) => state?.session)
  const isLoggedIn = !!loggedInState
  return (
    <Hero
      backgroundColor="clarity"
      backgroundImage={image?.src}
      mobileBackgroundImage={mobileImage?.src}
      contentClassName={classes.heroContent}
      content={
        <div className={classes.contentContainer}>
          {title?.value && (
            <InjectHTML
              tagType="h1"
              styleType="h1"
              fontType="boldFont"
              className={classes.title}
              value={title?.value}
            />
          )}
          {focusTitle?.value && (
            <InjectHTML
              tagType="h1"
              styleType="h1"
              fontType="boldFont"
              value={` ${focusTitle?.value}`}
              className={classes.focusTitle}
              color="primary"
            />
          )}
          {description?.value && (
            <InjectHTML
              tagType="p"
              styleType="h5"
              className={classes.description}
              value={description?.value}
            />
          )}
          {button?.text && button?.url && (
            <Button
              text={button?.text}
              type="link"
              href={isLoggedIn ? loggedInUserButton?.url : button?.url}
              className={classes.learnMoreBtn}
              variant="primary"
              triggerEvent={true}
              eventObj={{ events: 'event14', eVar14: CTA_BUTTON }}
              interactionType={SITE_INTERACTION}
            />
          )}
        </div>
      }
    />
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  contentContainer: { [breakpoints.down('xs')]: { marginTop: '3rem' } },
  heroContent: {
    marginTop: '5.5rem',
    [breakpoints.down('sm')]: { marginTop: 'auto' },
  },
  title: { textTransform: 'none', display: 'contents' },
  focusTitle: { textTransform: 'none', display: 'contents' },
  description: {
    marginTop: '1.5rem',
    [breakpoints.down('xs')]: {
      marginTop: '0.5rem',
      fontSize: '1.125rem',
      lineHeight: '1.625rem',
      '& br': { display: 'none' },
    },
  },
  learnMoreBtn: {
    display: 'block',
    width: '17.5rem',
    marginTop: '2rem',
    [breakpoints.down('xs')]: {
      margin: 'auto',
      width: '100%',
      marginTop: '1rem',
    },
  },
}))

export default HeroSection
