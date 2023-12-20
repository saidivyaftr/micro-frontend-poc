import { makeStyles } from '@material-ui/core'
import { COMPONENT_WRAPPER } from 'src/constants'
import { initialValues } from './FormInitialization'
import FormInputText from './FormInputText'
import FormInputRadio from './FormInputRadio'
import FormInputCheckBox from './FormInputCheckBox'
import { Typography, InjectHTML, Button } from '@/shared-ui/components'
import { Formik, useFormik } from 'formik'
import { useAppData } from 'src/hooks'
import * as Yup from 'yup'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'

const FrontierFundamentalInternetForm = () => {
  const classes = useStyles()
  const formData = useAppData('frontierFundamentalInternetData', true)

  const {
    title,
    step1,
    firstName,
    middleName,
    lastName,
    serviceAddress,
    city,
    state,
    zipcode,
    billingAddress,
    billingCity,
    billingState,
    billingZipcode,
    email,
    dateOfBirth,
    telephone,
    emailPlaceholder,
    alternateEmail,
    alternateEmailPlaceholder,
    bestTimeToCall,
    bestTimeToCallOptions,
    prefferedLanguage,
    prefferedLanguageOptions,
    socialSecurityNumber,
    step2,
    programType,
    programTypeOPtions,
    docUploadDesc,
    docUploadLabel,
    altDocUploadLabel,
    completeDocTitle,
    confirmPersonText,
    isMemberOfHouseHold,
    isUsingBrandband,
    nameOnDocument,
    DOBOnDcouments,
    socialSecurityNumberOnDoc,
    step3,
    confirmName,
    dateToday,
    whoIsSubmittingForm,
    whoIsSubmittingFormOptions,
    BTN,
    step4,
    termsAndConditions,
    confirmInfo,
    submitButton,
    firstNameValidation,
    lastNameValidation,
    serviceAddressValidation,
    cityValidation,
    stateValidation,
    zipcodeValidation,
    emailvalidValidation,
    emailValidation,
    alternateEmailValidation,
    dateOfBirthValidation,
    telephoneValidation,
    bestTimeToCallValidation,
    prefferedLanguageValidation,
    socialSecurityNumberValidation,
    programTypeValidation,
    doc1Validation,
    confirmNameValidation,
    dateTodayValidation,
    whoIsSubmittingFormValidation,
    captchaLabel,
    termsAndConditionsValidation,
  } = formData

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(firstNameValidation?.value),
    lastName: Yup.string().required(lastNameValidation?.value),
    serviceAddress: Yup.string().required(serviceAddressValidation?.value),
    city: Yup.string().required(cityValidation?.value),
    state: Yup.string().required(stateValidation?.value),
    zipcode: Yup.string().required(zipcodeValidation?.value),
    email: Yup.string()
      .email(emailvalidValidation?.value)
      .required(emailValidation?.value),
    alternateEmail: Yup.string().email(alternateEmailValidation?.value),
    dateOfBirth: Yup.string().required(dateOfBirthValidation?.value),
    telephone: Yup.string().max(10).required(telephoneValidation?.value),
    bestTimeToCall: Yup.string().required(bestTimeToCallValidation?.value),
    prefferedLanguage: Yup.string().required(
      prefferedLanguageValidation?.value,
    ),
    socialSecurityNumber: Yup.string().required(
      socialSecurityNumberValidation?.value,
    ),
    programType: Yup.string().required(programTypeValidation?.value),
    doc1: Yup.string().required(doc1Validation?.value),
    confirmName: Yup.string().required(confirmNameValidation?.value),
    dateToday: Yup.string().required(dateTodayValidation?.value),
    whoIsSubmittingForm: Yup.string().required(
      whoIsSubmittingFormValidation?.value,
    ),
    termsAndConditions: Yup.bool().oneOf(
      [true],
      termsAndConditionsValidation?.value,
    ),
  })
  const handleSubmit = (values: any) => {
    // Handle form submission here
    alert(values)
  }

  const formik = useFormik({
    initialValues,
    validateOnMount: true,
    validationSchema,
    onSubmit: handleSubmit,
  })

  return (
    <div className={classes.root}>
      <div className={classes.titleContainer}>
        <Typography className={classes.title} tagType="h1" styleType="p1">
          {title?.value}
        </Typography>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, dirty }) => (
          <form
            className={classes.formContainer}
            onSubmit={formik.handleSubmit}
          >
            <div className={classes.Step}>
              <Typography tagType="h2" styleType="p1">
                {step1?.value}
              </Typography>
            </div>
            <FormInputText
              mandatory={true}
              name="firstName"
              type="text"
              label={firstName?.value}
            />
            <FormInputText
              mandatory={false}
              name="middleName"
              type="text"
              label={middleName?.value}
            />
            <FormInputText
              mandatory={true}
              name="lastName"
              type="text"
              label={lastName?.value}
            />
            <FormInputText
              mandatory={true}
              name="serviceAddress"
              type="textarea"
              label={serviceAddress?.value}
            />
            <FormInputText
              mandatory={true}
              name="city"
              type="text"
              label={city?.value}
            />
            <FormInputText
              mandatory={true}
              name="state"
              type="text"
              placeholder="California"
              label={state?.value}
            />
            <FormInputText
              mandatory={true}
              name="zipcode"
              type="text"
              label={zipcode?.value}
            />
            <FormInputText
              name="billingAddress"
              type="textarea"
              label={billingAddress?.value}
            />
            <FormInputText
              name="billingCity"
              type="text"
              label={billingCity?.value}
            />
            <FormInputText
              name="billingState"
              type="text"
              label={billingState?.value}
            />
            <FormInputText
              name="billingZipcode"
              type="text"
              label={billingZipcode?.value}
            />
            <FormInputText
              name="email"
              type="text"
              mandatory={true}
              label={email?.value}
              placeholder={emailPlaceholder?.value}
            />
            <FormInputText
              name="alternateEmail"
              type="text"
              label={alternateEmail?.value}
              placeholder={alternateEmailPlaceholder?.value}
            />
            <FormInputText
              name="dateOfBirth"
              type="date"
              mandatory={true}
              label={dateOfBirth?.value}
            />
            <FormInputText
              name="telephone"
              type="text"
              mandatory={true}
              label={telephone?.value}
              placeholder="555-123-4567"
            />
            <FormInputRadio
              name="bestTimeToCall"
              mandatory={true}
              label={bestTimeToCall?.value}
              data={bestTimeToCallOptions}
            />
            <FormInputRadio
              name="prefferedLanguage"
              mandatory={true}
              label={prefferedLanguage?.value}
              data={prefferedLanguageOptions}
            />
            <FormInputText
              name="socialSecurityNumber"
              type="text"
              mandatory={true}
              label={socialSecurityNumber?.value}
            />
            <div className={classes.Step}>
              <Typography tagType="h2" styleType="p1">
                {step2?.value}
              </Typography>
            </div>
            <FormInputRadio
              name="programType"
              mandatory={true}
              label={programType?.value}
              data={programTypeOPtions}
            />
            <div className={classes.Step}>
              <Typography tagType="h2" styleType="p1">
                {docUploadDesc?.value}
              </Typography>
            </div>
            <FormInputText
              name="doc1"
              mandatory={true}
              type="file"
              label={docUploadLabel?.value}
            />
            <FormInputText
              name="doc2"
              type="file"
              label={altDocUploadLabel?.value}
            />
            <FormInputText
              name="doc3"
              type="file"
              label={altDocUploadLabel?.value}
            />
            <div className={classes.Step}>
              <Typography tagType="h2" styleType="p1">
                {completeDocTitle?.value}
              </Typography>
            </div>

            <Typography
              className={classes.checkBoxHeading}
              tagType="div"
              styleType="p1"
            >
              {confirmPersonText?.value}
            </Typography>

            <div className={classes.checkbox}>
              <FormInputCheckBox
                name="isMemberOfHouseHold"
                type="checkbox"
                label={isMemberOfHouseHold?.value}
              />
              <FormInputCheckBox
                name="isUsingBrandband"
                type="checkbox"
                label={isUsingBrandband?.value}
              />
            </div>
            <FormInputText
              name="nameOnDocument"
              type="text"
              label={nameOnDocument?.value}
            />
            <FormInputText
              name="DOBOnDcouments"
              type="date"
              label={DOBOnDcouments?.value}
            />
            <FormInputText
              name="socialSecurityNumberOnDoc"
              type="text"
              label={socialSecurityNumberOnDoc?.value}
            />
            <div className={classes.Step}>
              <Typography tagType="h2" styleType="p1">
                {step3?.value}
              </Typography>
            </div>
            <FormInputText
              name="confirmName"
              type="text"
              mandatory={true}
              label={confirmName?.value}
            />
            <FormInputText
              name="dateToday"
              type="date"
              mandatory={true}
              label={dateToday?.value}
            />
            <FormInputRadio
              name="whoIsSubmittingForm"
              mandatory={true}
              label={whoIsSubmittingForm?.value}
              data={whoIsSubmittingFormOptions}
            />
            <FormInputText name="BTN" type="text" label={BTN?.value} />
            <div className={classes.Step}>
              <Typography tagType="h2" styleType="p1">
                {step4?.value}
              </Typography>
            </div>
            <FormInputCheckBox
              name="termsAndConditions"
              type="checkbox"
              label={termsAndConditions?.value}
              mandatory={true}
            />

            <FormInputText
              name="captcha"
              type="captcha"
              label={captchaLabel?.value}
              mandatory={true}
            />
            <InjectHTML
              addAnchorStyles
              tagType="div"
              styleType="p1"
              value={confirmInfo?.value}
              className={classes.formInfo}
            />
            <Button
              type="submit"
              variant="primary"
              hoverVariant="primary"
              className={classes.submitBtn}
              text={submitButton?.value}
              buttonSize="large"
              disabled={!isValid || !dirty}
            />
          </form>
        )}
      </Formik>
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
  },
  Step: {
    borderBottom: '0.063rem solid #eee',
    '& h2': {
      fontSize: '1.313rem',
      fontWeight: 400,
      marginBottom: 'unset',
    },
  },
  checkBoxHeading: {
    fontSize: '0.875rem',
  },
  submitBtn: {
    fontWeight: 700,
    outline: 'none',
    margin: '1rem',
    fontSize: '1rem',
    width: 'fit-content',
    alignSelf: 'center',
  },
  checkbox: {
    display: 'flex',
    flexDirection: 'column',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  title: {
    fontFamily: PP_OBJECT_SANS,
    fontSize: '2.25rem',
    lineHeight: '3.5rem',
    margin: '3.5rem 0 .75rem 0',
    [breakpoints.down('sm')]: {
      lineHeight: '2.5rem',
    },
  },
  titleContainer: {
    borderBottom: '0.063rem solid #eee',
  },
  formInfo: {
    fontSize: '0.875rem',
  },
}))
export default FrontierFundamentalInternetForm
