import { makeStyles } from '@material-ui/core'
import { Field, ErrorMessage } from 'formik'
import { COMPONENT_WRAPPER } from 'src/constants'
import { InjectHTML } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'

const FormInputCheckBox = (props: any) => {
  const classes = useStyles()
  const { name, label, mandatorty } = props
  const labelValue = mandatorty ? '<span  >*</span>' + label : label

  return (
    <div className={classes.inputContainer}>
      <Field
        className={classes.inputText}
        type="checkbox"
        id={name}
        name={name}
      />
      <InjectHTML
        addAnchorStyles
        tagType="div"
        styleType="p1"
        value={labelValue}
        className={classes.label}
        htmlFor={name}
      />
      <ErrorMessage className={classes.errorText} name={name} component="div" />
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
  },
  label: {
    fontSize: '0.875rem',
    alignSelf: 'start',
  },
  inputText: {
    border: `0.063rem solid ${colors.main.borderGrey}`,
    alignSelf: 'center',
    [breakpoints.down('xs')]: {
      alignSelf: 'start',
      marginTop: '0.313rem',
    },
  },
  inputContainer: {
    display: 'flex',
    gap: '.25rem',
    flexDirection: 'row',
    position: 'relative',
    '& span': {
      color: colors.main.red,
      fontWeight: 700,
      fontFamily: PP_OBJECT_SANS,
    },
  },
  errorText: {
    color: colors.main.error,
  },
}))
export default FormInputCheckBox
