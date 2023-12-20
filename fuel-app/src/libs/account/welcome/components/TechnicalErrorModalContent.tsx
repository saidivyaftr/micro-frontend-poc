import { useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import { Typography } from '@/shared-ui/components'
import TechnicalErrorIcon from '@/shared-ui/react-icons/technical-error-icon'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { SITE_ERROR } from 'src/constants'
import useAppData from '@/shared-ui/hooks/useAppData'

const EVENT88_MESSAGE =
  'Something went wrong on our end. Please try again later.'

const TechnicalErrorModalContent = () => {
  const classes = useStyles()

  const { title, warning, message } =
    useAppData('TechnicalErrorData', true) || {}

  useEffect(() => {
    DTMClient.triggerEvent(
      {
        events: 'event88',
        eVar88: EVENT88_MESSAGE,
      },
      'tl_o',
      SITE_ERROR,
    )
  }, [])

  return (
    <div className={classes.container}>
      <TechnicalErrorIcon />
      <Typography styleType="h5" className={classes.title} testId="test-title">
        {title?.value}
      </Typography>
      <div className={classes.description}>
        <Typography styleType="p1" testId="test-warning">
          {warning?.value}
        </Typography>
        <Typography styleType="p1" testId="test-message">
          {message?.value}
        </Typography>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    padding: '2rem 4rem 5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    [breakpoints.down('xs')]: {
      padding: '3rem',
    },
  },
  title: {
    marginTop: '2rem',
    [breakpoints.down('xs')]: {
      marginTop: '1rem',
    },
  },
  description: {
    marginTop: '1rem',
  },
}))

export default TechnicalErrorModalContent
