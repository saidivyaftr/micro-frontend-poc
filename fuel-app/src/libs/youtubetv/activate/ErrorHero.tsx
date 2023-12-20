import { useEffect, useState } from 'react'
import { useAppData } from 'src/hooks'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography, InjectHTML } from '@/shared-ui/components'
import {
  COMPONENT_WRAPPER,
  CTA_YTTV_CHAT_NOW,
  CTA_YTTV_GOOGLE_SIGN_IN,
  PADDING,
  YTTV_REGISTRATION_PAGE,
} from 'src/constants'
import colors from 'src/styles/theme/colors'
import { signIn, signOut } from 'next-auth/react'
import {
  yttvCtaClickHandler,
  yttvErrorsHandler,
} from '../shared/AnalyticsUtlis'

interface ErrorHeroProps {
  errCode: string
  spaPageName?: string
}

const ErrorHero = ({
  errCode,
  spaPageName = 'registration/error',
}: ErrorHeroProps) => {
  const classes = useStyles()()
  const {
    chatButton,
    tryButton,
    title404,
    message404,
    title406,
    message406,
    title409,
    message409,
    title422,
    message422,
    title424,
    message424,
    title500,
    message500,
    title503,
    message503,
  }: any = useAppData('ErrorHero', true)

  const [errorTitle, setErrorTitle] = useState<any>('')
  const [errorMessage, setErrorMessage] = useState<any>('')
  const [showChat, setChat] = useState<boolean>(false)
  const [showTry, setTry] = useState<boolean>(false)

  const setMessaging = (err: string) => {
    switch (err) {
      case '400':
        setErrorTitle(title500?.value + ' ')
        setErrorMessage(message500?.value)
        break
      case '401':
        signOut()
        break
      case '403':
        signOut()
        break
      case '404':
        setErrorTitle(title404?.value)
        setErrorMessage(message404?.value)
        setChat(true)
        break
      case '406':
        setErrorTitle(title406?.value)
        setErrorMessage(message406?.value)
        setChat(true)
        break
      case '409':
        setErrorTitle(title409?.value)
        setErrorMessage(message409?.value)
        setTry(true)
        break
      case '422':
        setErrorTitle(title422?.value)
        setErrorMessage(message422?.value)
        break
      case '424':
        setErrorTitle(title424?.value)
        setErrorMessage(message424?.value)
        break
      case '500':
        setErrorTitle(title500?.value)
        setErrorMessage(message500?.value)
        break
      case '503':
        setErrorTitle(title503?.value)
        setErrorMessage(message503?.value)
        break
      default:
        setErrorTitle(title503?.value)
        setErrorMessage(message503?.value)
    }
  }

  const openChat = () => {
    yttvCtaClickHandler(spaPageName, 'hero', CTA_YTTV_CHAT_NOW)
    try {
      //@ts-ignore
      document.getElementsByClassName('minimized')[0]?.click()
    } catch (e) {
      console.log('chatbot error:', e)
    }
  }

  useEffect(() => {
    setChat(false)
    setTry(false)
    setMessaging(errCode)
  }, [errCode])

  useEffect(() => {
    if (errorTitle !== '') {
      yttvErrorsHandler(
        `${errCode} : ${errorTitle}`,
        YTTV_REGISTRATION_PAGE.replace('{NAME}', spaPageName),
      )
    }
  }, [errorTitle])

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <div className={classes.mainContent}>
            <Typography
              tagType="h1"
              styleType="h1"
              fontType="boldFont"
              color="tertiary"
              className={classes.heading}
            >
              {errorTitle}
            </Typography>
            <InjectHTML
              tagType="h6"
              styleType="h6"
              color="tertiary"
              fontType="boldFont"
              className={classes.errorDescription}
              value={errorMessage}
            />
            {showChat && (
              <Button
                type="button"
                text={chatButton?.value}
                onClick={openChat}
                hoverVariant="secondary"
                className={classes.chatButton}
              />
            )}
            {showTry && (
              <Button
                type="button"
                text={tryButton?.value}
                onClick={() => {
                  yttvCtaClickHandler(
                    spaPageName,
                    'hero',
                    CTA_YTTV_GOOGLE_SIGN_IN,
                  )
                  signIn('google')
                }}
                variant="tertiary"
                hoverVariant="secondary"
                className={classes.tryButton}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const useStyles = () =>
  makeStyles(({ breakpoints }) => ({
    root: {
      backgroundColor: colors.main.midnightExpress,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50vw',
      backgroundSize: '58vw',
      minHeight: '34.5rem',
      position: 'relative',
      [breakpoints.down('sm')]: {
        minHeight: '0',
        backgroundPosition: 'calc(100%) 100%',
        backgroundSize: '105vw',
        backgroundPositionX: 60,
      },
      [breakpoints.down('xs')]: {
        backgroundSize: '104vw',
        backgroundPositionX: 20,
      },
      ['@media screen and (min-width: 1441px)']: {
        backgroundSize: 720,
        backgroundPositionY: 107,
      },
    },
    wrapper: {
      ...COMPONENT_WRAPPER,
      margin: 'auto',
      padding: `6rem ${PADDING}px`,
      [breakpoints.down('md')]: {
        padding: `3rem ${PADDING}px`,
      },
      [breakpoints.down('xs')]: {
        padding: `1.5rem ${PADDING}px`,
      },
    },
    heading: {
      textTransform: 'none',
      marginBottom: '0.5rem',
      width: '80%',
    },
    errorDescription: {
      fontSize: '24px',
      lineHeight: '32px',
      textTransform: 'none',
      marginBottom: '2rem',
      fontFamily: 'PP Object Sans Bold',
      color: colors.main.white,
      '& > :first-child': {
        color: colors.main.white,
      },
      '& span': {
        color: colors.main.blue,
      },
      '& u': {
        cursor: 'pointer',
      },
      '& p': {
        maxWidth: '90% !important',
        fontFamily: 'PP Object Sans',
        [breakpoints.down('xs')]: {
          maxWidth: 'unset !important',
        },
      },
    },
    content: {
      [breakpoints.down('md')]: {
        margin: '1.75rem 0',
      },
    },
    mainContent: {
      position: 'relative',
      marginBottom: '2rem',
      '& p': {
        maxWidth: '550px',
      },
    },
    chatButton: {
      width: '300px',
      display: 'inline-block',
      marginBottom: '20px',
      marginRight: '40px',
      paddingLeft: 0,
      paddingRight: 0,
    },
    tryButton: {
      width: '300px',
      display: 'inline-block',
      marginBottom: '20px',
      marginRight: '40px',
      paddingLeft: 0,
      paddingRight: 0,
      color: colors.main.white,
      borderColor: colors.main.white,
    },
  }))

export default ErrorHero
