import { useMemo, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { Button, InjectHTML, Typography } from '@/shared-ui/components'
import { createPasswordAction } from 'src/redux/actions/register'
import { useDispatch, useSelector } from 'react-redux'
import {
  ShowPassword,
  HidePassword,
  Verified,
  Unverified,
} from '@/shared-ui/react-icons'
import { State } from 'src/redux/types'
import ModalWrapper from '../components/ModalWrapper'
import ActionModal from '../components/ActionModal'
import { useAppData, usePageLoadEvents } from 'src/hooks'
import { CREATE_PASSWORD, CUSTOMER, SERVICEABLE } from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const CreatePassword = () => {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: CREATE_PASSWORD,
      eVar22: CUSTOMER,
      eVar49: SERVICEABLE,
      events: 'event68, event77',
      eVar68: CREATE_PASSWORD,
    },
  })

  const classes = useStyles()
  const {
    title,
    info,
    confirmBtnText,
    passwordLabel,
    confirmPasswordLabel,
    passwordRulesLabel,
    characterLimit,
    capitalLetter,
    numberInPassword,
    passwordsMustMatch,
    termsAndConditionsPreText,
    termsAndConditionsLinkText,
    termsAndConditionsModalTitle,
    terms,
  } = useAppData('createPassword', true)

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [showTermsAndConditions, setShowTermsAndConditions] = useState(false)

  const dispatch = useDispatch()
  const { createPassword: createPasswordData, email } = useSelector(
    (state: State) => state.register,
  )

  const { isBusy } = createPasswordData || {}

  const handleSubmit = () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: 'Registration: Submit new Password',
      },
      'tl_o',
    )
    dispatch(createPasswordAction(password))
  }

  const containsNumber = (str: string) => /\d/.test(str)
  const containsCapitalLetter = (str: string) => /[A-Z]/.test(str)

  const hasMinimumOf8Characters = password.length >= 8
  const hasAtlestOneDigit = containsNumber(password)
  const hasAtleastOneCapitalLetter = containsCapitalLetter(password)
  const hasPasswordAndConfirmPassMatches =
    password && password === confirmPassword

  const termsInfo = useMemo(() => {
    const termsList = terms?.list
    return (
      <div className={classes.termsContainer}>
        {termsList?.map((term: any, index: number) => {
          return (
            <div key={`term-index-${index}`} className={classes.termSection}>
              <Typography>{term?.title?.value}</Typography>
              <InjectHTML value={term?.description?.value} addAnchorStyles />
            </div>
          )
        })}
      </div>
    )
  }, [terms])

  const termsAndConditionsModal = {
    title: termsAndConditionsModalTitle,
    info: {
      value: termsInfo,
    },
    hideChatWithUsMsg: true,
    icon: 'success',
  }

  return (
    <div>
      <Typography styleType="h4" tagType="h3" className={classes.title}>
        {title?.value}
      </Typography>
      <Typography styleType="p1" className={classes.info}>
        {info?.value}
      </Typography>
      <Typography
        styleType="h5"
        className={classes.emailAddress}
        data-tid="user-email"
      >
        {email}
      </Typography>
      <div className={classes.sectionContainer}>
        <label>
          <Typography>{passwordLabel?.value}</Typography>
        </label>
        <div className={classes.inputContainer}>
          <input
            data-tid="input-password"
            aria-label={passwordLabel?.value}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            aria-label="enter-password"
            data-tid="show-input-password"
            className={classes.showHideBtn}
            onClick={() => {
              setShowPassword(!showPassword)
            }}
          >
            {showPassword ? <HidePassword /> : <ShowPassword />}
          </button>
        </div>
      </div>
      <div className={classes.sectionContainer}>
        <Typography>{passwordRulesLabel?.value}</Typography>
        <ul className={classes.passwordRules} data-tid="password-rules">
          <li>
            <div>{hasMinimumOf8Characters ? <Verified /> : <Unverified />}</div>
            {characterLimit?.value}
          </li>
          <li>
            <div>
              {hasAtleastOneCapitalLetter ? <Verified /> : <Unverified />}
            </div>
            {capitalLetter?.value}
          </li>
          <li>
            <div>{hasAtlestOneDigit ? <Verified /> : <Unverified />}</div>
            {numberInPassword?.value}
          </li>
          <li>
            <div>
              {hasPasswordAndConfirmPassMatches ? <Verified /> : <Unverified />}
            </div>
            {passwordsMustMatch?.value}
          </li>
        </ul>
      </div>
      <div className={classes.sectionContainer}>
        <label>
          <Typography>{confirmPasswordLabel?.value}</Typography>
        </label>
        <div className={classes.inputContainer}>
          <input
            aria-label={confirmPasswordLabel?.value}
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            data-tid="input-confirm-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            data-tid="show-input-confirm-password"
            aria-label="re-enter-password"
            className={classes.showHideBtn}
            onClick={() => {
              setShowConfirmPassword(!showConfirmPassword)
            }}
          >
            {showConfirmPassword ? <HidePassword /> : <ShowPassword />}
          </button>
        </div>
      </div>
      <div className={classes.termsAndConditionsContainer}>
        <input
          aria-label={termsAndConditionsLinkText?.value}
          data-tid="terms-and-conditions-check-box"
          type="checkbox"
          className={classes.checkbox}
          checked={agreedToTerms}
          onChange={() => setAgreedToTerms(!agreedToTerms)}
        />
        <Typography styleType="p3">
          {termsAndConditionsPreText?.value}
        </Typography>
        <Button
          type="button"
          variant="lite"
          onClick={() => setShowTermsAndConditions(true)}
          data-tid="terms-and-conditions-modal-btn"
          hoverVariant="primary"
          className={classes.termsAndConditionBtn}
          text={termsAndConditionsLinkText?.value}
        />
      </div>
      <Button
        type="button"
        variant="primary"
        onClick={handleSubmit}
        hoverVariant="primary"
        className={classes.continueBtn}
        text={confirmBtnText?.value}
        isBusy={isBusy}
        disabled={
          !hasMinimumOf8Characters ||
          !hasAtleastOneCapitalLetter ||
          !hasAtlestOneDigit ||
          password !== confirmPassword ||
          !agreedToTerms
        }
        data-tid="create-password-btn"
      />
      <ModalWrapper
        isOpen={showTermsAndConditions}
        handleClose={() => setShowTermsAndConditions(false)}
        modalContent={
          <ActionModal
            data={termsAndConditionsModal}
            handleClose={() => setShowTermsAndConditions(false)}
          />
        }
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  title: {
    textAlign: 'center',
    marginBottom: 32,
  },
  info: {
    marginBottom: 32,
  },
  emailAddress: {
    marginBottom: 32,
  },
  continueBtn: {
    margin: '32px auto',
    marginBottom: 0,
    maxWidth: 246,
    display: 'block',
    fontWeight: 700,
    fontSize: '0.875rem',
  },
  inputContainer: {
    display: 'flex',
    width: '100%',
    border: `1px solid ${colors.main.borderGrey}`,
    height: 50,
    borderRadius: 25,
    marginTop: 8,
    marginBottom: 16,
    '& input': {
      width: '100%',
      border: 0,
      margin: 8,
      outline: 'none',
      fontSize: 18,
      fontFamily: 'PP Object Sans',
      paddingLeft: 12,
    },
  },
  showHideBtn: {
    background: 'transparent',
    border: 'none',
    marginRight: 10,
    cursor: 'pointer',
  },
  sectionContainer: {
    marginTop: 32,
  },
  passwordRules: {
    padding: 0,
    listStyleType: 'none',
    '& li': {
      display: 'flex',
      marginBottom: 4,
      '& svg': {
        width: 16,
        height: 16,
        marginTop: 2,
        marginRight: 6,
      },
    },
  },
  checkbox: {
    height: 20,
    width: 20,
    cursor: 'pointer',
    accentColor: colors.main.brightRed,
    marginRight: 8,
  },
  termsAndConditionsContainer: {
    display: 'flex',
    gap: 4,
    alignItems: 'center',
    flexFlow: 'wrap',
  },
  termsAndConditionBtn: {
    margin: 0,
    fontSize: 14,
    textDecoration: 'underline',
    [breakpoints.down('xs')]: {
      marginLeft: 36,
      display: 'block',
      width: '100%',
    },
  },
  termsContainer: {
    textAlign: 'left',
    '& a': {
      wordBreak: 'break-word',
    },
  },
  termSection: {
    marginBottom: 32,
  },
}))

export default CreatePassword
