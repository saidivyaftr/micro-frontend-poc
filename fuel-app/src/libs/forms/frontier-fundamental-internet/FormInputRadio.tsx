import { makeStyles } from '@material-ui/core'
import { Field, ErrorMessage } from 'formik'
import { COMPONENT_WRAPPER } from 'src/constants'
import { InjectHTML } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'

const FormInputRadio = (props: any) => {
  const classes = useStyles()
  const { name, label, data, mandatory } = props
  const labelValue = mandatory ? '<span  >*</span>' + label : label

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
      <div className={classes.radioList}>
        {data.list.map((item: any, index: string) => (
          <label className={classes.radioContainer} key={index}>
            <Field
              type="radio"
              className={classes.radioInput}
              name={name}
              value={item?.field?.value}
            />
            {item?.field?.value}
          </label>
        ))}
      </div>
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
    display: 'flex',
    marginBottom: '0.625rem',
  },
  radioContainer: {
    display: 'flex',
    gap: '0.313rem',
  },
  radioInput: {
    margin: '0',
    [breakpoints.down('xs')]: {
      alignSelf: 'start',
      marginTop: '0.125rem',
    },
  },
  radioList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.375rem',
    fontFamily: PP_OBJECT_SANS,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    '& span': {
      color: colors.main.red,
      fontWeight: 700,
    },
    '& label': {
      fontSize: '0.875rem',
    },
  },
  errorText: {
    color: colors.main.error,
    fontSize: '0.875rem',
    fontFamily: PP_OBJECT_SANS,
  },
}))
export default FormInputRadio
