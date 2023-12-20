import { useRef, useEffect, useState } from 'react'
import { Typography, Button } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
import {
  CHECK_AVAILABLITY_COMP,
  CTA_BUTTON,
  SITE_INTERACTION,
} from 'src/constants'

const CheckAvailabilityInfo = (): JSX.Element => {
  const checkAvailabilityInfo = useAppData('CheckAvailButton', true) || {}
  const classes = useStyles()
  const [fixedForm, setFixedForm] = useState(false)

  const node = useRef<HTMLDivElement>(null)

  let isListenerAdded = false

  const handleScroll = () => {
    if (document) {
      // eslint-disable-next-line prettier/prettier
      const shouldBeFixed =
        window.pageYOffset + window.innerHeight <=
        document.body?.offsetHeight - 150
      if (shouldBeFixed !== fixedForm) {
        setFixedForm(shouldBeFixed)
      }
    }
  }

  useEffect(() => {
    if (checkAvailabilityInfo && !isListenerAdded) {
      isListenerAdded = true
      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [checkAvailabilityInfo, fixedForm])

  const onButtonClick = () => {
    //@ts-ignore
    s_objectID = CHECK_AVAILABLITY_COMP.replace(
      '{NAME}',
      checkAvailabilityInfo?.buttonText?.value,
    )
  }

  const wrapperClassName = fixedForm ? classes.fixedWrapper : ''
  return (
    <div
      className={`${classes.root} ${wrapperClassName}`}
      ref={node}
      id="check-availability"
    >
      <div className={classes.container}>
        <div className={classes.contentMainWrapper}>
          <div>
            <Typography
              tagType="p"
              styleType="p1"
              fontType="boldFont"
              className={classes.description}
            >
              {checkAvailabilityInfo?.buttonTitle?.value}
            </Typography>
          </div>
          <div>
            <Button
              variant="primary"
              className={classes.button}
              text={checkAvailabilityInfo?.buttonText?.value}
              type="link"
              href={checkAvailabilityInfo?.buttonURL?.value}
              onClick={onButtonClick}
              triggerEvent={true}
              eventObj={{ events: 'event14', eVar14: CTA_BUTTON }}
              interactionType={SITE_INTERACTION}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    maxWidth: '100%',
    position: 'relative',
    transition: 'all 0.2s',
    zIndex: 2,
    [theme.breakpoints.down('md')]: {
      padding: 0,
      width: '100vw !important',
      margin: '0 auto',
    },
  },
  fixedWrapper: {
    marginTop: 0,
    position: 'fixed',
    bottom: 0,
    zIndex: 10,
    width: '100%',
    background: colors.main.newBackgroundGray,
    display: 'flex',
  },
  contentMainWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      maxWidth: '310px',
      margin: '0 auto',
      flexDirection: 'column',
    },
  },
  container: {
    padding: '21px 13px',
    margin: '0px',
    boxShadow: '0px -10px 10px rgba(0, 0, 0, 0.15)',
    backgroundColor: colors?.main?.newBackgroundGray,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      backgroundColor: colors?.main?.newBackgroundGray,
      boxShadow: '0px -7px 14px rgba(0, 0, 0, 0.1)',
      border: `1px solid ${colors.main.grey}`,
      margin: '0px',
      padding: '10px',
      paddingBottom: 0,
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: 32,
      paddingTop: 5,
    },
  },
  description: {
    display: 'inline-block',
    padding: '5px 32px 5px 5px',
    fontSize: '1.125rem',
    ['@media screen and (max-width: 1096px) and (min-width: 1023px)']: {
      fontSize: theme.typography.pxToRem(16),
    },
    [theme.breakpoints.down('xs')]: {
      paddingRight: 5,
    },
  },
  button: {
    border: 'none',
    padding: '13.5px 38px',
    [theme.breakpoints.down('xs')]: {
      padding: '13.5px 101px',
    },
  },
}))
export default CheckAvailabilityInfo
