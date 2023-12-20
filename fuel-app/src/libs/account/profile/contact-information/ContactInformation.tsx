import { makeStyles } from '@material-ui/styles'
import PhoneNumbers from './PhoneNumbers'
import EmailAddresses from './EmailAddresses'
import { useActiveAccount } from 'src/selector-hooks'
import { useAppData } from 'src/hooks'
import ErrorMessage from '../../shared/ErrorMessage'

export const ContactInformation = () => {
  const classes = useStyles()
  const { error: activeAccountError } = useActiveAccount()
  const errorMessages = useAppData('errorMessages', true)
  if (activeAccountError) {
    return <ErrorMessage message={errorMessages?.fetchFailed?.value} />
  }

  return (
    <div>
      <div className={classes.section}>
        <PhoneNumbers />
      </div>
      <div>
        <EmailAddresses />
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  section: {
    marginBottom: '2rem',
  },
}))
