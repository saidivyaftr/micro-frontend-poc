import { makeStyles } from '@material-ui/styles'
import { Typography } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'

const ConnecticutPrivacyForm = () => {
  const classes = useStyles()
  const { title } = useAppData('iframeForm', true)

  return (
    <div className={classes.formWrapper}>
      <Typography color="default" styleType="h4" className={classes.title}>
        {title?.value}
      </Typography>
      <iframe src="https://privacyportal.onetrust.com/webform/286c4d0a-a07c-4859-8fab-2730eb105a3f/bc4dcf90-f0f3-4cfc-9c79-74599cc7c7b8"></iframe>{' '}
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }: any) => ({
  title: {
    textAlign: 'center',
    marginBottom: '2.5rem',
  },
  formWrapper: {
    maxWidth: 750,
    height: '1350px',
    margin: 'auto',
    '& iframe': {
      width: '100%',
      height: '94%',
      border: 'none',
    },
    [breakpoints.down('sm')]: {
      height: '1450px',
    },
  },
}))

export default ConnecticutPrivacyForm
