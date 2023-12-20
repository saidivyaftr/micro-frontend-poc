/* eslint-disable */
import { useCallback, useRef, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { WarningOutline } from '@/shared-ui/react-icons'
import { Button, Typography } from '@/shared-ui/components'
import validationSchema, { initialValues } from './formHelper'
import { useFormik } from 'formik'
import { getIn } from 'formik'
import ReCAPTCHA from 'react-google-recaptcha'
import CardWrapper from './CardWrapper'
import { InfoIconWhite } from 'src/blitz/assets/react-icons'
import { Tooltip } from '@/shared-ui/components'
import { OrderPageModals } from './types'
import { useAppData, usePageLoadEvents } from 'src/hooks'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'
import { HELP_CENTER, UNVERIFIED_SERVICE_AREA, VISITOR } from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import clsx from "classnames";
import { useAccountTickets, useIsValidSession } from 'src/selector-hooks'
import { useDispatch } from 'react-redux'
import { fetchOrderTickets, setOrderModal } from 'src/redux/slicers/orderTicket'
export const LOADING = 'loading'
export const FOUND = 'found'
export const NOT_FOUND = 'not-found'
const Input = ({ labelProps, inputProps, toolTipText }: any) => {
  const { text, noMargin = false } = labelProps
  const classes = useStyles()
  const { ariaLabel, ...restInputProps } = inputProps
  return (
    <div className={clsx(classes.inputWrapper, {
      [classes.label]: !noMargin
    })}>
      <Typography tagType="h6" styleType="p2" fontType="boldFont">
        <>
          {text}
          {toolTipText && (
            <Typography tagType="label" className={classes.toolTipWrapper}>
              <Tooltip
                tooltipIcon={<InfoIconWhite />}
                tooltipText={toolTipText}
                includeBorder={true}
                dropShadow={true}
                tooltipDirection="bottom"
                isDarkMode
              />
            </Typography>
          )}
        </>
      </Typography>
      <input type="text" aria-label={ariaLabel} {...restInputProps} />
    </div>
  )
}
const SearchForm = () => {
  const {
    title,
    subTitle,
    noResult,
    orderTicketNumber,
    familyName,
    serviceAddressZipCode,
    accountNumber,
    findAccountNumber,
    checkStatus,
    orderTicketInfo,
  } = useAppData('searchOrderOrTicket', true);
  const {isLoading, found, error} = useAccountTickets()
  const classes = useStyles()
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [isValid, setIsValid] = useState(false)
  const dispatch = useDispatch()
  const isLoggedIn = useIsValidSession();
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: `${HELP_CENTER}/order-ticket-status/search ticket`,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })

  useEffect(() => {
    if (found === NOT_FOUND) {
      DTMClient.triggerEvent(
        {
          events: 'event88',
          eVar88: "we didn't find any orders or tickets with that information",
        },
        'tl_o',
      )
      recaptchaRef?.current?.reset()
      handleCaptchaChange('')
    }
  }, [found])
  
  useEffect(() => {
    if (error) {
      DTMClient.triggerEvent(
        {
          pageName: `${HELP_CENTER}/order-ticket-status/something went wrong on our end`,
          eVar22: VISITOR,
          eVar49: UNVERIFIED_SERVICE_AREA,
        },
      )
    }
  }, [error])
  const handleOnSubmit = async () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: `${HELP_CENTER}/order-ticket-status:check-status`,
      },
      'tl_o',
    )
    const { accountNumber = '', lastName, orderOrTTNumber, zipCode } = formik.values
    const parsedAccountId = String(accountNumber?.trim()).replace(/[\s-]/g, '')
    const postData =
      parsedAccountId.length === 17
        ? {
          accountNumber: parsedAccountId,
        }
        : {
          lastName: lastName?.trim(),
          orderOrTTNumber: orderOrTTNumber?.trim(),
          zipCode: zipCode?.trim(),
        }
    dispatch(fetchOrderTickets(postData))
  }
  const formik = useFormik({
    validateOnMount: true,
    initialValues,
    validationSchema,
    onSubmit: handleOnSubmit,
  })

  const leftinputProps = [
    {
      name: 'orderOrTTNumber',
      required: true,
      label: orderTicketNumber,
      toolTipText: orderTicketInfo,
      noMargin: false,
      ariaLabel: 'order or ticket number',
    },
    {
      name: 'zipCode',
      required: true,
      label: serviceAddressZipCode,
      placeholder: 12345,
      noMargin: false,
      ariaLabel: 'zipcode',
    },
    {
      name: 'lastName',
      required: true,
      label: familyName,
      noMargin: true,
      ariaLabel: 'last name or business name',
    },
  ]
  const setInputValue = useCallback(
    ({ target: { value } }: any, name: string) =>
      formik.setFieldValue(name, value),
    [formik],
  )
  useEffect(() => {
    const { accountNumber = '', lastName, orderOrTTNumber, zipCode, recaptcha } = formik.values
    if (
      ((orderOrTTNumber?.trim() != '' && lastName?.trim() != '' && zipCode?.trim()?.length === 5) ||
        accountNumber?.trim().replace(/[\s-]/g, '').length === 17) && recaptcha !== '') {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [formik.values])

  const handleCaptchaChange = (value: any) => {
    formik.setFieldValue('recaptcha', value)
  }

  const { values, handleBlur } = formik
  return (
    <CardWrapper>
      <div className={classes.titleWrapper}>
        <Typography tagType="h2" styleType="h4" className={classes.title}>
          {title?.value}
        </Typography>
        <Typography tagType="p" styleType="p1" className={classes.subIitle}>
          {subTitle?.value}
        </Typography>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className={classes.outerWrapper}>
          {found === NOT_FOUND && (
            <div className={classes.noResult}>
              <>
                <WarningOutline />
                {noResult?.value}
              </>
            </div>
          )}
          <div className={classes.formWrapper}>
            <div className={classes.leftForm}>
              {leftinputProps.map((inputProp: any, index: number) => {
                const {
                  label,
                  name,
                  noMargin,
                  toolTipText,
                  placeholder = '',
                  ariaLabel = '',
                } = inputProp
                return (
                  <Input
                    labelProps={{ text: label?.value, noMargin }}
                    inputProps={{
                      value: getIn(values, name),
                      name,
                      required: false,
                      onChange: (ev: any) => setInputValue(ev, name),
                      onBlur: handleBlur,
                      placeholder: placeholder,
                      ariaLabel,
                    }}
                    toolTipText={toolTipText?.value}
                    key={index}
                  />
                )
              })}
            </div>
            <div className={classes.vl}></div>
            <div className={classes.rightForm}>
              <Input
                labelProps={{ text: accountNumber?.value, noMargin: true }}
                inputProps={{
                  value: getIn(values, 'accountNumber'),
                  name: 'accountNumber',
                  required: false,
                  onChange: (ev: any) => setInputValue(ev, 'accountNumber'),
                  onBlur: handleBlur,
                  placeholder: 'XXX-XXX-XXXX-XXXXXX-X',
                  ariaLabel: 'account number',
                }}
              />
              <Button
                type="link"
                text={findAccountNumber?.value}
                color="secondary"
                variant="lite"
                buttonSize="small"
                className={classes.helpLink}
                onClick={() => {
                  DTMClient.triggerEvent({
                    pageName:`${HELP_CENTER}/order-ticket-status:where-is-my-account-number`,
                    eVar22: VISITOR,
                    eVar49: UNVERIFIED_SERVICE_AREA,
                  })
                  dispatch(setOrderModal(OrderPageModals.FindAccountNumber))
                }}
              />
            </div>
          </div>
        </div>
        {process.env.GOOGLE_CAPTCHA_KEY && (
          <div className={classes.btmWrapper}>
            <ReCAPTCHA
              sitekey={process.env.GOOGLE_CAPTCHA_KEY}
              onChange={handleCaptchaChange}
              ref={recaptchaRef}
              onExpired={() => handleCaptchaChange('')}
            />
          </div>
        )}
        <div className={classes.btmWrapper}>
          <Button
            type="submit"
            text={checkStatus?.value}
            disabled={!isValid || isLoading || isLoggedIn}
          />
        </div>
      </form>
    </CardWrapper>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  outerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    background: colors.main.white,
    padding: '3rem 4rem',
    borderRadius: '1rem',
    margin: '2rem 0 0',
    [breakpoints.down('sm')]: {
      padding: '2rem 1rem',
    },
  },
  formWrapper: {
    display: 'flex',
    gap: '5rem',
    position: 'relative',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: '1rem',
    },
  },
  leftForm: {
    flex: 1,
  },
  rightForm: {
    flex: 1,
  },
  helpLink: {
    textDecoration: 'underline',
    fontFamily: PP_OBJECT_SANS,
  },
  label: {
    marginBottom: '1rem',
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    "& h6": {
      margin: 0,
    },
    '& input': {
      borderRadius: '2rem',
      padding: '0.75rem 1rem',
      height: 48,
      border: `1px solid ${colors.main.midnightExpress}`,
    },
  },
  vl: {
    position: 'relative',
    display: 'block',
    [breakpoints.down('sm')]: {
      height: 32,
    },
    '&:before': {
      display: 'flex',
      borderLeft: `1px solid ${colors.main.borderGrey}`,
      alignItems: 'center',
      content: '""',
      height: "100%",
      position: "absolute",
      left: "50%",
      [breakpoints.down('sm')]: {
        background: colors.main.borderGrey,
        position: 'absolute',
        left: 0,
        top: '50%',
        width: '100%',
        height: '1px',
      },
    },
    '&:after': {
      top: '50%',
      content: '"OR"',
      left: -10,
      background: colors.main.white,
      zIndex: 2,
      height: 24,
      position: "absolute",
      alignItems: "center",
      display: "flex",
      [breakpoints.down('sm')]: {
        left: "45%",
        top: 0,
        padding: "4px 6px"
      },
    },
  },
  btmWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2rem',
  },
  title: {
    margin: 0,
  },
  subIitle: {
    margin: 0,
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  toolTipWrapper: {
    marginTop: 2,
    marginLeft: 4,
    display: 'inline-flex',
  },
  noResult: {
    background: colors.main.blushRed,
    padding: '1rem',
    borderRadius: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontFamily: PP_OBJECT_SANS,
    '& svg path': {
      fill: colors.main.inputError,
    },
  },
}))

export default SearchForm
