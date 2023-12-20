import colors from '@/shared-ui/colors'
import { Button, InjectHTML, Typography } from '@/shared-ui/components'
import { ThanksCheckMark, WarningOutline } from '@/shared-ui/react-icons'
import { makeStyles } from '@material-ui/core'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  ACP_ACKNOWLEDGEMENT_PAGE,
  COMPONENT_WRAPPER,
  FORM_ERROR,
} from 'src/constants'
import { useAppData } from 'src/hooks'
import { setStep } from 'src/redux/slicers/dpAck'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

interface ThanksMessageProps {
  componentName: string
}

const InfoMessage = ({ componentName }: ThanksMessageProps) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const {
    statusTitle,
    contentVisibleFlag,
    iconName,
    statusContent,
    tryAgain,
    contactUs,
    contactUsUrl,
    goHome,
    goHomeUrl,
  } = useAppData(componentName, true)

  useEffect(() => {
    if (componentName === 'ErrorContent') {
      DTMClient.triggerEvent(
        {
          events: 'event48',
          eVar2: ACP_ACKNOWLEDGEMENT_PAGE,
          eVar48:
            'We could not find an order or there was an error with the information you provided. Please try again.',
        },
        'tl_o',
        FORM_ERROR,
      )
    }
  }, [])

  if (!statusTitle || !contentVisibleFlag || !iconName || !statusContent) {
    return null
  }

  const handleTryAgain = () => {
    dispatch(setStep('confirm'))
  }

  return (
    <section className={classes.root}>
      <div className={classes.innerWrapper}>
        <div className={classes.imgClass}>
          {iconName?.value === 'error' ? (
            <WarningOutline />
          ) : (
            <ThanksCheckMark />
          )}
        </div>
        <Typography
          tagType="h3"
          styleType="h3"
          color="primary"
          className={classes.title}
        >
          {statusTitle?.value}
        </Typography>
        {contentVisibleFlag.value === true && (
          <InjectHTML
            className={classes.contentStyle}
            tagType="div"
            value={statusContent?.value}
          />
        )}
        {iconName?.value === 'error' ? (
          <div>
            <Button
              type="link"
              text={contactUs?.value}
              className={classes.actionBtn}
              variant="tertiary"
              href={contactUsUrl?.url}
            />
            <Button
              onClick={handleTryAgain}
              text={tryAgain?.value}
              className={classes.actionBtn}
              type="submit"
              variant="primary"
            />
          </div>
        ) : (
          <div>
            <Button
              type="link"
              text={goHome?.value}
              className={classes.goHomeBtn}
              variant="primary"
              href={goHomeUrl?.url}
            />
          </div>
        )}
      </div>
    </section>
  )
}
const useStyles = makeStyles((theme) => ({
  root: {
    background: colors.main.newBackgroundGray,
    paddingTop: '5.25rem',
    paddingBottom: '10rem',
    borderBottom: `1px solid ${colors.main.borderGrey}`,
  },
  innerWrapper: {
    ...COMPONENT_WRAPPER,
    maxWidth: '64.5rem',
    display: 'flex',
    padding: '5.313rem 5.5rem',
    flexDirection: 'column',
    alignItems: 'center',
    background: colors.main.white,
    border: `1px solid ${colors.main.borderGrey}`,
    borderRadius: '2rem',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      padding: '3.125rem  1rem',
      margin: '3rem 1rem',
    },
  },
  imgClass: {
    width: '2.5rem',
    margin: '0px auto 1rem auto',
    [theme.breakpoints.down('sm')]: {
      width: '2.188rem',
    },
  },

  title: {
    letterSpacing: '-0.02em',
    textAlign: 'center',
    color: colors.main.dark,
    [theme.breakpoints.down('sm')]: {
      letterSpacing: '-0.01em',
    },
  },
  actionBtn: {
    margin: '0.5rem',
  },
  goHomeBtn: {
    marginTop: '2rem',
  },
  contentStyle: {
    '& a': {
      fontFamily: 'PP Object Sans Bold',
      textDecoration: 'underline',
      fontWeight: 600,
      '&:hover': { color: colors.main.brightRed },
    },
    fontSize: '1.13rem',
    lineHeight: '1.5rem',
    textAlign: 'center',
    paddingTop: '1rem',
    maxWidth: '35rem',
    margin: 'auto',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      paddingTop: '1.8rem',
    },
  },
}))

export default InfoMessage
