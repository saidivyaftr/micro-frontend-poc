import { makeStyles } from '@material-ui/core'
import { Loading } from 'src/blitz'
import { Button, InjectHTML, Typography } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import { State } from 'src/redux/types'
import { useSelector } from 'react-redux'
import { useEffect, useState, Dispatch } from 'react'
import { addBracketstoMobileNumber } from '../account/welcome/helper'
import IconButton from '@material-ui/core/IconButton'
import { handleSiteInteractionAnalytics } from './AnalyticUtilsMTN'
import { siteInteractionConstant } from 'src/constants/contact'
import { AppRoutes } from 'src/constants'

interface VerifyNowProps {
  setShowBackBtn?: Dispatch<boolean>
  getMobileNumber: Dispatch<string>
  onEditicon?: () => void
  setShowAppBanner?: Dispatch<boolean>
  mobileNumber?: string
  phoneId?: string
  skipVerification: (
    url: string,
    uuid: string,
    phoneId?: string,
    emailId?: string,
  ) => void
}

const VerifyNow = ({
  setShowBackBtn,
  getMobileNumber,
  onEditicon,
  setShowAppBanner,
  mobileNumber,
  phoneId,
  skipVerification,
}: VerifyNowProps) => {
  const classes = useStyles()
  const { accountInfoOnLoad } =
    useSelector((state: State) => state?.account) || {}
  const [showLoader, setLoader] = useState<boolean>(false)
  useEffect(() => {
    accountInfoOnLoad.data.accountHolderFirstName && setLoader(true)
  }, [accountInfoOnLoad.data.accountHolderFirstName])

  setShowBackBtn && setShowBackBtn(false)
  const handleSubmit = () => {
    handleSiteInteractionAnalytics(
      siteInteractionConstant.VERIFY_MTN_NOW,
      siteInteractionConstant.VERIFY_MTN_NOW_TLO,
    )
    mobileNumber && getMobileNumber(mobileNumber)
  }
  const editHandler = () => {
    handleSiteInteractionAnalytics(
      siteInteractionConstant.UPDATE_MTN,
      siteInteractionConstant.UPDATE_MTN_TLO,
    )
    onEditicon && onEditicon()
  }
  const updatePhoneNumber = (str: string) => {
    return str.replace(
      '$PHONE$',
      mobileNumber ? mobileNumber : '(000) 000-0000',
    )
  }
  const handleDoLaterClick = () => {
    handleSiteInteractionAnalytics(
      siteInteractionConstant.DO_LATER,
      siteInteractionConstant.DO_LATER_TLO,
    )

    skipVerification(
      AppRoutes.AccountDashboard,
      accountInfoOnLoad?.data?.uuid,
      phoneId,
      undefined,
    )
  }
  setShowAppBanner && setShowAppBanner(false)
  const verifynow = useAppData('verifynow', true) || {}
  return (
    <div className={classes.verifynowContainer}>
      {showLoader ? (
        <>
          <Typography tagType="h3" styleType="h3">
            {verifynow.title?.value +
              ` ${accountInfoOnLoad.data.accountHolderFirstName}`}
          </Typography>
          <Typography
            tagType="p"
            styleType="p2"
            className={classes.description}
          >
            {verifynow.description?.value}
          </Typography>
          <div className={classes.informationMessage}>
            <Typography tagType="label" className={classes.mobileNumber}>
              {verifynow.subtitle?.value}
            </Typography>
            <Typography
              tagType="label"
              styleType="h5"
              className={classes.mobileNumberValue}
            >
              {addBracketstoMobileNumber(updatePhoneNumber('$PHONE$'))}
            </Typography>
            <IconButton className={classes.iconClass} size="small">
              <InjectHTML
                value={verifynow.editicon?.value}
                onClick={editHandler}
              />
            </IconButton>
          </div>

          <Button
            type="button"
            variant="primary"
            text={verifynow.verifynowCta?.value}
            hoverVariant="primary"
            onClick={handleSubmit}
            className={classes.primaryButtonCta}
          />
          <Typography tagType="p" styleType="p1">
            <Button
              type="link"
              variant="lite"
              buttonSize="small"
              text={verifynow.infoLink?.value}
              onClick={handleDoLaterClick}
              className={classes.iwilldoLater}
            />
          </Typography>
        </>
      ) : (
        <div className={classes.loader}>
          <Loading className={classes.loading} />
        </div>
      )}
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  verifynowContainer: {
    width: '100%',
    textAlign: 'center',
    [breakpoints.up('sm')]: {
      width: '776px',
    },
  },
  mainbody: { width: '311px' },
  primaryButtonCta: {
    [breakpoints.down('sm')]: {
      marginTop: '32px',
    },
  },
  mobileNumberValue: {
    lineHeight: '26px',
    [breakpoints.down('sm')]: {
      position: 'absolute',

      display: 'flex',
      height: '24px',
      marginTop: '16px',
    },
  },

  description: {
    margin: '16px 0',
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '26px',
    fontStyle: 'normal',
    [breakpoints.up('sm')]: {
      margin: '16px',
    },
  },
  iwilldoLater: {
    textDecoration: 'underline',
    lineHeight: '26px',
    fontSize: '18px',
    margin: '16px 0px 0px 0px',
    [breakpoints.down('sm')]: {
      lineHeight: '24px',
    },
  },

  buttonLite: {
    textDecoration: 'underline',
    [breakpoints.up('sm')]: {
      fontSize: '18px',
      fontWeight: 500,
      lineHeight: '26px',
    },
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    margin: 0,
    width: 'auto',
    height: 'auto',
    display: 'block',
    padding: '150px 0',
    ['@media screen and (max-width: 900px)']: {
      padding: '100px 0',
    },
  },

  iconClass: {
    marginLeft: '88px',

    [breakpoints.down('sm')]: {
      position: 'absolute',
      right: '0px',
      margin: '6px 30px 0px 0px',
    },
  },
  informationMessage: {
    marginBottom: '32px',
    [breakpoints.down('sm')]: {
      float: 'left',
    },
  },
  rightAlign: {
    textAlign: 'left',
  },
  mobileNumber: {
    textAlign: 'right',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '26px',
    marginRight: '24px',
    width: '100%',
    height: '26px',
    marginTop: '16px',
    top: '3px',
    [breakpoints.up('sm')]: {
      width: '148px',
    },
    [breakpoints.up('lg')]: {
      width: '148px',
    },
  },
}))

export default VerifyNow
