import { makeStyles } from '@material-ui/core'
import { Hero, InjectHTML, Button } from '@/shared-ui/components'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { CTA_BUTTON, SITE_INTERACTION } from 'src/constants'
import { useAppData } from 'src/hooks'
const HeroSection = () => {
  const classes = useStyles()

  const { title, description, button, image, mobileImage } = useAppData(
    'hero',
    true,
  )
  const onButtonClick = () => {
    DTMClient.triggerEvent(
      { events: 'event14', eVar14: CTA_BUTTON },
      'tl_o',
      SITE_INTERACTION,
    )
  }
  return (
    <div>
      <Hero
        backgroundColor="black"
        backgroundImage={image?.src}
        mobileBackgroundImage={mobileImage?.src}
        className={classes.heroContainer}
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
                color="tertiary"
              />
            )}

            {description?.value && (
              <InjectHTML
                tagType="p"
                styleType="h5"
                className={classes.description}
                value={description?.value}
                color="tertiary"
              />
            )}
            {button?.text && button?.url && (
              <Button
                text={button?.text}
                type="link"
                href={button?.url}
                hoverVariant="secondary"
                className={classes.learnMoreBtn}
                variant="primary"
                onClick={onButtonClick}
              />
            )}
          </div>
        }
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  contentContainer: {
    [breakpoints.down('xs')]: { marginTop: '3rem' },
  },
  heroContent: {
    marginTop: '5.5rem',
    [breakpoints.down('sm')]: { marginTop: 'auto' },
  },
  heroContainer: {
    margin: 'auto',
    // [breakpoints.up('sm')]: {
    //   minHeight: 'min(42vw, 800px)',
    // },
  },
  title: { textTransform: 'none' },

  description: {
    marginTop: '1.5rem',
    [breakpoints.down('xs')]: {
      marginTop: '0.5rem',
      fontSize: '1.125rem',
      lineHeight: '1.625rem',
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
