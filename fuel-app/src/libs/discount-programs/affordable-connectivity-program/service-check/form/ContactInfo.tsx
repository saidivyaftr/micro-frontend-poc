import { makeStyles } from '@material-ui/core'
import { Input, RadioGroup } from 'src/ui-kit'
import { useCallback } from 'react'
import { FormLayout, FormGroup } from './Forms'
import { hasError } from './formHelper'
import { getIn } from 'formik'
import { useAppData } from 'src/hooks'
const ContactFormInfo = (formik: any) => {
  const classes = useStyles()
  const { setFieldValue, values, handleBlur, errors, touched } = formik
  const { contactForm: [contactForm] = [] } = useAppData(
    'contactInfoFormData',
    true,
  )
  const setInputValue = useCallback(
    ({ target: { value } }: any, name: string) => setFieldValue(name, value),
    [formik],
  )
  const showField = useCallback(
    (name: string) => {
      const mapFiledNames = {
        contactEmail: 'Email',
        contactMobile: 'SMS',
      }
      //@ts-ignore
      return getIn(values, 'communicationPreference') === mapFiledNames[name]
    },
    [name, values],
  )
  return (
    <div className={`${classes.root}`}>
      <FormLayout
        title={contactForm?.title?.value}
        description={contactForm?.description?.value}
        partDescription={
          !!parseInt(formik.values.hasApplicationId) ? 'PART 2' : 'PART 3'
        }
      >
        <FormGroup title={contactForm?.formTitle?.value}>
          {contactForm?.fields?.map((field: any, index: number) => {
            const {
              type: { value: type = undefined } = {},
              label: { value: label = undefined } = {},
              name: { value: name = undefined } = {},
              fullWidth: { value: fullWidth = undefined } = {},
              required: { value: required = undefined } = {},
              tooltipText: { value: tooltipText = undefined } = {},
              mask: { value: mask = undefined } = {},
              options,
            } = field

            return (
              <div key={index}>
                {type === 'radio' && (
                  <div className={classes.inputWrapper}>
                    <RadioGroup
                      label={label}
                      value={values[name]}
                      name={name}
                      options={options?.option.map((x: any) => {
                        return {
                          label: x?.label?.value,
                          value: x?.value?.value,
                        }
                      })}
                      setValue={(val: string) => setFieldValue(`${name}`, val)}
                      required={required}
                      info={tooltipText?.value}
                    />
                  </div>
                )}
                {type === 'text' && showField(name) && (
                  <div
                    className={`${classes.inputWrapper} ${classes.inputBox}`}
                  >
                    <Input
                      label={label}
                      name={name}
                      value={values[name]}
                      fullWidth={fullWidth}
                      onChange={(ev: any) => setInputValue(ev, `${name}`)}
                      required={required}
                      onBlur={handleBlur}
                      mask={mask}
                      helperText={
                        hasError(touched, errors, name) && getIn(errors, name)
                      }
                      isError={hasError(touched, errors, name)}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </FormGroup>
      </FormLayout>
    </div>
  )
}

const useStyles = makeStyles(({ typography, breakpoints }) => ({
  root: {
    width: '100%',
    marginBottom: typography.pxToRem(32),
  },
  inputWrapper: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  inputBox: {
    [breakpoints.down('md')]: {
      paddingTop: 24,
      paddingBottom: 0,
    },
  },
}))

export default ContactFormInfo
