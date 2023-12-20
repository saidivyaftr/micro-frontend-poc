import colors from '@/shared-ui/colors'
import { Checkbox, FormControlLabel, makeStyles } from '@material-ui/core'
import { Field } from 'formik'
import Link from 'next/link'
import { PAYMENTS_FORM_TNC } from 'src/constants'
import {
  PP_OBJECT_SANS,
  PP_OBJECT_SANS_MEDIUM,
} from 'src/constants/fontFamilyNames'

type TermsAndCondCheckBoxPropTypes = {
  tncLink?: string
}

export const TermsAndCondCheckBox = ({
  tncLink = PAYMENTS_FORM_TNC,
}: TermsAndCondCheckBoxPropTypes) => {
  const classes = useStyles()
  return (
    <div>
      <Field
        as={FormControlLabel}
        type="checkbox"
        name="termsAndCondition"
        control={<Checkbox />}
        label={
          <>
            <span className={classes.terms}>I accept the</span>
            <Link href={tncLink}>
              <a className={classes.paymentFormTnc} target="_blank">
                {'Terms and Conditions'}
              </a>
            </Link>
          </>
        }
      />
    </div>
  )
}

const useStyles = makeStyles(() => ({
  terms: {
    fontFamily: PP_OBJECT_SANS,
  },
  paymentFormTnc: {
    textDecoration: 'underline',
    fontSize: '1rem',
    margin: '0 0.25rem',
    fontFamily: PP_OBJECT_SANS_MEDIUM,
    cursor: 'pointer',
    '&:hover': {
      color: colors.main.brightRed,
    },
  },
}))
