import { useState } from 'react'
import { Button, Typography } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { AppRoutes } from 'src/constants'
import { Input } from 'src/ui-kit'
import colors from '@/shared-ui/colors'
import { useRouter } from 'next/router'
import { CurrentStep, ModalType } from './LinkAccountContainer'
import { fetchDiscoverIdentity } from 'src/redux/slicers/accountAccess'
import { useDispatch } from 'react-redux'
import { useSelectDiscoverIdentity } from 'src/selector-hooks'
import useAppData from '@/shared-ui/hooks/useAppData'

export const FindAccount = ({
  setCurrentStep,
  setModal,
}: {
  setCurrentStep: (value: CurrentStep) => void
  setModal: (value: ModalType) => void
}) => {
  const router = useRouter()
  const classes = useStyles()
  const dispatch = useDispatch()
  const linkAccountData = useAppData('linkAccountData', true)

  const [accountNumber, setAccountNumber] = useState('')
  const [hasTouched, setHasTouched] = useState(false)
  const { isLoading } = useSelectDiscoverIdentity()

  const parsedAccountNumber = accountNumber.replace(/\D/g, '')
  const isValidAccountNumber = parsedAccountNumber?.length === 17

  const handleContinue = async () => {
    const isFetchSuccessful = await dispatch(
      fetchDiscoverIdentity(parsedAccountNumber),
    )
    if (Boolean(isFetchSuccessful)) {
      setCurrentStep('VERIFY')
    } else {
      setModal('CANT_FIND_ACCOUNT')
    }
  }

  return (
    <div>
      <Typography styleType="p2" fontType="boldFont">
        {linkAccountData?.accountNumber?.value}
      </Typography>
      <Input
        mask="***-***-****-******-*"
        placeholder="XXX-XXX-XXXX-XXXXXX-X"
        className={classes.inputContainer}
        inputClassName={classes.input}
        name="nickName"
        value={accountNumber}
        onBlur={() => setHasTouched(true)}
        onChange={(event: any) => setAccountNumber(event.target.value)}
        helperText={
          hasTouched && !isValidAccountNumber ? (
            <Typography color="primary" styleType="p4">
              {linkAccountData?.enterValidAccountNumber?.value}
            </Typography>
          ) : (
            ''
          )
        }
        isError={hasTouched && !isValidAccountNumber}
      />
      <Typography
        styleType="p3"
        fontType="mediumFont"
        className={classes.whereToFindLink}
        onClick={() => setModal('FIND_ACCOUNT')}
      >
        {linkAccountData?.whereToFindAccountNumber?.value}
      </Typography>
      <div className={classes.actionContainer}>
        <Button
          type="button"
          disabled={!isValidAccountNumber}
          text={linkAccountData?.continue?.value}
          onClick={handleContinue}
          isBusy={isLoading}
        />
        <Button
          type="button"
          variant="tertiary"
          text={linkAccountData?.cancel?.value}
          onClick={() => {
            router.push(AppRoutes.AccountAccess)
          }}
          disabled={isLoading}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  inputContainer: {
    borderRadius: 32,
    width: '100%',
    maxWidth: 520,
  },
  input: {
    borderRadius: '32px !important',
    border: `1px solid ${colors.main.dark}`,
    '& input': {
      padding: '8px 16px',
      height: 50,
    },
    '& .MuiInputBase-root': {
      background: 'transparent',
    },
  },
  whereToFindLink: {
    marginTop: 8,
    textDecoration: 'underline',
    '&:hover': {
      color: colors.main.brightRed,
      cursor: 'pointer',
    },
  },
  actionContainer: {
    display: 'flex',
    gap: '1rem',
    marginTop: 32,
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
}))
