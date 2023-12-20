import { useAppData, useChatState } from 'src/hooks'
import { makeStyles } from '@material-ui/core'
import { CTA_BUTTON, SITE_INTERACTION } from 'src/constants'
import { Hero } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { IShopComponents } from './types'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
const CDN_URL = process.env.CDN_URL
const HeroSection = ({ styles }: IShopComponents) => {
  const classes = useStyles()
  const router = useRouter()
  const {
    heading,
    headingColor,
    heading2,
    heading2Color,
    preHeaderTitle,
    subHeading,
    signUpButtonText,
    signUpButtonHref,
    learnMoreButtonText,
    learnMoreButtonHref,
    subHeadingColor,
    image,
    mobileImage,
    toolTipText,
    legalText,
    legalTextColor,
    learnMoreButtonVariant,
    signUpButtonVariant,
    signUpButtonBorder,
    learnMoreButtonBorder,
    stripesHeight,
    stripesMarginBottom,
    stripeColor,
    removeStripes,
    signUpButtonType,
    learnMoreButtonType,
    legalStyleType,
  } = useAppData('heroImage', true)
  const { setChatState } = useChatState()
  const [desktopImage, setDesktopImage] = useState('')
  const [mobileHeroImage, setMobileImage] = useState('')
  useEffect(() => {
    const path = router.asPath
    if (path === '/shop/internet/fiber-internet/5-gig') {
      setDesktopImage(
        `${CDN_URL}/cdn_images/5-gig/updated/fiber-5-gig-q4-refresh-desktop.png`,
      )
      setMobileImage(
        `${CDN_URL}/cdn_images/5-gig/updated/fiber-5-gig-q4-refresh-mobile.png`,
      )
    } else {
      setDesktopImage(image?.src)
      setMobileImage(mobileImage?.src)
    }
  }, [router])
  if (!heading) {
    return null
  }

  return (
    <div className={classes.root} style={styles}>
      <Hero
        backgroundColor="black"
        title1={heading?.value}
        title1Color={headingColor?.Color?.field?.value || 'secondary'}
        title2={heading2?.value || ''}
        title2Color={heading2Color?.Color?.field?.value || 'secondary'}
        subHeader={subHeading?.value}
        subHeaderColor={subHeadingColor?.Color?.field?.value}
        backgroundImage={desktopImage}
        mobileBackgroundImage={mobileHeroImage}
        toolTipText={toolTipText?.value}
        leftContentClassName={classes.content}
        contentClassName={classes.rootContent}
        subtitleClass={classes.subHeading}
        removeStripes={removeStripes?.value}
        preHeaderTitle={preHeaderTitle?.value}
        stripeColor={stripeColor?.Color?.field?.value || 'primary'}
        stripeStyles={{
          ...(stripesHeight?.value && {
            height: stripesHeight?.value,
          }),
          ...(stripesMarginBottom?.value && {
            marginBottom: stripesMarginBottom?.value,
          }),
        }}
        primaryButton={{
          text: signUpButtonText?.value,
          type: signUpButtonHref?.url ? 'link' : 'button',
          href: signUpButtonHref?.url,
          triggerEvent: true,
          callLink: signUpButtonType?.targetItem?.buttonType?.value === 'phone',
          eventObj: { events: 'event14', eVar14: CTA_BUTTON },
          interactionType: SITE_INTERACTION,
          className: Boolean(signUpButtonBorder?.value)
            ? classes.borderButton
            : classes.primaryBtn,
          variant: signUpButtonVariant?.targetItem?.type?.value || 'primary',
          onClick: () => {
            if (signUpButtonType?.targetItem?.buttonType?.value === 'chat') {
              setChatState(true)
            }
          },
        }}
        secondaryButton={{
          text: learnMoreButtonText?.value,
          type: learnMoreButtonHref?.url ? 'link' : 'button',
          href: learnMoreButtonHref?.url,
          callLink:
            learnMoreButtonType?.targetItem?.buttonType?.value === 'phone',
          triggerEvent: true,
          eventObj: { events: 'event14', eVar14: CTA_BUTTON },
          interactionType: SITE_INTERACTION,
          className: Boolean(learnMoreButtonBorder?.value)
            ? classes.borderButton
            : classes.primaryBtn,
          variant:
            learnMoreButtonVariant?.targetItem?.type?.value || 'secondary',
          onClick: () => {
            if (learnMoreButtonType?.targetItem?.buttonType?.value === 'chat') {
              setChatState(true)
            }
          },
        }}
        legalText={legalText?.value || ''}
        legalTextColor={legalTextColor?.Color}
        legalStyleType={legalStyleType?.value?.field?.value || 'p3'}
      />
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  root: {},
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
    },
  },
  primaryBtn: {
    maxWidth: 'none',
    borderWidth: 1,
  },
  borderButton: {
    maxWidth: 'none',
    border: `2px solid ${colors.main.white}`,
  },
  legalText: {
    maxWidth: 'none',
    '& a': {
      textDecoration: 'underline',
      fontFamily: PP_OBJECT_SANS_MEDIUM,
      '&:hover': {
        color: colors.main.primaryRed,
      },
    },
  },
}))

export default HeroSection
