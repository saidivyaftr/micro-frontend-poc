import { useAppData } from 'src/hooks'
import { makeStyles } from '@material-ui/core'
import { CTA_BUTTON, SITE_INTERACTION } from 'src/constants'
import { Hero } from '@/shared-ui/components'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'
const HeroSection = () => {
  const classes = useStyles()
  const {
    title,
    description,
    image,
    mobileImage,
    button,
    toolTipText,
    legalText,
  } = useAppData('hero', true) || {}

  if (!title) {
    return null
  }

  return (
    <div>
      <Hero
        backgroundColor="black"
        title1={title?.value}
        title1Color="tertiary"
        subHeader={description?.value}
        backgroundImage={image?.src}
        mobileBackgroundImage={mobileImage?.src}
        toolTipText={toolTipText?.value}
        leftContentClassName={classes.content}
        contentClassName={classes.rootContent}
        subtitleClass={classes.description}
        primaryButton={{
          text: button?.text,
          type: 'link',
          href: button?.url,
          triggerEvent: true,
          eventObj: { events: 'event14', eVar14: CTA_BUTTON },
          interactionType: SITE_INTERACTION,
          className: `${classes.primaryButton}`,
        }}
        legalText={legalText?.value || ''}
        titleClass={classes.titleClass}
      />
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  description: {
    maxWidth: 'unset',
    marginTop: '1rem',
    fontFamily: PP_OBJECT_SANS,
    '& br': {
      [breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  },
  content: {
    marginTop: 40,
    justifyContent: 'unset',
    maxWidth: 'unset',
  },
  rootContent: {
    margin: ' 3.75rem auto',
    [breakpoints.down('sm')]: {
      margin: ' 1.125rem auto',
    },
  },
  titleClass: {
    fontFamily: PP_OBJECT_SANS,
    textTransform: 'initial',
  },
  primaryButton: {
    minWidth: '275px',
  },
}))

export default HeroSection
