import { makeStyles } from '@material-ui/core'
import { Typography } from '@/shared-ui/components'
import TechnicalErrorIcon from '@/shared-ui/react-icons/technical-error-icon'
import { useAppData } from 'src/hooks'

const TechnicalErrorModalContent = () => {
  const classes = useStyles()
  const { techicalErrorValue, technicalErrorMessage } = useAppData(
    'resultScenario',
    true,
  )

  return (
    <div className={classes.container}>
      <TechnicalErrorIcon />
      <Typography styleType="h5" className={classes.title} testId="test-title">
        {techicalErrorValue?.value}
      </Typography>
      <div className={classes.description}>
        <Typography styleType="p1" testId="test-message">
          {technicalErrorMessage?.value}
        </Typography>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    padding: '1.5rem 3rem 2rem',
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
