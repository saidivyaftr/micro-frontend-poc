import { makeStyles } from '@material-ui/core'
import { useState, useMemo, Dispatch } from 'react'
import { isValidMobileNumber } from 'src/utils/validator'
import { Button, InjectHTML, Typography } from '@/shared-ui/components'
import clx from 'classnames'
import css from './SecurityCode.module.scss'
import { useAppData } from '../../hooks'
import { handleSiteInteractionAnalytics } from './AnalyticUtilsMTN'
import { siteInteractionConstant } from 'src/constants/contact'
interface addnewMTNPageProps {
  setShowBackBtn?: Dispatch<boolean>
  getMobileNumber: Dispatch<string>
  setShowAppBanner?: Dispatch<boolean>
  mobileNumberError?: string
}
const AddNewMtn = ({
  setShowBackBtn,
  getMobileNumber,
  setShowAppBanner,
  mobileNumberError,
}: addnewMTNPageProps) => {
  const classes = useStyles()
  const [mobileInput, setMobileInput] = useState<string>('')

  const handleSubmit = () => {
    handleSiteInteractionAnalytics(
      siteInteractionConstant.ADD_MTN,
      siteInteractionConstant.ADD_MTN_TLO,
    )
    getMobileNumber(mobileInput)
  }
  const isInputValid = useMemo(
    () => isValidMobileNumber(mobileInput ?? ''),
    [mobileInput],
  )
  setShowBackBtn && setShowBackBtn(true)
  setShowAppBanner && setShowAppBanner(false)
  const addNewMtn = useAppData('addnewmtn', true)

  return (
    <div className={classes.welcomePageContainer}>
      <Typography tagType="h3" styleType="h3" className={classes.heading}>
        {addNewMtn.heading?.value}
      </Typography>
      <div className={clx(css.codeWrapper, classes.tryAgainContainer)}>
        <Typography tagType="p" styleType="p2" className={classes.description}>
          {addNewMtn.description?.value}
        </Typography>
      </div>
      <input
        value={mobileInput}
        maxLength={20}
        onChange={(e: any) => {
          setMobileInput(e.target.value)
        }}
        className={classes.inputContainer}
      />

      {((mobileInput && !isInputValid) || mobileNumberError) && (
        <div className={clx(css.codeWrapper, classes.tryAgainContainer)}>
          <InjectHTML
            value={addNewMtn?.tryAgainIcon?.value}
            pureInjection={true}
            enableClick={false}
            testId="test-html"
            className={classes.iconClass}
          />
          <Typography
            tagType="label"
            styleType="p4"
            fontType="boldFont"
            className={classes.rightAlign}
            color="primary"
          >
            {mobileNumberError
              ? mobileNumberError
              : addNewMtn.phoneNumberWarning.value}
          </Typography>
        </div>
      )}

      <Button
        type="button"
        variant="primary"
        text={addNewMtn.addnewnumber?.value}
        hoverVariant="primary"
        onClick={handleSubmit}
        className={classes.buttonPrimary}
        disabled={!isInputValid}
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  welcomePageContainer: {
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'PP Object Sans',
    [breakpoints.up('sm')]: {
      width: '500px',
    },
    [breakpoints.up('lg')]: {
      width: '683px',
    },
  },
  iconClass: {
    paddingRight: '6px',
  },
  rightAlign: {
    textAlign: 'left',
  },
  tryAgainContainer: {
    alignItems: 'center',
    [breakpoints.up('sm')]: {
      width: '500px',
    },
  },
  description: {
    margin: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '26px',

    [breakpoints.up('lg')]: {
      margin: '4px',
      textAlign: 'left',
      fontSize: '18px',
    },
  },
  inputContainer: {
    width: '100%',
    [breakpoints.up('sm')]: {
      width: `500px`,
    },
    borderRadius: '32px',
    height: '50px',
    padding: '12px 16px',
    border: '1px solid',
  },
  heading: {
    lineHeight: '44px',
    marginBottom: '32px',
    textTransform: 'none',
    height: '64px',
    width: '160px',
    [breakpoints.up('sm')]: {
      width: '587px',
    },
  },
  buttonPrimary: {
    marginTop: '32px',
    borderRadius: '64px',
    [breakpoints.up('sm')]: {
      lineHeight: '26px',
    },
  },
}))

export default AddNewMtn
