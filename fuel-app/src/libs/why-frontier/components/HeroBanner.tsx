import { makeStyles } from '@material-ui/core'
import { useRouter } from 'next/router'
import { Button, Hero, InjectHTML } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import { ZOOMED_OUT_MAX_WIDTH } from 'src/constants'
import colors from '@/shared-ui/colors'
import { IFontColor } from '@/shared-ui/components/Hero/types'
const HeroBanner: React.FC = () => {
  const {
    firstTitle,
    thirdTitle,
    description,
    primaryButtonText,
    image,
    mobileImage,
    legalTextColor,
    legalText,
  } = useAppData('heroBanner', true)
  const classes = useStyles()
  const router = useRouter()

  const handleClick = () => {
    const targetElement = document.getElementById('more')
    if (targetElement) {
      targetElement.focus()
      window.scrollTo({
        top: targetElement?.offsetTop + 20,
        behavior: 'smooth',
      })
    } else {
      router.push(`${window?.location?.href}#more`)
    }
  }

  return (
    <div className={classes.root}>
      <Hero
        backgroundColor="gravity"
        backgroundImage={image?.src}
        className={classes.heroContainer}
        mobileBackgroundImage={mobileImage?.src}
        leftContentClassName={classes.leftContentClassName}
        content={
          <>
            {firstTitle?.value && (
              <div className={classes.firstTitle}>
                <InjectHTML
                  tagType="h1"
                  styleType="h1"
                  color="tertiary"
                  className={classes.headingTitle}
                  value={firstTitle?.value}
                />
              </div>
            )}
            {thirdTitle?.value && (
              <InjectHTML
                tagType="h1"
                styleType="h1"
                color="tertiary"
                className={classes.headingTitle}
                value={thirdTitle?.value}
              />
            )}
            {description?.value && (
              <InjectHTML
                styleType="p1"
                color="tertiary"
                className={classes.description}
                fontType="boldFont"
                value={description?.value}
              />
            )}
            {primaryButtonText?.value && (
              <Button
                text={primaryButtonText?.value}
                type="button"
                onClick={handleClick}
                className={classes.watchVideoBtn}
                variant="primary"
                hoverVariant="secondary"
              />
            )}
          </>
        }
        legalText={legalText?.value || ''}
        legalTextColor={legalTextColor?.Color as IFontColor}
        legalStyleType={'p3'}
      />
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  root: { background: colors.main.offBlack4 },
  heroContainer: {
    maxWidth: ZOOMED_OUT_MAX_WIDTH,
  },
  firstTitle: {
    display: 'flex',
    gap: 16,
  },
  headingTitle: {
    marginBottom: '0px',
    [breakpoints.up('sm')]: {
      '& br': {
        display: 'none',
      },
    },
  },
  watchVideoBtn: {
    marginTop: 32,
    maxWidth: 300,
  },
  description: {
    maxWidth: '31.875rem',
    marginTop: 24,
  },
  leftContentClassName: {
    maxWidth: 700,
    [breakpoints.down('xs')]: {
      maxWidth: '100%',
      marginTop: '3rem',
    },
  },
}))

export default HeroBanner
