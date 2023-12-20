import { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { Skeleton, Typography } from '@/shared-ui/components'
import { useAccountList, useActiveAccount } from 'src/selector-hooks'
import { Edit } from 'src/blitz/assets/react-icons'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
import EmailForm from './EmailForm'
import PasswordForm from './PasswordForm'
import ValidateEditEmailModal from './ValidateEditEmailModal'
import { useSessionState, useProfileEmailAddresses } from 'src/selector-hooks'
import { PP_OBJECT_SANS_BOLD } from 'src/constants/fontFamilyNames'

export const SignInCredentials = () => {
  const { isLoading } = useActiveAccount()
  const signInCredentialsData = useAppData('signInCredentialsData', true)
  const { isLoading: isAccountsLoading } = useAccountList()
  const { data: activeAccountData } = useActiveAccount()
  const { accountNumber } = activeAccountData
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const sessionState = useSessionState()
  const loginEmail = sessionState?.loggedInState?.email
  const emailAddresses = useProfileEmailAddresses()
  const isPrimary = emailAddresses.data?.find(
    (record: any) => record.address === loginEmail,
  )?.isPrimary

  const [validateEditEmailModalOpen, setValidateEditEmailModalOpen] =
    useState(false)
  const dismissValidateEditEmailModal = () => {
    setValidateEditEmailModalOpen(false)
  }

  function handleShowEmailFormClick() {
    if (isPrimary) {
      setValidateEditEmailModalOpen(true)
    } else {
      setShowEmailForm(true)
    }
  }

  const classes = useStyles()

  if (isLoading || isAccountsLoading) {
    return <SignInCredentialsSkeleton />
  }

  function closeEditEmailForm(): void {
    setShowEmailForm(false)
  }

  function closeEditPasswordForm(): void {
    setShowPasswordForm(false)
  }

  return (
    <div>
      <div className={classes.section}>
        <ValidateEditEmailModal
          dismissValidateEditeEmailModal={dismissValidateEditEmailModal}
          validateEditEmailModalOpen={validateEditEmailModalOpen}
          setModalOpen={dismissValidateEditEmailModal}
          editEmailHandler={() => {
            setShowEmailForm(true)
          }}
        />

        {!showEmailForm && (
          <>
            <Typography
              styleType="p2"
              fontType="boldFont"
              className={classes.sectionItem}
            >
              <>
                {signInCredentialsData?.email?.value}
                <button
                  className={classes.showHideBtn}
                  onClick={handleShowEmailFormClick}
                >
                  <Edit />
                </button>
              </>
            </Typography>
            <Typography styleType="p2">
              <div className={classes.signInEmailContainer}>
                {loginEmail}
                {isPrimary && (
                  <div className={classes.primaryLabel}>
                    {signInCredentialsData?.primaryLabel?.value}
                  </div>
                )}
              </div>
            </Typography>
          </>
        )}
        {showEmailForm && (
          <EmailForm
            accountNumber={accountNumber}
            currentLoginEmail={loginEmail}
            handleClose={closeEditEmailForm}
          />
        )}
      </div>

      <div>
        {!showPasswordForm && (
          <>
            <Typography
              styleType="p2"
              fontType="boldFont"
              className={classes.sectionItem}
            >
              <>
                {signInCredentialsData?.password?.value}
                <button
                  className={classes.showHideBtn}
                  onClick={() => setShowPasswordForm(true)}
                >
                  <Edit />
                </button>
              </>
            </Typography>

            <Typography styleType="p2">********</Typography>
          </>
        )}

        {showPasswordForm && (
          <PasswordForm handleClose={closeEditPasswordForm} />
        )}
      </div>
    </div>
  )
}

const SignInCredentialsSkeleton = () => {
  return (
    <div>
      <Skeleton width={'80%'} height={30} />
      <Skeleton width={'80%'} height={30} />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  section: {
    marginBottom: 32,
  },
  sectionItem: {
    marginBottom: 8,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  showHideBtn: {
    background: 'transparent',
    border: 0,
    '&:hover': {
      cursor: 'pointer',
      '& svg': {
        '& path': {
          fill: colors.main.brightRed,
        },
      },
    },
  },
  address: {
    maxWidth: 300,
  },
  primaryLabel: {
    fontSize: '.875rem',
    lineHeight: '1.125rem',
    color: `${colors.main.grayOpacity50}`,
    fontFamily: PP_OBJECT_SANS_BOLD,
  },
  signInEmailContainer: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
    wordBreak: 'break-all',
    alignItems: 'center',
    [breakpoints.down('xs')]: {
      gap: 4,
    },
  },
}))
