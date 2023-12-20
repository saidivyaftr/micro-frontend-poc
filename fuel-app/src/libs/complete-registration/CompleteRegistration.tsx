import { makeStyles } from '@material-ui/core'
import { ACTIVATE_FTR_ID_PAGE, COMPONENT_WRAPPER, VISITOR } from 'src/constants'
import colors from '@/shared-ui/colors'
import { Typography } from '@/shared-ui/components'
import CompleteRegistrationForm from './components/CompleteRegistrationForm'
import { useAppData, usePageLoadEvents } from '../../hooks'

const CompleteRegistration = () => {
  const { title, description, choosePasswordTitle, passwordDescription } =
    useAppData('completeRegistrationPageData', true) || {}

  const classes = useStyles()
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: ACTIVATE_FTR_ID_PAGE,
      eVar22: VISITOR,
    },
  })

  return (
    <div>
      <div className={classes.innerWrapper}>
        <Typography styleType="h3" tagType="h1" className={classes.mainTitle}>
          {title?.value}
        </Typography>
        <Typography tagType="p" className={classes.title}>
          {description?.value}
        </Typography>
        <div className={classes.titleWrapper}>
          <Typography tagType="p" className={classes.title}>
            {choosePasswordTitle?.value}
          </Typography>
          <span>*</span>
        </div>
        <Typography tagType="p" className={classes.title}>
          {passwordDescription?.value}
        </Typography>
        <CompleteRegistrationForm />
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  mainTitle: {
    fontSize: '36px',
    lineHeight: '40px',
  },

  innerWrapper: {
    ...COMPONENT_WRAPPER,
    maxWidth: 680,
    paddingTop: 42,
    paddingBottom: 42,
  },

  titleWrapper: {
    display: 'flex',
    '& span': {
      color: colors.main.brightRed,
      marginTop: '20px',
      marginLeft: '8px',
    },
  },

  title: {
    fontSize: '16px',
    marginBottom: 0,
  },
}))

export default CompleteRegistration
