import { makeStyles } from '@material-ui/core'
import { useCallback, useMemo, useState } from 'react'
import { Input, RadioGroup, Select, DatePicker } from 'src/ui-kit'
import { FormLayout, FormGroup } from './Forms'
import { MAX_DATE, hasError, isRenderCheck } from './formHelper'
import { getIn } from 'formik'
import { Modal, Typography, InjectHTML } from 'src/blitz'
import useAppData from 'src/hooks/useAppData'
import { useRouter } from 'next/router'
import colors from '@/shared-ui/colors'

const BasicFormInfo = (formik: any) => {
  const { setFieldValue, values, handleBlur, errors, touched } = formik
  const classes = useStyles()
  const {
    basicInfoform: [basicInfoform] = [],
    applicationInfo: [applicationInfo] = [],
    subscriber: [subscriber] = [],
    contactInfo: [contactInfo] = [],
    serviceAddress: [serviceAddress] = [],
    accountInformation: [accountInformation] = [],
  } = useAppData('subscriberInfoFormData', true)

  const [showModal, setShowModal] = useState(false)

  const { query } = useRouter()
  const accountUUID = query?.accountUUID

  const setInputValue = useCallback(
    ({ target: { value } }: any, name: string) => setFieldValue(name, value),
    [formik],
  )

  const maxDate = MAX_DATE
  const subscriberFields = useMemo(() => {
    return subscriber?.fields?.filter((field: any) => {
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
  }, [subscriber, values[`subscriberPersonalId`], values['hasApplicationId']])

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
        title={basicInfoform?.title?.value}
        description={basicInfoform?.description?.value}
        partDescription={'PART 1'}
      >
        <FormGroup title={applicationInfo?.title?.value}>
          {applicationInfo?.fields?.map((field: any, index: number) => {
            const {
              type: { value: type = undefined } = {},
              label: { value: label = undefined } = {},
              name: { value: name = undefined } = {},
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
                      info={tooltipText}
                    />
                  </div>
                )}
                {values['hasApplicationId'] === '1' && type === 'text' && (
                  <div className={classes.inputWrapper}>
                    <Input
                      label={label}
                      value={getIn(values, name)}
                      name={name}
                      fullWidth
                      required={required}
                      onChange={(ev: any) => setInputValue(ev, name)}
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
        {!accountUUID && (
          <FormGroup title={accountInformation?.title?.value}>
            <div className={classes.inputWrapper}>
              <Input
                label={accountInformation?.inputLabel?.value}
                value={getIn(values, 'billingAccountNumber')}
                name={'billingAccountNumber'}
                fullWidth
                required
                onChange={(ev: any) =>
                  setInputValue(ev, 'billingAccountNumber')
                }
                onBlur={handleBlur}
                mask={'***-***-****-******-*'}
                helperText={
                  hasError(touched, errors, 'billingAccountNumber') &&
                  getIn(errors, 'billingAccountNumber')
                }
                isError={hasError(touched, errors, 'billingAccountNumber')}
              />
              <Typography
                styleType="p3"
                className={classes.whereToFindLink}
                onClick={() => setShowModal(true)}
              >
                {accountInformation?.whereToFindLinkText?.value}
              </Typography>
            </div>
          </FormGroup>
        )}
        <FormGroup
          title={subscriber?.title?.value}
          description={subscriber?.description?.value}
        >
          {subscriberFields?.map((field: any, index: number) => {
            const {
              options,
              type: { value: type = undefined } = {},
              label: { value: label = undefined } = {},
              name: { value: name = undefined } = {},
              fullWidth: { value: fullWidth = undefined } = {},
              required: { value: required = undefined } = {},
              disabled: { value: disabled = undefined } = {},
            } = field
            return (
              <div key={index} className={classes.inputWrapper}>
                {type === 'text' && (
                  <Input
                    label={label}
                    name={name}
                    value={getIn(values, name)}
                    required={required}
                    fullWidth={fullWidth}
                    onChange={(ev: any) => setInputValue(ev, name)}
                    type={type}
                    onBlur={handleBlur}
                    helperText={
                      hasError(touched, errors, name) && getIn(errors, name)
                    }
                    isError={hasError(touched, errors, name)}
                    disabled={disabled}
                  />
                )}
                {type === 'date' && (
                  <DatePicker
                    format="MM/DD/YYYY"
                    label={label}
                    name={name}
                    required={required}
                    onChange={(val: any) => setFieldValue(name, val)}
                    maxDate={maxDate}
                    readOnly={false}
                    onBlur={handleBlur}
                    value={getIn(values, name)}
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
                    disabled={disabled}
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
              </div>
            )
          })}
        </FormGroup>
        <FormGroup
          title={serviceAddress?.title?.value}
          description={serviceAddress?.description?.value}
        >
          {serviceAddress?.fields?.map((field: any, index: number) => {
            const {
              type: { value: type = undefined } = {},
              label: { value: label = undefined } = {},
              name: { value: name = undefined } = {},
              fullWidth: { value: fullWidth = undefined } = {},
              required: { value: required = undefined } = {},
              disabled: { value: disabled = undefined } = {},
              options,
            } = field
            return (
              <div key={index} className={classes.inputWrapper}>
                {type === 'text' && (
                  <Input
                    label={label}
                    name={name}
                    value={getIn(values, name)}
                    required={required}
                    fullWidth={fullWidth}
                    onChange={(ev: any) => setInputValue(ev, name)}
                    type={type}
                    onBlur={handleBlur}
                    helperText={
                      hasError(touched, errors, name) && getIn(errors, name)
                    }
                    isError={hasError(touched, errors, name)}
                    disabled={disabled}
                  />
                )}
                {type === 'select' && (
                  <Select
                    label={label}
                    value={getIn(values, name)}
                    name={name}
                    disabled={disabled}
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
              </div>
            )
          })}
        </FormGroup>
        <FormGroup
          title={contactInfo?.title?.value}
          description={contactInfo?.description?.value}
        >
          {contactInfo?.fields?.map((field: any, index: number) => {
            const {
              type: { value: type = undefined } = {},
              label: { value: label = undefined } = {},
              name: { value: name = undefined } = {},
              fullWidth: { value: fullWidth = undefined } = {},
              required: { value: required = undefined } = {},
              mask: { value: mask = undefined } = {},
            } = field
            return (
              type === 'text' && (
                <div key={index} className={classes.inputWrapper}>
                  <Input
                    label={label}
                    name={name}
                    required={required}
                    value={getIn(values, name)}
                    onChange={(ev: any) => setInputValue(ev, name)}
                    fullWidth={fullWidth}
                    mask={mask}
                    onBlur={handleBlur}
                    helperText={
                      hasError(touched, errors, name) && getIn(errors, name)
                    }
                    isError={hasError(touched, errors, name)}
                  />
                </div>
              )
            )
          })}
        </FormGroup>
      </FormLayout>
      <Modal
        modalOpen={showModal}
        setModalOpen={setShowModal}
        modalContent={
          <div className={classes.modalContent}>
            <Typography styleType="h5" tagType="h5">
              {accountInformation?.whereToFindModalTitle?.value}
            </Typography>
            <InjectHTML
              styleType="p1"
              value={accountInformation?.whereToFindModalDescription?.value}
            />
          </div>
        }
        stopDefaultExit={true}
        modalContainerClassName={classes.modalWrapper}
        strokeWidth="4"
        iconColor={colors.main.black}
        modalCloseIconClassName={classes.modalCloseBtn}
        width="100%"
        padding="0"
        background={colors.main.white}
        borderRadius="32px"
      />
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
  description: {
    margin: '8px 0px 0px',
  },
  whereToFindLink: {
    marginTop: 8,
    textDecoration: 'underline',
    '&:hover': {
      color: colors.main.brightRed,
      cursor: 'pointer',
    },
  },
  modalWrapper: {
    maxWidth: '670px !important',
    maxHeight: '90vh',
    borderRadius: 32,
    padding: '0 !important',
    backgroundColor: colors.main.white,
    [breakpoints.down('xs')]: {
      maxWidth: 'unset !important',
    },
  },
  modalCloseBtn: {
    top: '65px !important',
    right: '16px !important',
    fontWeight: 'bold',
    cursor: 'pointer',
    [breakpoints.down('xs')]: {
      top: '40px !important',
      right: '8px !important',
    },
  },
  modalContent: {
    padding: '5rem',
    '& ul': {
      paddingLeft: 24,
    },
    '& li': {
      marginBottom: 16,
    },
    [breakpoints.down('xs')]: {
      padding: '4rem 2rem',
    },
  },
}))

export default BasicFormInfo
