import { useState } from 'react'
import { Typography, Button } from '@/shared-ui/components'
import { Checkbox } from 'src/ui-kit'
import { paymentForm } from './sitecore-mock'
import { CheckboxCheck, CheckboxUnCheck } from '@/shared-ui/react-icons/index'
import { makeStyles } from '@material-ui/core'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'
import { PaymentTermsAndConditions as PaymentTermsAndConditionsModal } from 'src/libs/account/shared/modals'

export const PaymentTermsAndConditions = ({
  isChecked,
  setIsChecked,
}: {
  isChecked: boolean
  setIsChecked: (value: boolean) => void
}) => {
  const classes = useStyles()
  const [showModal, setShowModal] = useState(false)
  return (
    <div className={classes.root}>
      <Checkbox
        checked={isChecked}
        setValue={() => {
          setIsChecked(!isChecked)
          return ''
        }}
        label={
          <span>
            <Typography tagType="span">
              {paymentForm?.termsPreText?.value}
            </Typography>
            <Button
              type="button"
              variant="lite"
              className={classes.termsAndConditionsButton}
              text={paymentForm?.termsAndConditionsText?.value}
              onClick={() => setShowModal(true)}
            />
          </span>
        }
        checkedIcon={<CheckboxCheck />}
        uncheckedIcon={<CheckboxUnCheck />}
        name={paymentForm?.termsAndConditionsText?.value}
      />
      {/* Payment terms and conditions modal */}
      <PaymentTermsAndConditionsModal
        isOpen={showModal}
        handleClose={() => setShowModal(false)}
        title={paymentForm?.termsTitle?.value}
        description={paymentForm?.termsDescription?.value}
        downloadPDFText={paymentForm?.downloadPDFText?.value}
        downloadPDFLink={paymentForm?.downloadPDFLink?.value}
        primaryBtnText={paymentForm?.IAgreeBtnText?.value}
        primaryBtnAction={() => {
          setShowModal(false)
          setIsChecked(true)
        }}
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 4,
  },
  termsAndConditionsButton: {
    fontFamily: PP_OBJECT_SANS_MEDIUM,
    marginLeft: 4,
    fontSize: 16,
    textDecoration: 'underline',
    [breakpoints.down('xs')]: {
      fontSize: 14,
    },
  },
}))
