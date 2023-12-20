import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { useFormik } from 'formik'
import { Button, InjectHTML, Typography } from '@/shared-ui/components'
import ReCAPTCHA from 'react-google-recaptcha'
import InfoModal from './InfoModal'
import { useState } from 'react'
import { useAppData } from 'src/hooks'

const AccessibilityForm = () => {
  const [openDialog, setModalOpen] = useState(false)
  const classes = useStyles()
  const {
    nameLabel,
    phoneNumberLabel,
    frontierAccountNumberLable,
    frontierAccountNumberInfo,
    bestDayToBeContactedLable,
    bestTimeToBeContactedLable,
    timeOfDayLable,
    completeCaptchaLable,
    submitButtonLable,
    timeOfDayRequired,
    bestTimeToBeContactedRequired,
    bestDayToBeContactedRequired,
    frontierAccountNumberRequired,
    phoneNumberRequired,
    nameRequired,
  } = useAppData('accessibilityForm', true)

  const modaldata = useAppData('accessibilityFormAccountNumberInfo', true)
  const formik = useFormik({
    initialValues: {
      name: '',
      phoneNumber: '',
      accountNumber: '',
      bestDay: '',
      bestTime: '',
      timeOftheDay: '',
      captcha: '',
    },
    validate: (values) => {
      const errors = {
        name: '',
        phoneNumber: '',
        accountNumber: '',
        bestDay: '',
        bestTime: '',
        timeOftheDay: '',
      }

      if (!values.name) {
        errors.name = nameRequired?.value
      }

      if (!values.phoneNumber) {
        errors.phoneNumber = phoneNumberRequired?.value
      }

      if (!values.accountNumber) {
        errors.accountNumber = frontierAccountNumberRequired?.value
      }

      if (!values.bestDay) {
        errors.bestDay = bestDayToBeContactedRequired?.value
      }

      if (!values.bestTime) {
        errors.bestTime = bestTimeToBeContactedRequired?.value
      }
      if (!values.timeOftheDay) {
        errors.timeOftheDay = timeOfDayRequired?.value
      }

      return errors
    },
    onSubmit: (values, { setSubmitting }) => {
      // Simulate form submission
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        setSubmitting(false)
      }, 400)
    },
  })
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className={classes.FormField}>
          <Typography
            styleType="p1"
            tagType="label"
            htmlFor="name"
            fontType="boldFont"
          >
            {nameLabel?.value}
          </Typography>
          <div className={classes.inputContainer}>
            <input
              type="text"
              name="name"
              id="name"
              value={formik?.values?.name}
              onFocus={(ev: any) => {
                formik.setFieldTouched(ev.target.name, false)
              }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik?.errors?.name ? (
              <InjectHTML
                tagType="div"
                styleType="p4"
                className={classes.errorText}
                value={formik?.errors?.name}
              />
            ) : null}
          </div>
        </div>
        <div className={classes.FormField}>
          <Typography
            styleType="p1"
            tagType="label"
            htmlFor="phoneNumber"
            fontType="boldFont"
          >
            {phoneNumberLabel?.value}
          </Typography>
          <div className={classes.inputContainer}>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              value={formik?.values?.phoneNumber}
              onFocus={(ev: any) => {
                formik.setFieldTouched(ev.target.phoneNumber, false)
              }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phoneNumber && formik?.errors?.phoneNumber ? (
              <InjectHTML
                tagType="div"
                styleType="p4"
                className={classes.errorText}
                value={formik?.errors?.phoneNumber}
              />
            ) : null}
          </div>
        </div>
        <div className={classes.FormField}>
          <Typography
            styleType="p1"
            tagType="label"
            htmlFor="accountNumber"
            fontType="boldFont"
          >
            {frontierAccountNumberLable?.value}
          </Typography>
          <div className={classes.inputContainer}>
            <input
              type="text"
              name="accountNumber"
              id="accountNumber"
              value={formik?.values?.accountNumber}
              onFocus={(ev: any) => {
                formik.setFieldTouched(ev.target.accountNumber, false)
              }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.accountNumber && formik?.errors?.accountNumber ? (
              <InjectHTML
                tagType="div"
                styleType="p4"
                className={classes.errorText}
                value={formik?.errors?.accountNumber}
              />
            ) : null}
            <Button
              buttonSize="small"
              className={classes.navigation}
              text={frontierAccountNumberInfo?.value}
              type="button"
              variant="lite"
              onClick={() => setModalOpen(true)}
            />
          </div>
        </div>
        <div className={classes.FormField}>
          <Typography
            styleType="p1"
            tagType="label"
            htmlFor="bestDay"
            fontType="boldFont"
          >
            {bestDayToBeContactedLable?.value}
          </Typography>
          <div className={classes.inputContainer}>
            <input
              type="date"
              name="bestDay"
              pattern="\d{2}-\d{2}-\d{4}"
              id="bestDay"
              value={formik?.values?.bestDay}
              onFocus={(ev: any) => {
                formik.setFieldTouched(ev.target.bestDay, false)
              }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.bestDay && formik?.errors?.bestDay ? (
              <InjectHTML
                tagType="div"
                styleType="p4"
                className={classes.errorText}
                value={formik?.errors?.bestDay}
              />
            ) : null}
          </div>
        </div>
        <div className={classes.TimeFields}>
          <div className={classes.FormField}>
            <Typography
              styleType="p1"
              tagType="label"
              htmlFor="bestTime"
              fontType="boldFont"
            >
              {bestTimeToBeContactedLable?.value}
            </Typography>
            <div className={classes.inputContainer}>
              <input
                type="text"
                name="bestTime"
                id="bestTime"
                placeholder="Example: 2:30"
                value={formik?.values?.bestTime}
                onFocus={(ev: any) => {
                  formik.setFieldTouched(ev.target.bestTime, false)
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.bestTime && formik?.errors?.bestTime ? (
                <InjectHTML
                  tagType="div"
                  styleType="p4"
                  className={classes.errorText}
                  value={formik?.errors?.bestTime}
                />
              ) : null}
            </div>
          </div>
          <div className={classes.FormField}>
            <Typography
              styleType="p1"
              tagType="label"
              htmlFor="timeOftheDay"
              fontType="boldFont"
            >
              {timeOfDayLable?.value}
            </Typography>
            <div className={classes.inputContainer}>
              <select
                id="timeOftheDay"
                name="timeOftheDay"
                onFocus={(ev: any) => {
                  formik.setFieldTouched(ev.target.timeOftheDay, false)
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">{timeOfDayLable?.value}</option>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
              {formik.touched.timeOftheDay && formik?.errors?.timeOftheDay ? (
                <InjectHTML
                  tagType="div"
                  styleType="p4"
                  className={classes.errorText}
                  value={formik?.errors?.timeOftheDay}
                />
              ) : null}
            </div>
          </div>
        </div>
        <div className={classes.FormField}>
          <Typography
            styleType="p1"
            tagType="label"
            htmlFor="captcha"
            fontType="boldFont"
          >
            {completeCaptchaLable?.value}
          </Typography>
          <div className={classes.inputContainer}>
            {process.env.GOOGLE_CAPTCHA_KEY && (
              <ReCAPTCHA
                sitekey={process.env.GOOGLE_CAPTCHA_KEY}
                className={classes.captcha}
              />
            )}
          </div>
        </div>
        <div className={classes.FormField}>
          <Button
            type="submit"
            variant="primary"
            hoverVariant="primary"
            disabled={formik.isSubmitting}
            className={classes.submitBtn}
            text={submitButtonLable?.value}
            buttonSize="large"
          />
        </div>
      </form>
      {openDialog && (
        <InfoModal
          openDialog={openDialog}
          setModalOpen={setModalOpen}
          modalData={modaldata}
        />
      )}
    </>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  bannerBgColor: {
    backgroundColor: colors.main.dark,
    [breakpoints.down('xs')]: {
      paddingBottom: '1.5rem',
    },
  },
  FormField: {
    flexBasis: '50%',
  },
  TimeFields: {
    display: 'flex',
    flexDirection: 'row',
    gap: '2rem',
  },
  inputContainer: {
    width: '100%',
    marginTop: '0.5rem',
    marginBottom: '1rem',
    position: 'relative',
    '& input , & select': {
      border: `1px solid ${colors.main.borderGrey}`,
      height: 50,
      borderRadius: '2rem',
      width: '100%',
      padding: '0.75rem 1rem',
      outline: 'none',
      fontSize: 18,
      backgroundColor: colors.main.grayWhite,
      fontFamily: 'PP Object Sans',
      '&:hover': {
        borderColor: colors.main.greenishBlue,
      },
    },
  },
  errorText: {
    color: colors.main.error,
    marginLeft: '1rem',
    marginTop: '0.5rem',
  },
  navigation: {
    fontSize: '14px',
    lineHeight: '18px',
    fontStyle: 'normal',
    textDecorationLine: 'underline',
  },
  submitBtn: {
    margin: '1.438rem auto 0 auto',
    fontWeight: 700,
    outline: 'none',
  },
  captcha: {},
}))
export default AccessibilityForm
