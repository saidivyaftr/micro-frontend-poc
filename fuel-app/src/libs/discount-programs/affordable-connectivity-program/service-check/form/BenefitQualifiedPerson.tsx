import { makeStyles } from '@material-ui/core'
import { Input, RadioGroup, DatePicker, Select } from 'src/ui-kit'
import { useCallback, useMemo } from 'react'
import { FormLayout, FormGroup } from './Forms'
import { getIn } from 'formik'
import { hasError, isRenderCheck } from './formHelper'
import { useAppData } from 'src/hooks'
import { subYears } from 'date-fns'

export const MAX_DATE = subYears(new Date(), 0)

const BenefitQualifiedPersonFrom = (formik: any) => {
  const { setFieldValue, values, errors, touched, handleBlur } = formik
  const classes = useStyles()
  const {
    benefitQualifiedPerson: [
      {
        applicationInfo: [applicationInfo],
        title,
        description,
      },
    ],
    basicInfo: [basicInfo],
  } = useAppData('benefitQualifiedPersonFormData', true)
  const setInputValue = useCallback(
    ({ target: { value } }: any, name: string) => setFieldValue(name, value),
    [formik],
  )
  const maxDate = MAX_DATE
  const benefitQualifiedPersonFields = useMemo(() => {
    return basicInfo?.fields?.filter((field: any) => {
      const showFor = field?.showFor?.data?.[0]
      const showForDictionary: any = {}
      for (const key in showFor) {
        if (showFor[key]?.value) {
          showForDictionary[key] = showFor[key]?.value
        }
      }
      const isAllowed = showFor
        ? isRenderCheck(showForDictionary, values)
        : true
      if (isAllowed) return field
    })
  }, [values[`benefitQualifiedPersonalId`], values['hasApplicationId']])

  const showBasicInfo = useMemo(
    () => getIn(values, 'isCustomerInfoSame') === '0',
    [values?.isCustomerInfoSame],
  )
  const getDateErrors = (errors: any, name: string) => {
    const message = getIn(errors, name)
    if (message?.includes('Invalid Date')) {
      return 'Invalid Date'
    }
    return message
  }

  return (
    <div className={`${classes.root}`}>
      <FormLayout
        title={title?.value}
        description={description?.value}
        partDescription={'PART 2'}
      >
        <FormGroup title={applicationInfo?.title?.value}>
          {applicationInfo?.fields?.map((field: any, index: number) => {
            const {
              label: { value: label = undefined } = {},
              name: { value: name = undefined } = {},
              required: { value: required = undefined } = {},
              options,
            } = field
            return (
              <div key={index} className={classes.inputWrapper}>
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
                  direction="column"
                />
              </div>
            )
          })}
        </FormGroup>
        {showBasicInfo && (
          <FormGroup title={basicInfo?.title?.value}>
            {benefitQualifiedPersonFields?.map((field: any, index: number) => {
              const {
                type: { value: type = undefined } = {},
                label: { value: label = undefined } = {},
                name: { value: name = undefined } = {},
                fullWidth: { value: fullWidth = undefined } = {},
                required: { value: required = undefined } = {},
                options,
              } = field
              return (
                <div key={index} className={classes.inputWrapper}>
                  {type === 'date' && (
                    <DatePicker
                      format="MM/DD/YYYY"
                      label={label}
                      name={name}
                      required={required}
                      onChange={(val: any) => setFieldValue(name, val)}
                      readOnly={false}
                      maxDate={maxDate}
                      onBlur={handleBlur}
                      value={getIn(values, name) ?? null}
                      helperText={
                        hasError(touched, errors, name) &&
                        getDateErrors(errors, name)
                      }
                      isError={hasError(touched, errors, name)}
                    />
                  )}
                  {type === 'select' && (
                    <Select
                      label={label}
                      value={getIn(values, name)}
                      name={name}
                      options={options?.option.map((x: any) => {
                        return {
                          label: x?.label?.value,
                          value: x?.value?.value,
                        }
                      })}
                      setValue={(val: string) => setFieldValue(name, val)}
                      onBlur={handleBlur}
                      required={required}
                      helperText={
                        hasError(touched, errors, name) && getIn(errors, name)
                      }
                      isError={hasError(touched, errors, name)}
                    />
                  )}
                  {type === 'text' && (
                    <Input
                      label={label}
                      type={type}
                      name={name}
                      value={getIn(values, name)}
                      onChange={(ev: any) => setInputValue(ev, name)}
                      onBlur={handleBlur}
                      fullWidth={fullWidth}
                      required={required}
                      helperText={
                        hasError(touched, errors, name) && getIn(errors, name)
                      }
                      isError={hasError(touched, errors, name)}
                    />
                  )}
                </div>
              )
            })}
          </FormGroup>
        )}
      </FormLayout>
    </div>
  )
}

const useStyles = makeStyles(({ typography }) => ({
  root: {
    width: '100%',
    marginBottom: typography.pxToRem(32),
  },
  inputWrapper: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  description: {
    margin: '8px 0px 0px',
  },
}))

export default BenefitQualifiedPersonFrom
