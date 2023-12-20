import { useMemo, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography, Button } from '@/shared-ui/components'
import { WarningOutline } from 'src/blitz/assets/react-icons'
import APIClient from 'src/api-client'
import colors from '@/shared-ui/colors'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'
import { BillingAddress } from 'src/redux/types/accountTypes'
import { Input, Dropdown } from 'src/ui-kit'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { useAppData } from 'src/hooks'
import { accountSlice } from 'src/redux/slicers/account'
import { checkIfServiceAddressSameAsBillingAddress as checkIfBothAddressAreSame } from 'src/utils/addressHelpers'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const MailingAddressForm = ({
  accountNumber,
  currentAddress,
  handleClose,
}: {
  accountNumber?: string
  currentAddress?: BillingAddress
  handleClose: () => void
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const accountInformationData = useAppData('accountInformationData', true)
  const stateList = useAppData('stateList', true)
  const updateMailingAddressModalData = useAppData(
    'updateMailingAddressModalData',
    true,
  )
  const STATE_OPTIONS = useMemo(() => {
    return stateList?.option?.map((option: any) => ({
      label: option?.label?.value,
      value: option?.value?.value,
    }))
  }, [])

  const [hasApiFailed, setHasApiFailed] = useState(false)

  const [streetAdd, apt] = Array.isArray(currentAddress?.street)
    ? currentAddress?.street || ['', '']
    : [currentAddress?.street || '', '']

  const formik = useFormik({
    initialValues: {
      street: streetAdd || '',
      aptOrSuite: apt || '',
      city: currentAddress?.city || '',
      state: currentAddress?.state || 'AL',
      zip: currentAddress?.zip || '',
    },
    validate: (values) => {
      const errors: any = {}
      if (!values.street) {
        errors.street = updateMailingAddressModalData?.required?.value
      }
      if (!values.city) {
        errors.city = updateMailingAddressModalData?.required?.value
      }
      if (!values.zip) {
        errors.zip = updateMailingAddressModalData?.required?.value
      } else if (!/^(\d{5}|\d{9})$/.test(values.zip)) {
        errors.zip = updateMailingAddressModalData?.invalidZipCode?.value
      }
      return errors
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)
      setHasApiFailed(false)
      const newBillingAddress = getFormedAddress(values)
      try {
        const response = await APIClient.updateAccountDetails(accountNumber!, {
          billingAddress: currentAddress,
          id: accountNumber,
          newBillingAddress,
        })
        await dispatch(
          accountSlice.actions.setBillingAddress(
            response?.data?.billingAddress || newBillingAddress,
          ),
        )
        handleClose()

        DTMClient.triggerEvent(
          {
            events: 'event14',
            eVar14: 'my profile:account information:update mailing address',
          },
          'tl_o',
          'my profile:account information:update mailing address',
        )
      } catch (error) {
        setHasApiFailed(true)
      }
      setSubmitting(false)
    },
  })

  const renderLabel = (label: string) => {
    return (
      <Typography styleType="p2" fontType="boldFont">
        {label}
      </Typography>
    )
  }

  const getFormedAddress = (values: any) => {
    return {
      street: values?.aptOrSuite
        ? [values?.street, values?.aptOrSuite]
        : [values?.street],
      city: values?.city,
      state: values?.state,
      zip: values?.zip,
    }
  }

  const hasAddressChanged = !checkIfBothAddressAreSame(
    currentAddress,
    getFormedAddress(formik.values),
  )

  return (
    <div className={classes.editSection}>
      <Typography
        styleType="p2"
        fontType="boldFont"
        className={classes.sectionItem}
      >
        {accountInformationData?.editMailingAddress?.value}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <div className={classes.fieldSection}>
          {renderLabel(updateMailingAddressModalData?.streetAddress?.value)}
          <Input
            className={classes.inputContainer}
            inputClassName={classes.input}
            name="street"
            value={formik.values.street}
            onChange={formik.handleChange}
            helperText={formik.errors.street}
            isError={Boolean(formik.errors.street)}
          />
        </div>
        <div className={classes.fieldSection}>
          {renderLabel(updateMailingAddressModalData?.aptOrSuite?.value)}
          <Input
            className={classes.inputContainer}
            inputClassName={classes.input}
            name="aptOrSuite"
            value={formik.values.aptOrSuite}
            onChange={formik.handleChange}
          />
        </div>
        <div className={classes.fieldSection}>
          {renderLabel(updateMailingAddressModalData?.city?.value)}
          <Input
            className={classes.inputContainer}
            inputClassName={classes.input}
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            helperText={formik.errors.city}
            isError={Boolean(formik.errors.city)}
          />
        </div>
        <div className={classes.fieldSection}>
          {renderLabel(updateMailingAddressModalData?.state?.value)}
          <Dropdown
            value={{ label: formik.values.state, value: formik.values.state }}
            options={STATE_OPTIONS as any}
            onChange={({ value }: any) => formik.setFieldValue('state', value)}
          />
        </div>
        <div className={classes.fieldSection}>
          {renderLabel(updateMailingAddressModalData?.zip?.value)}
          <Input
            className={classes.inputContainer}
            inputClassName={classes.input}
            name="zip"
            value={formik.values.zip}
            onChange={(event: any) => {
              formik.setFieldValue(
                'zip',
                event.target.value.replace(/[_-]/g, ''),
              )
            }}
            mask={'*****-****'}
            helperText={formik.errors.zip}
            isError={Boolean(formik.errors.zip)}
          />
        </div>
        {hasApiFailed && (
          <div className={classes.invalidError}>
            <WarningOutline />
            <Typography
              className={classes.invalidErrorMsg}
              fontType="mediumFont"
            >
              {
                updateMailingAddressModalData?.errorUpdatingMailingAddress
                  ?.value
              }
            </Typography>
          </div>
        )}
        <div className={classes.actionBtnContainer}>
          <Button
            type="button"
            variant="secondary"
            buttonSize="small"
            disabled={
              Object.keys(formik.errors).length > 0 || !hasAddressChanged
            }
            isBusy={formik.isSubmitting}
            loadingVariant="white"
            text={accountInformationData?.saveBtn?.value}
            className={classes.btn}
            onClick={formik.handleSubmit as any}
          />
          <Button
            type="button"
            variant="lite"
            buttonSize="small"
            className={classes.cancelBtn}
            onClick={() => {
              setHasApiFailed(false)
              handleClose()
            }}
            disabled={formik.isSubmitting}
            text={accountInformationData?.cancelBtn?.value}
          />
        </div>
      </form>
    </div>
  )
}

export default MailingAddressForm

const useStyles = makeStyles(() => ({
  sectionItem: {
    marginBottom: 8,
  },

  editSection: {
    background: colors.main.secondaryLight,
    padding: 16,
    borderRadius: 16,
    margin: '0px -8px',
    marginBottom: 32,
  },
  btn: {
    maxWidth: 120,
    minWidth: 120,
    marginRight: 16,
    padding: '0px 10px',
  },
  cancelBtn: {
    fontFamily: PP_OBJECT_SANS,
    textDecoration: 'underline',
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
  actionBtnContainer: {
    marginTop: 32,
    display: 'flex',
  },
  menuItem: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  invalidError: {
    display: 'flex',
    gap: 4,
    '& svg': {
      '& path': {
        fill: colors.main.errorRed,
      },
    },
  },
  invalidErrorMsg: {
    color: colors.main.errorRed,
  },
  address: {
    maxWidth: 300,
  },
  fieldSection: {
    marginTop: 16,
  },
  inputContainer: {
    borderRadius: 32,
    width: '100%',
  },
  input: {
    borderRadius: '32px !important',
    border: `1px solid ${colors.main.dark}`,
    '& input': {
      padding: '8px 16px',
      height: 50,
    },
    '& .MuiInputBase-root': {
      // border: 0,
      background: 'transparent',
    },
  },
}))
