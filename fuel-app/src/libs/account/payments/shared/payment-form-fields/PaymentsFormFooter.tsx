import { Checkbox, FormControlLabel, makeStyles } from '@material-ui/core'
import { Field } from 'formik'
import { useRouter } from 'next/router'
import { SAVE_ADDITIONAL, SAVE_AS_DEFAULT } from 'src/constants'
import { InputField } from './InputField'
import { TermsAndCondCheckBox } from './TermsAndCondCheckBox'
import { Button, Typography } from '@/shared-ui/components'
import clx from 'classnames'
import css from '../../payments.module.scss'

type PaymentsFormFooterPropTypes = {
  notification?: string
  pushToRoute?: string
  isSubmitDisable: boolean
  showSavePayment?: boolean
  showEmail?: boolean
  showNickname?: boolean
  showTerms?: boolean
  showSaveAsDefault?: boolean
  cancelButtonText?: string
  submitButtonText?: string
  emailFieldText?: string
  nameFieldText?: string
  onCancel?: () => void
  footerWrapperClassName?: string
  formActionClassName?: string
  isBusySavingPayment?: boolean
  tncLink?: string
}

const PaymentsFormFooter = ({
  notification,
  pushToRoute = '/',
  isSubmitDisable,
  showNickname = false,
  showSavePayment = false,
  showEmail = false,
  showTerms = false,
  showSaveAsDefault = false,
  cancelButtonText = '',
  submitButtonText = '',
  emailFieldText = 'Email Address',
  nameFieldText = 'Account Nickname',
  onCancel,
  footerWrapperClassName,
  formActionClassName,
  isBusySavingPayment,
  tncLink,
}: PaymentsFormFooterPropTypes) => {
  const nextRouter = useRouter()
  const classes = useHelperTextStyles()
  return (
    <>
      <div
        className={clx(css.paymentFormFooterWrapper, footerWrapperClassName)}
      >
        {showEmail && (
          <div role="group" aria-labelledby="email" className={css.emailgroup}>
            <Typography tagType="h4" styleType="h6">
              {emailFieldText}
            </Typography>
            <Field
              type="email"
              name="emailId"
              component={InputField}
              className={css.inputContainer}
            />
          </div>
        )}
        {showNickname && (
          <div
            role="group"
            aria-labelledby="nickname"
            className={css.emailgroup}
          >
            <Typography tagType="h4" styleType="h4">
              {nameFieldText}
            </Typography>
            <Field
              placeholder="Marks Card"
              name="nickname"
              type="text"
              label=""
              size="small"
              className={classes.nickNameInput}
              inputProps={{
                maxLength: 30,
                maxWidth: '320px',
                width: '100%',
              }}
              FormHelperTextProps={{
                classes: {
                  root: classes.root,
                },
              }}
              component={InputField}
            />
          </div>
        )}
        {showSaveAsDefault && (
          <div>
            <Field
              as={FormControlLabel}
              type="checkbox"
              name="saveAsDefault"
              control={<Checkbox />}
              label={SAVE_AS_DEFAULT}
            />
          </div>
        )}
        {showSavePayment && (
          <div>
            <Field
              as={FormControlLabel}
              type="checkbox"
              name="saveAdditionalPayment"
              control={<Checkbox />}
              label={SAVE_ADDITIONAL}
            />
          </div>
        )}
        <div>{showTerms && <TermsAndCondCheckBox tncLink={tncLink} />}</div>
      </div>
      <div
        aria-labelledby="paymentFormActions"
        className={clx(css.paymentFormActions, formActionClassName)}
      >
        {notification && <p>{notification}</p>}
        <section>
          {cancelButtonText && (
            <Button
              type="link"
              variant="tertiary"
              className={classes.btn}
              onClick={() => {
                onCancel
                  ? onCancel()
                  : pushToRoute &&
                    nextRouter.push(
                      { pathname: pushToRoute, query: nextRouter.query },
                      undefined,
                      { shallow: false },
                    )
              }}
              text={cancelButtonText}
            />
          )}
          {submitButtonText && (
            <Button
              type="submit"
              variant="primary"
              hoverVariant="primary"
              text={submitButtonText}
              buttonSize="large"
              disabled={isSubmitDisable}
              isBusy={isBusySavingPayment}
            />
          )}
        </section>
      </div>
    </>
  )
}

const useHelperTextStyles = makeStyles(({ breakpoints }) => ({
  root: {
    width: '100%',
    fontSize: '1rem',
  },
  nickNameInput: {
    width: '30%',
  },
  btn: {
    marginBottom: '20px',
  },
  buttonWrapper: {
    display: 'flex',
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
}))

export default PaymentsFormFooter
