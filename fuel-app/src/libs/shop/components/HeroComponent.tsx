/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/core'
import { parseCookies } from 'nookies'
import {
  Hero,
  InjectHTML,
  ButtonWithChatLink,
  TooltipPopover,
} from '@/shared-ui/components'
import InfoIconWhite from '@/shared-ui/react-icons/info-icon-white'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
import {
  TV_PAGE_EXISTING_CUST_CHAT_EVENT,
  TV_PAGE_PROSPECT_CUST_CHAT_EVENT,
} from 'src/constants'
import { IShopComponents } from './types'
import { useEffect, useState } from 'react'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'

const HeroComponent = ({ styles }: IShopComponents) => {
  const data = useAppData('hero', true)
  const classes = useStyles()
  const { frontieramp = false } = parseCookies()
  const [isCustomer, setCustomer] = useState(false)
  useEffect(() => {
    setCustomer(!(!frontieramp || frontieramp != 'true'))
  }, [frontieramp])
  const {
    image,
    mobileImage,
    titleLoggedIn,
    titleNotLoggedIn,
    subtitleLoggedIn,
    subtitleNotLoggedIn,
    descriptionLoggedIn,
    descriptionNotLoggedIn,
    chatButton,
    checkAvailabilityButton,
    alreadyCustomer,
    chatNow,
    legalText,
    tooltipTextReturningCustomer,
    tooltipTextNonReturningCustomer,
  } = data

  if (!titleLoggedIn || !titleNotLoggedIn) {
    return null
  }

  const tooltipValue =
    isCustomer && tooltipTextReturningCustomer?.value
      ? tooltipTextReturningCustomer?.value
      : tooltipTextNonReturningCustomer?.value

  return (
    <Hero
      backgroundColor="gravity"
      removeStripes={false}
      stripeColor={'primary'}
      stripeStyles={{ height: 19.41, marginBottom: 9.71 }}
      backgroundImage={image?.src}
      mobileBackgroundImage={mobileImage?.src}
      bkgImgClassName="bkgContainer"
      className={classes.heroContainer}
      leftContentClassName={classes.HeroLeftContent}
      contentClassName={classes.HeroContent}
      content={
        <div className={classes.container} style={styles}>
          {titleLoggedIn?.value && (
            <InjectHTML
              tagType="h1"
              styleType="h3"
              fontType="boldFont"
              color="tertiary"
              value={isCustomer ? titleLoggedIn?.value : titleNotLoggedIn.value}
              data-testid="title-value"
            />
          )}
          <div>
            {subtitleLoggedIn?.value && (
              <InjectHTML
                tagType="h1"
                styleType="h5"
                fontType="boldFont"
                color="tertiary"
                className={classes.subtitle}
                value={
                  isCustomer
                    ? subtitleLoggedIn?.value
                    : subtitleNotLoggedIn.value
                }
                data-testid="subtitle-value"
              />
            )}
            {tooltipValue ? (
              <TooltipPopover
                tooltipClassName={classes.toolTip}
                tooltipContent={tooltipValue}
                dropShadow={false}
                tooltipDirection="bottom"
                tooltipIcon={<InfoIconWhite />}
                tooltipContentClassName={classes.toolTipContent}
              />
            ) : null}
          </div>
          <br />
          {descriptionLoggedIn?.value && (
            <InjectHTML
              tagType="p"
              styleType="p1"
              color="tertiary"
              fontType="regularFont"
              className={classes.description}
              value={
                isCustomer
                  ? descriptionLoggedIn?.value
                  : descriptionNotLoggedIn?.value
              }
              data-testid="description-value"
            />
          )}
          {checkAvailabilityButton?.text !== '' && chatButton?.value !== '' && (
            <div className={classes.buttonWrapper} data-testid="btn-container">
              <ButtonWithChatLink
                isReturningUser={isCustomer}
                buttonName={
                  isCustomer ? chatButton?.value : checkAvailabilityButton?.text
                }
                buttonLink={isCustomer ? '' : checkAvailabilityButton?.url}
                chatClassName={classes.chatContainer}
                buttonTarget="_self"
                hoverVariant="secondary"
                bgType="dark"
                labelLinkText={chatNow?.value}
                labelName={alreadyCustomer?.value}
                labelNameColor="white"
                labelLinkTextColor="white"
                labelStyleType="p1"
                labelTagType="p"
                chatParams={{
                  launchOption: isCustomer
                    ? TV_PAGE_EXISTING_CUST_CHAT_EVENT
                    : TV_PAGE_PROSPECT_CUST_CHAT_EVENT,
                }}
              />
            </div>
          )}

          {legalText && (
            <div>
              <InjectHTML
                tagType="p"
                styleType="legal"
                className={classes.legalText}
                value={legalText.value}
                color="tertiary"
              />
            </div>
          )}
        </div>
      }
    />
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    maxWidth: '600px',
    paddingTop: '13px',
    [breakpoints.between(1024, 1140)]: {
      maxWidth: '566px',
    },
    [breakpoints.down('sm')]: {
      maxWidth: 'unset',
      paddingBottom: '45vw',
      paddingTop: '30px',
    },
    [breakpoints.down('xs')]: {
      paddingBottom: '40vw',
    },
    '& svg': { top: 'unset' },
  },
  toolTipContent: {
    [breakpoints.down('sm')]: {
      width: '300px',
    },
  },
  legalText: {
    marginTop: '20px',
    maxWidth: '545px',
    '& a': {
      color: colors.main.white,
      fontFamily: PP_OBJECT_SANS_MEDIUM,
      textDecoration: 'underline',
      '&:hover': {
        color: colors.main.brightRed,
      },
    },
  },
  HeroContent: {
    margin: '0 auto',
    [breakpoints.up('md')]: {
      marginTop: '5.78125rem',
      paddingBottom: '64px',
    },
    [breakpoints.up('sm')]: {
      paddingBottom: '32px',
    },
  },
  HeroLeftContent: { justifyContent: 'flex-start' },
  heroContainer: {
    margin: 'auto',
    '& .bkgContainer': {
      backgroundSize: 'calc(50% - 87px)',
      backgroundPosition: 'calc(100% - 17px) 70%',
      minHeight: 'min(42vw, 600px)',
      [breakpoints.between(0, 1023.95)]: {
        minHeight: 'unset',
        paddingBottom: '145px',
        backgroundSize: '90%',
        backgroundPosition: 'center 92%',
      },
      [breakpoints.between(1024, 1139.95)]: {
        backgroundSize: 'calc(46%)',
        backgroundPosition: 'center right',
      },
      [breakpoints.up(1140)]: {
        backgroundSize: 'calc(48%)',
        backgroundPosition: 'center right',
      },
    },
  },
  subtitle: {
    display: 'inline-flex',
    marginTop: '1rem',
    marginBottom: '1rem',
    [breakpoints.down(335)]: {
      whiteSpace: 'nowrap',
      marginBottom: 0,
    },
    '& sup': {
      fontSize: '12px',
      lineHeight: 1,
    },
  },
  button: {
    marginTop: '2rem',
    display: 'block',
    width: 'fit-content',
    [breakpoints.down('sm')]: {
      width: '100%',
      marginTop: '1rem',
    },
  },
  buttonWrapper: {
    paddingTop: '2rem',
    '& div': {
      display: 'flex',
      gap: '1rem',
      [breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 'unset',
      },
    },
  },
  chatContainer: {
    [breakpoints.down('sm')]: {
      flexDirection: 'row !important',
    },
  },
  toolTip: {
    color: colors.main.white,
  },
  description: {
    '& #terms': {
      display: 'inline-block',
      marginTop: '2rem',
      cursor: 'pointer',
      textDecoration: 'underline',
      fontWeight: 500,
      '&:hover': {
        color: colors.main.brightRed,
      },
    },

    [breakpoints.down(335)]: {
      marginTop: '1rem',
    },
  },
}))

export default HeroComponent
