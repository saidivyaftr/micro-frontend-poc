import { CardWithTitle } from '@/shared-ui/components/Card/Card'
import { makeStyles } from '@material-ui/core'
import AccountInformationCard from './account-information'
import BillingPreference from './billing-preference'
import NotificationSettingsCard from './notification-settings'
import SignInCredentialsCard from './sign-in-credentials'
import CaliforniaPrivacyLawCard from './california-privacy-law'
import ContactInformationCard from './contact-information'
import { useAppData } from 'src/hooks'
import { useCCPAReviews } from 'src/selector-hooks'

export const ProfileContainer = () => {
  const styles = useStyles()
  const billingPreference = useAppData('billingPreference', true)
  const accountInformationData = useAppData('accountInformationData', true)
  const notificationSettingsData = useAppData('notificationSettingsData', true)
  const californiaPrivacyLawData = useAppData('californiaPrivacyLawData', true)
  const contactInformationData = useAppData('contactInformationData', true)
  const { data: reviews } = useCCPAReviews()

  const AccountInformation = () => (
    <CardWithTitle
      title={accountInformationData?.title?.value}
      className={styles.card}
      classNameTitle={styles.classNameTitle}
      styleType="h5"
    >
      <AccountInformationCard />
    </CardWithTitle>
  )

  const NotificationSettings = () => (
    <CardWithTitle
      title={notificationSettingsData?.title?.value}
      className={styles.card}
      classNameTitle={styles.classNameTitle}
      styleType="h5"
    >
      <NotificationSettingsCard />
    </CardWithTitle>
  )

  const ContactInformation = () => (
    <CardWithTitle
      title={contactInformationData?.title?.value}
      className={styles.card}
      classNameTitle={styles.classNameTitle}
      styleType="h5"
    >
      <ContactInformationCard />
    </CardWithTitle>
  )

  const SignInCredentials = () => (
    <CardWithTitle
      title="Sign in credentials"
      className={styles.card}
      classNameTitle={styles.classNameTitle}
      styleType="h5"
    >
      <SignInCredentialsCard />
    </CardWithTitle>
  )

  const BillingPreferences = () => (
    <CardWithTitle
      title={billingPreference?.title?.value}
      labelLink={billingPreference?.goToBillingLabel?.value}
      url={billingPreference?.goToBillingUrl?.value}
      className={styles.card}
      classNameTitle={styles.classNameTitle}
      styleType="h5"
    >
      <BillingPreference />
    </CardWithTitle>
  )

  const CaliforniaPrivacyLaw = () => {
    if (reviews?.length > 0) {
      return (
        <CardWithTitle
          title={californiaPrivacyLawData?.title?.value}
          className={styles.card}
          classNameTitle={styles.classNameTitle}
        >
          <CaliforniaPrivacyLawCard />
        </CardWithTitle>
      )
    }
    return null
  }

  return (
    <div>
      <div className={styles.desktop}>
        <div className={styles.desktopRow}>
          <AccountInformation />
          <NotificationSettings />
        </div>
        <div className={styles.desktopRow}>
          <ContactInformation />
          <SignInCredentials />
          <BillingPreferences />
          <CaliforniaPrivacyLaw />
        </div>
      </div>
      <div className={styles.mobile}>
        <AccountInformation />
        <ContactInformation />
        <SignInCredentials />
        <NotificationSettings />
        <BillingPreferences />
        <CaliforniaPrivacyLaw />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  desktop: {
    display: 'flex',
    gap: 16,
    [breakpoints.down('md')]: {
      display: 'none',
    },
  },
  mobile: {
    display: 'none',
    [breakpoints.down('md')]: {
      display: 'block',
    },
  },
  card: {
    width: '100%',
    marginBottom: 16,
    padding: '48px 32px',
    [breakpoints.down('md')]: {
      padding: '32px 16px',
    },
  },
  desktopRow: {
    width: '100%',
  },
  classNameTitle: {
    marginBottom: 32,
  },
}))
