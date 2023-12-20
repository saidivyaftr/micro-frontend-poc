import { makeStyles } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Typography, Loading } from '@/shared-ui/components'
import { Logo } from '@/shared-ui/react-icons'
import colors from '@/shared-ui/colors'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { registerSlice } from 'src/redux/slicers'
import { State } from 'src/redux/types'
import { searchIpAddressAction } from 'src/redux/actions/register'
import { useAppData, usePageLoadEvents } from 'src/hooks'
import {
  SEARCH_BY_IPADDRESS,
  CUSTOMER,
  SERVICEABLE,
  COMPONENT_WRAPPER,
} from 'src/constants'
import ActionModal from 'src/libs/register/components/ActionModal'
import ModalWrapper from 'src/libs/register/components/ModalWrapper'
import { formatUrl } from 'src/utils/urlHelpers'
import { authorizationMethodsType } from 'src/constants/register'

const SearchByIP = () => {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: SEARCH_BY_IPADDRESS,
      eVar22: CUSTOMER,
      eVar49: SERVICEABLE,
      events: 'event68',
      eVar68: SEARCH_BY_IPADDRESS,
    },
  })

  const classes = useStyles()
  const { title } = useAppData('SearchByIP', true)
  const alreadyRegisteredEmailWiFi = useAppData(
    'alreadyRegisteredEmailWiFi',
    true,
  )
  const verifyAccount =
    {
      title: {
        value: 'Verify your account',
      },
      info: {
        value:
          'We found your account. Next, let’s verify it using your date of birth and the last four digits of your social security number.',
      },
      btn1: {
        text: { value: 'Verify date of birth & SSN' },
      },
    } || {}
  const { authorizationMethods, searchIpaddress } = useSelector(
    (state: State) => state.register,
  )

  const { isRegistered, useSSNDOB } = searchIpaddress || {}
  const dispatch = useDispatch()
  const router = useRouter()
  const { ip } = router.query

  // State management
  const [openDialog, setOpenDialog] = useState(false)
  const [maskedEmail, setMaskedEmail] = useState<string | undefined>('')
  const [verifyAccountDialog, setVerifyAccountDialog] = useState(false)

  useEffect(() => {
    if (router.isReady) {
      dispatch(searchIpAddressAction(ip as string))
    }
  }, [ip, router.isReady])

  const getDisplayEmail = () => {
    const filteredMethod = authorizationMethods?.find(
      ({ method }) => method === authorizationMethodsType.REGISTERED,
    )
    return filteredMethod?.maskedDeliveryLocation
  }

  const dismissModal = () => {
    setOpenDialog(false)
    if (verifyAccountDialog) handleExitRegistration()
  }
  const handleExitRegistration = () => {
    window.location.href = formatUrl('/login')
  }

  const handleForgotPW = () => {
    window.location.href = formatUrl('/forgot-password')
  }

  useEffect(() => {
    if (isRegistered) {
      setMaskedEmail(
        alreadyRegisteredEmailWiFi?.info1.value.replace(
          '**EMAIL**',
          getDisplayEmail(),
        ),
      )
    }
  }, [isRegistered])

  useEffect(() => {
    if (useSSNDOB) {
      setVerifyAccountDialog(true)
    }
  }, [useSSNDOB])

  useEffect(() => {
    if (maskedEmail !== '') {
      setOpenDialog(true)
    }
  }, [maskedEmail])
  const useDateofBirthandSSN = () => {
    dispatch(registerSlice.actions.setStep('VERIFY_WITH_SSN'))
  }
  const getVerifyYourAccount = () => {
    return (
      <ActionModal
        data={verifyAccount}
        btn1Handler={useDateofBirthandSSN}
        handleClose={dismissModal}
      />
    )
  }
  return (
    <div className={classes.wrapper}>
      <div className={classes.headerLogoContainer}>
        <a data-id="frontier-logo-btn" aria-label="Frontier Logo">
          <Logo fill={colors.main.brightRed} width="63.99px" height="62.39px" />
        </a>
      </div>
      <Typography
        styleType="h4"
        tagType="h3"
        className={classes.title}
        data-tid="search-by-ipaddress-title"
      >
        {title?.value}
      </Typography>
      <div className={classes.row}>
        <Loading className={classes.loaderArea} size="largest" />
      </div>

      <ModalWrapper
        isOpen={openDialog}
        handleClose={handleExitRegistration}
        modalContent={
          <ActionModal
            data={{
              title: alreadyRegisteredEmailWiFi?.title,
              info: alreadyRegisteredEmailWiFi?.info,
              info1: { value: maskedEmail },
              btn1: {
                text: alreadyRegisteredEmailWiFi?.btn1,
              },
              btn2: {
                text: alreadyRegisteredEmailWiFi?.btn2,
              },
              hideChatWithUsMsg: true,
            }}
            btn1Handler={handleExitRegistration}
            btn2Handler={handleForgotPW}
            //handleClose={dismissModal} //for chat link
          />
        }
      />
      <ModalWrapper
        isOpen={verifyAccountDialog}
        handleClose={dismissModal}
        modalContent={getVerifyYourAccount()}
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    margin: '0 auto',
    [breakpoints.up('md')]: {
      width: 388,
    },
  },
  headerLogoContainer: {
    textAlign: 'center',
    marginBottom: 32,
    '& button': {
      border: 0,
      background: 'transparent',
      cursor: 'pointer',
    },
    [breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    textAlign: 'center',
  },
  row: {
    marginBottom: 16,
    marginTop: 32,
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  loaderArea: {
    ...COMPONENT_WRAPPER,
    '& span': {
      [breakpoints.down('xs')]: {
        height: '10px !important',
        width: '10px !important',
        margin: '10px',
      },
    },
  },
}))

export default SearchByIP
