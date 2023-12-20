import { makeStyles } from '@material-ui/styles'
import { Typography } from '@/shared-ui/components'
import MainLayout from '@/shared-ui/layouts/main'
import { useAppData } from 'src/hooks'
import customStaticProps from 'src/utils/appData'

interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function VerificationConfirmation(props: PageProps): JSX.Element {
  const classes = useStyles()
  const { ThankYouText } = useAppData('verificationConfirmationData', true)
  return (
    <MainLayout {...props}>
      <div className={classes.wrapper}>
        <Typography styleType="h2" tagType="h1" fontType="boldFont">
          {ThankYouText?.value}
        </Typography>
      </div>
    </MainLayout>
  )
}
const useStyles = makeStyles(() => ({
  wrapper: {
    textAlign: 'center',
    padding: '60px 0',
  },
}))

export const getStaticProps = customStaticProps(
  '/resources/verification-confirmation',
)
export default VerificationConfirmation
