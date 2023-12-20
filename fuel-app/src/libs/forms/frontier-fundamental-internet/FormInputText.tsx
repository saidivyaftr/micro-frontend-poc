import { makeStyles } from '@material-ui/core'
import { Field, ErrorMessage } from 'formik'
import { COMPONENT_WRAPPER } from 'src/constants'
import { InjectHTML } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'
import ReCAPTCHA from 'react-google-recaptcha'

const FormInputText = (props: any) => {
  const classes = useStyles()
  const { name, label, type, placeholder, mandatory } = props
  const labelValue = mandatory ? '<span  >*</span>' + label : label
  const getInputType = (type: string, name: string, placeholder: string) => {
    switch (type) {
      case 'text':
      case 'date':
      case 'checkbox':
        return (
          <Field
            className={classes.inputText}
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
          />
        )
      case 'captcha':
        return process.env.GOOGLE_CAPTCHA_KEY ? (
          <ReCAPTCHA sitekey={process.env.GOOGLE_CAPTCHA_KEY} />
        ) : (
          <></>
        )
      case 'file':
        return (
          <Field type={type} id={name} name={name} placeholder={placeholder} />
        )
      case 'textarea':
        return (
          <Field
            className={classes.inputTextArea}
            as={type}
            id={name}
            name={name}
            cols="1"
            rows="4"
          />
        )
      default:
        return <></>
    }
  }

  return (
    <div className={classes.inputContainer}>
      <InjectHTML
        addAnchorStyles
        tagType="div"
        styleType="p1"
        value={labelValue}
        className={classes.label}
        htmlFor={name}
      />
      {getInputType(type, name, placeholder)}
      <ErrorMessage className={classes.errorText} name={name} component="div" />
    </div>
  )
}
const useStyles = makeStyles(() => ({
  root: {
    ...COMPONENT_WRAPPER,
  },
  label: { fontSize: '0.875rem' },
  inputText: {
    padding: '0.75rem 1rem',
    border: `1px solid ${colors.main.borderGrey}`,
    height: '2.125rem',
    borderRadius: '.313rem',
  },
  inputTextArea: {
    padding: '0.75rem 1rem',
    borderRadius: '.313rem',
    maxWidth: '100%',
    color: colors.main.devysGrey,
    fontFamily: PP_OBJECT_SANS,
    borderColor: colors.main.borderGrey,
    '&:focus': {
      borderColor: colors.main.mediumBlue,
      boxShadow: `0 0 .4rem ${colors.main.mediumBlue}`,
    },
    '&:focus-visible': {
      outline: '0',
    },
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    '& span': {
      color: colors.main.red,
      fontWeight: 700,
    },
    '& input': {
      outline: 'none',
      fontSize: '0.875rem',
      fontFamily: PP_OBJECT_SANS,
      color: colors.main.devysGrey,
      '&:focus': {
        borderColor: colors.main.mediumBlue,
        boxShadow: `0 0 .2rem ${colors.main.mediumBlue}`,
      },
    },
  },
  errorText: {
    color: colors.main.error,
    fontSize: '0.875rem',
    fontFamily: PP_OBJECT_SANS,
  },
}))
export default FormInputText
