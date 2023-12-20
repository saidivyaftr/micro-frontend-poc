import { makeStyles } from '@material-ui/core'
import { useEffect, useState, useMemo, Dispatch } from 'react'
import { isValidEmail } from 'src/utils/validator'
import { Button, InjectHTML, Typography } from '@/shared-ui/components'
import clx from 'classnames'
import css from './SecurityCode.module.scss'
import { useAppData } from '../../hooks'
import { handleSiteInteractionAnalytics } from './AnalyticUtilsMTN'
import { siteInteractionConstant } from 'src/constants/contact'
import colors from '@/shared-ui/colors'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'

interface addnewEmailPageProps {
  setShowBackBtn?: Dispatch<boolean>
  setShowAppBanner?: Dispatch<boolean>
  getEmailOTP?: any
  emailIdError?: string
}
const AddNewEmail = ({
  setShowBackBtn,
  setShowAppBanner,
  getEmailOTP,
  emailIdError,
}: addnewEmailPageProps) => {
  const classes = useStyles()
  const [emailId, setEmailId] = useState<string>('')
  const [emailIdConfirm, setEmailIdConfirm] = useState<string>('')
  const addNewEmailPage = useAppData('addNewEmailPage', true) || {}

  const [borderErrors, setBorderErrors] = useState({
    emailId: false,
    emailIdConfirm: false,
  })

  const handleSubmit = () => {
    handleSiteInteractionAnalytics(
      siteInteractionConstant.ADD_NEW_EMAIL,
      siteInteractionConstant.ADD_NEW_EMAIL_TLO,
    )
    getEmailOTP(emailId)
  }

  const isInputValid = useMemo(() => {
    if (
      isValidEmail(emailId ?? '') &&
      isValidEmail(emailIdConfirm ?? '') &&
      emailId === emailIdConfirm
    ) {
      return true
    } else {
      return false
    }
  }, [emailId, emailIdConfirm])

  useEffect(() => {
    setShowBackBtn && setShowBackBtn(true)
    setShowAppBanner && setShowAppBanner(false)
  }, [setShowBackBtn, setShowAppBanner])

  type AddNewEmailForm = {
    emailId: string
    emailIdConfirm: string
  }

  const initialValues: AddNewEmailForm = {
    emailId: '',
    emailIdConfirm: '',
  }

  const onSubmit = async (values: AddNewEmailForm) => {
    values.emailId = values?.emailId?.trim()
    values.emailIdConfirm = values?.emailIdConfirm?.trim()
  }

  const validationSchema = Yup.object({
    emailId: Yup.string()
      .trim()
      .email(addNewEmailPage?.emailRequired?.value)
      .required(addNewEmailPage?.invalidEmail?.value),
    emailIdConfirm: Yup.string()
      .trim()
      .email(addNewEmailPage?.emailConfirmRequired?.value)
      .oneOf([Yup.ref('emailId'), null], addNewEmailPage?.shouldBeSame?.value)
      .required(addNewEmailPage?.invalidEmailConfirm?.value),
  })
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit,
    validationSchema,
  })

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e
    const { name, value } = target
    formik?.handleChange(e)
    if (
      (name === 'emailId' || name === 'emailIdConfirm') &&
      formik?.values?.[name] !== value
    ) {
      setBorderErrors({ ...borderErrors, [name]: false })
    }
    name === 'emailId' ? setEmailId(value) : null
    name === 'emailIdConfirm' ? setEmailIdConfirm(value) : null
  }

  return (
    <div className={classes.pageContainer}>
      <Typography tagType="h3" styleType="h3" className={classes.heading}>
        {addNewEmailPage?.heading?.value}
      </Typography>
      <div className={classes.pageInnerContainer}>
        <Typography tagType="p" styleType="p1" className={classes.description}>
          {addNewEmailPage?.description?.value}
        </Typography>
        <Typography tagType="p" styleType="p1" className={classes.description}>
          <InjectHTML
            value={addNewEmailPage?.addtionalInfo?.value}
            pureInjection={true}
            enableClick={false}
            className={classes.noteLable}
          />
        </Typography>
        <div>
          <Typography
            styleType="p1"
            tagType="label"
            htmlFor="emailId"
            className={classes.displayBlock}
          >
            {addNewEmailPage?.emailLabel?.value}
          </Typography>
          <input
            type="text"
            name="emailId"
            id="emailId"
            value={formik?.values?.emailId}
            className={classes.inputContainer}
            onFocus={(ev: any) => {
              formik?.setFieldTouched(ev?.target?.name, false)
            }}
            onBlur={formik?.handleBlur}
            onChange={onInputChange}
            tabIndex={1}
          />
          {formik?.touched.emailId && formik?.errors?.emailId ? (
            <InjectHTML
              tagType="div"
              styleType="p4"
              className={classes.errorText}
              value={formik?.errors?.emailId}
            />
          ) : null}
        </div>

        <div>
          <Typography
            styleType="p1"
            tagType="label"
            htmlFor="emailIdConfirm"
            className={classes.displayBlock}
          >
            {addNewEmailPage?.reEnterEmailLabel?.value}
          </Typography>
          <input
            type="text"
            name="emailIdConfirm"
            id="emailIdConfirm"
            value={formik?.values?.emailIdConfirm}
            className={classes.inputContainer}
            onFocus={(ev: any) => {
              formik?.setFieldTouched(ev?.target?.name, false)
            }}
            onBlur={formik?.handleBlur}
            onChange={onInputChange}
            tabIndex={2}
          />
          {formik?.touched?.emailIdConfirm && formik?.errors?.emailIdConfirm ? (
            <InjectHTML
              tagType="div"
              styleType="p4"
              className={classes.errorText}
              value={formik?.errors?.emailIdConfirm}
            />
          ) : null}
        </div>

        {emailIdError && (
          <div className={clx(css.codeWrapper, classes.tryAgainContainer)}>
            <InjectHTML
              value={addNewEmailPage?.tryAgainIcon?.value}
              pureInjection={true}
              enableClick={false}
              testId="test-html"
              className={classes.iconClass}
            />
            <Typography
              tagType="label"
              styleType="p4"
              fontType="boldFont"
              className={classes.rightAlign}
              color="primary"
            >
              {emailIdError}
            </Typography>
          </div>
        )}

        <Button
          type="button"
          variant="primary"
          text={addNewEmailPage?.addButtonLabel?.value}
          hoverVariant="primary"
          onClick={handleSubmit}
          className={classes.buttonPrimary}
          disabled={!isInputValid}
          tabIndex={3}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  pageContainer: {
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [breakpoints.up('sm')]: {
      width: 587,
    },
  },
  pageInnerContainer: {
    width: '100%',
    [breakpoints.up('sm')]: {
      width: 500,
    },
  },
  heading: {
    [breakpoints.up('sm')]: {
      marginBottom: 32,
    },
  },
  iconClass: {
    paddingRight: '6px',
  },
  rightAlign: {
    textAlign: 'left',
  },
  tryAgainContainer: {
    alignItems: 'center',
    [breakpoints.up('sm')]: {
      width: 500,
    },
  },
  description: {
    margin: 0,
  },
  inputContainer: {
    width: '100%',
    [breakpoints.up('sm')]: {
      width: 500,
    },
    borderRadius: '32px',
    height: '50px',
    padding: '12px 16px',
    border: `1px solid ${colors?.main?.borderGrey}`,
    fontFamily: PP_OBJECT_SANS,

    outline: 'none',
    '&:hover': {
      borderColor: colors?.main?.greenishBlue,
    },
  },
  inputContainerError: {
    '& input': {
      border: `1px solid ${colors?.main?.error}`,
    },
  },

  buttonPrimary: {
    marginTop: '32px',
    borderRadius: '64px',
    [breakpoints.up('sm')]: {
      lineHeight: '26px',
    },
  },

  displayBlock: {
    display: 'block',
    textAlign: 'left',
    marginTop: 16,
  },
  noteLable: {
    marginBottom: 16,
  },
  errorText: {
    color: colors?.main?.error,
    marginLeft: '1rem',
    marginTop: '0.5rem',
    textAlign: 'left',
  },
}))

export default AddNewEmail
