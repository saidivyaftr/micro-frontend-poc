import { makeStyles } from '@material-ui/core'
import { Hero } from '@/shared-ui/components'
import { CTA_BUTTON, SITE_INTERACTION } from 'src/constants'
import { useAppData } from 'src/hooks'
import { IFontColor } from '@/shared-ui/components/Hero/types'
import { PP_OBJECT_SANS_BOLD } from 'src/constants/fontFamilyNames'

const HeroSection = () => {
  const classes = useStyles()
  const data = useAppData('hero', true)

  const {
    title,
    description,
    button,
    toolTipText,
    legalText,
    legalTextColor,
    image,
    mobileImage,
  } = data

  if (!title?.value) {
    return null
  }

  return (
    <div data-testid="hero">
      <Hero
        backgroundColor="gravity"
        title1={title?.value}
        titleClass={classes.title}
        title1Color="tertiary"
        subHeader={description?.value}
        subHeaderColor="secondary"
        backgroundImage={image?.src}
        mobileBackgroundImage={mobileImage?.src}
        toolTipText={toolTipText?.value}
        leftContentClassName={classes.content}
        contentClassName={classes.rootContent}
        subtitleClass={classes.subHeading}
        primaryButton={{
          text: button?.text,
          type: 'link',
          href: button?.url,
          triggerEvent: true,
          eventObj: { events: 'event14', eVar14: CTA_BUTTON },
          interactionType: SITE_INTERACTION,
        }}
        legalText={legalText?.value || ''}
        legalTextColor={legalTextColor?.Color as IFontColor}
      />
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  subHeading: {
    maxWidth: 'unset',
    marginTop: '1rem',
  },
  content: {
    justifyContent: 'unset',
  },
  rootContent: {
    margin: ' 3.75rem auto',
    [breakpoints.down('sm')]: {
      margin: ' 1.125rem auto',
      padding: '0 2.8125rem 0 2.3125rem',
    },
  },
  title: {
    fontFamily: PP_OBJECT_SANS_BOLD,
    textTransform: 'unset',
  },
}))

export default HeroSection
