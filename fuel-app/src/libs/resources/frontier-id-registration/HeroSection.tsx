import { makeStyles } from '@material-ui/core'
import { Hero } from '@/shared-ui/components'
import { CTA_BUTTON, SITE_INTERACTION } from 'src/constants'
import { PP_OBJECT_SANS_BOLD } from 'src/constants/fontFamilyNames'
import { useAppData } from 'src/hooks'

const HeroSection = () => {
  const classes = useStyles()
  const data = useAppData('hero', true)

  if (!data || Object.keys(data).length === 0) {
    return null
  }
  const {
    title,
    description,
    button,
    image,
    mobileImage,
    toolTipText,
    legalText,
  } = data

  return (
    <div>
      <Hero
        backgroundColor="black"
        backgroundImage={image?.src}
        mobileBackgroundImage={mobileImage?.src}
        contentClassName={classes.heroContent}
        leftContentClassName={classes.leftContent}
        legalText={legalText?.value}
        toolTipText={toolTipText?.value}
        isDarkMode={true}
        title1={title?.value}
        titleClass={classes.title}
        subHeader={description?.value}
        subtitleClass={classes.subtitle}
        primaryButton={{
          type: 'link',
          href: button?.url,
          text: button?.text,
          interactionType: SITE_INTERACTION,
          eventObj: { events: 'event14', eVar14: CTA_BUTTON },
          className: classes.learnMoreBtn,
          buttonSize: 'large',
        }}
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  heroContent: {
    marginTop: '5.5rem',
    [breakpoints.down('sm')]: { marginTop: 'auto', padding: '0px 38px' },
  },
  leftContent: {
    maxWidth: '51.25rem',
  },
  title: {
    marginTop: 0,
    textTransform: 'none',
    fontFamily: PP_OBJECT_SANS_BOLD,
    [breakpoints.down('xs')]: { marginTop: '1.5rem' },
  },
  subtitle: {
    [breakpoints.down('xs')]: { paddingBottom: 0, marginTop: '0.5rem' },
  },
  learnMoreBtn: {
    maxWidth: '17.1875rem',
    [breakpoints.down('xs')]: {
      maxWidth: 'unset',
    },
  },
}))

export default HeroSection
