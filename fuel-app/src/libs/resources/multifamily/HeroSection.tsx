import { makeStyles } from '@material-ui/core'
import router from 'next/router'
import { Hero, InjectHTML, Typography, Button } from '@/shared-ui/components'
import {
  SITE_INTERACTION,
  MULTIFAMILY_FORM,
  FORM_LEARN_MORE,
} from 'src/constants'
import { useAppData } from 'src/hooks'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
const HeroSection = () => {
  const classes = useStyles()

  const {
    firstTitle,
    secondTitle,
    thirdTitle,
    description,
    primaryButtonText,
    image,
    mobileImage,
  } = useAppData('heroBanner', true)

  const handleClick = () => {
    DTMClient.triggerEvent(
      {
        events: 'event14,event1',
        eVar14: FORM_LEARN_MORE,
        eVar2: MULTIFAMILY_FORM,
      },
      'tl_o',
      SITE_INTERACTION,
    )
    const targetElement = document.getElementById('multifamily-form')

    if (targetElement) {
      targetElement.focus()
      window.scrollTo({
        top: targetElement?.offsetTop - 64,
        behavior: 'smooth',
      })
    } else {
      router.push(`${window?.location?.href}#multifamily-form`)
    }
  }
  return (
    <Hero
      backgroundColor="clarity"
      backgroundImage={image?.src}
      mobileBackgroundImage={mobileImage?.src}
      content={
        <div className={classes.contentContainer}>
          {firstTitle?.value && (
            <Typography
              tagType="h1"
              styleType="h4"
              fontType="regularBandwidthFont"
              className={classes.firstTitle}
            >
              {firstTitle?.value}
            </Typography>
          )}
          {secondTitle?.value && (
            <InjectHTML
              tagType="h1"
              styleType="h1"
              value={secondTitle?.value}
            />
          )}
          {thirdTitle?.value && (
            <InjectHTML
              tagType="h1"
              styleType="h1"
              color="primary"
              value={thirdTitle?.value}
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
          {primaryButtonText?.value && (
            <Button
              text={primaryButtonText?.value}
              type="button"
              onClick={handleClick}
              className={classes.learnMoreBtn}
              variant="primary"
            />
          )}
        </div>
      }
    />
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  contentContainer: { [breakpoints.down('xs')]: { marginTop: '1.25rem' } },
  firstTitle: {
    [breakpoints.up('sm')]: { fontSize: '2.25rem', lineHeight: 1.6 },
  },
  description: {
    marginTop: '1rem',
    [breakpoints.down('xs')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      '& br': {
        display: 'none',
      },
      '& nobr': {
        display: 'inline',
        whiteSpace: 'break-spaces',
      },
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
