import { makeStyles } from '@material-ui/styles'

const CaliforniaPrivacyForm = () => {
  const classes = useStyles()

  return (
    <div className={classes.formWrapper}>
      <iframe src="https://privacyportal.onetrust.com/webform/286c4d0a-a07c-4859-8fab-2730eb105a3f/bc4dcf90-f0f3-4cfc-9c79-74599cc7c7b8"></iframe>{' '}
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }: any) => ({
  formWrapper: {
    maxWidth: 750,
    height: '1250px',
    margin: 'auto',
    '& iframe': {
      width: '100%',
      height: '100%',
      border: 'none',
    },
    [breakpoints.down('sm')]: {
      height: '1450px',
    },
  },
}))

export default CaliforniaPrivacyForm
