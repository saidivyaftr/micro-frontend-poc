import { useRef, useState } from 'react'
import { Button, InjectHTML, Loading } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import APIClient from 'src/api-client'
import {
  WarningOutline,
  Clock,
  GreenCircleCheckOverlay,
  Logo,
  RightArrowIcon,
} from '@/shared-ui/react-icons'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import {
  SERVICE_OUTAGE_CHECK,
  SERVICE_OUTAGE_LAUNCH_OPTION,
} from 'src/constants'

import clx from 'classnames'
import {
  formSingleLineAddress,
  SingleLineAddress,
} from 'src/utils/addressHelpers'
import { bgaSlice } from 'src/redux/slicers'
import { SearchIcon } from '@/shared-ui/react-icons'
import { useAddressPredictor, useDebounce } from 'src/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'src/redux/types'
import { useChatState } from 'src/hooks'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'
import moment from 'moment/moment'
import { v4 as uuidv4 } from 'uuid'

const OUTAGE_STATUS = {
  NONE: '',
  NO_OUTAGE: 'NO_OUTAGE',
  OUTAGE: 'OUTAGE',
  ERROR: 'ERROR',
  INVALID_ADDRESS: 'INVALID_ADDRESS',
  LOADING: 'LOADING',
}

const ServiceOrderCheck = ({ data }: any) => {
  const { setChatState, setChatParams } = useChatState()
  const [status, setStatus] = useState(OUTAGE_STATUS.NONE)
  const [outageData, setOutageData] = useState({
    affectedServices: [],
    ettr: '',
  })
  const styles = useStyles()
  const {
    id,
    title,
    description,
    inputTitle,
    outageHeader,
    outageMessage,
    noOutageHeader,
    noOutageMessage,
    apiErrorHeader,
    addressCheckError,
    affectedServicesTitles,
    enterYourAddressPlaceholder,
    ettrTitle,
    serviceOutageNotificationText,
    serviceOutageAppText,
    serviceOutageAppLink,
    chatButtonText,
  } = data || {}

  const classes = useStyles()
  const [addressInput, setAddressInput] = useState('')
  const predictions = useAddressPredictor(useDebounce(addressInput, 300))
  const dispatch = useDispatch()
  const { selectedAddress } = useSelector((state: State) => state.bga)
  const inputRef: any = useRef(null)
  const showPredictions = predictions?.length > 0 && selectedAddress == null

  const scrollToContent = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth',
      })
    }
  }

  const postOutageEvent = async (serviceAddress: any) => {
    const payLoad = {
      header: {
        name: 'AddressNotFound',
        domain: 'address',
        subdomain: 'notification',
        source: 'DOTCOM',
        priority: 1,
        expiration: 24,
        messageId: uuidv4(),
        dateTime: moment(Date.now()).format('YYYY-MM-DDTHH:mm'),
      },
      body: {
        hasExistingService: false,
        address: {
          address: serviceAddress.address.addressLine1,
          address2: serviceAddress.address.addressLine2,
          city: serviceAddress.address.city,
          state: serviceAddress.address.stateProvince,
          postalCode: serviceAddress.address.zipCode,
        },
        reason: serviceAddress.inFootprint
          ? 'No Active Service at Present'
          : 'Not A Serviceable Address',
        addressKey: serviceAddress.addressKey,
        dateTime: moment(Date.now()).format('YYYY-MM-DDTHH:mm'),
      },
    }

    await APIClient.postEvent(payLoad)
  }

  const handleCheck = async (samRecords: any) => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: 'service outage check:submit',
        pageURL: window.location.href,
      },
      'tl_o',
      SERVICE_OUTAGE_CHECK,
    )

    if (!data || Object.keys(data || {}).length == 0) {
      return null
    }

    try {
      setStatus(OUTAGE_STATUS.LOADING)
      const response: any = await APIClient.createPegaInteraction({
        samRecords,
      })
      switch (true) {
        case response?.data == 'no account':
          DTMClient.triggerEvent(
            {
              events: 'event48',
              eVar48: "SOC|We can't find that service address",
              pageURL: window.location.href,
            },
            'tl_o',
            SERVICE_OUTAGE_CHECK,
          )
          return setStatus(OUTAGE_STATUS.ERROR)
        case response?.data?.MSIAlertFound == false:
          DTMClient.triggerEvent(
            {
              events: 'event41',
              eVar52: 'SOC|No service outage detected',
              pageURL: window.location.href,
            },
            'tl_o',
            SERVICE_OUTAGE_CHECK,
          )
          return setStatus(OUTAGE_STATUS.NO_OUTAGE)
        case response?.data?.MSIAlertFound == true:
          DTMClient.triggerEvent(
            {
              events: 'event41',
              eVar52: 'SOC|Service outage detected',
              eVar95: {
                severityLevel: response?.data?.MSISeverityLevel,
                affectedProducts: response?.data?.MSIServiceAffected,
                ETA: response?.data?.ETTR,
              },
              pageURL: window.location.href,
            },
            'tl_o',
            SERVICE_OUTAGE_CHECK,
          )

          let ettrDisplayVal: any = null
          if (response?.data?.ETTR) {
            const now = new Date()
            const ETTRdate = new Date(response.data.ETTR)

            if (ETTRdate.getTime() - now.getTime() > 0) {
              ettrDisplayVal = response.data.ETTR
            }
          }

          setOutageData({
            affectedServices: response?.data?.MSIServiceAffected,
            ettr: ettrDisplayVal,
          })
          return setStatus(OUTAGE_STATUS.OUTAGE)
        default:
          DTMClient.triggerEvent(
            {
              events: 'event41',
              eVar52: 'SOC|No service outage detected',
              pageURL: window.location.href,
            },
            'tl_o',
            SERVICE_OUTAGE_CHECK,
          )
          return setStatus(OUTAGE_STATUS.NO_OUTAGE)
      }
    } catch (error: any) {
      if (error?.response?.status === 400) {
        DTMClient.triggerEvent(
          {
            events: 'event48',
            eVar48: 'SOC|Invalid address entered',
            pageURL: window.location.href,
          },
          'tl_o',
          SERVICE_OUTAGE_CHECK,
        )
        return setStatus(OUTAGE_STATUS.INVALID_ADDRESS)
      }

      DTMClient.triggerEvent(
        {
          events: 'event48',
          eVar48: 'SOC|Error status ' + error?.response?.status,
          pageURL: window.location.href,
        },
        'tl_o',
        SERVICE_OUTAGE_CHECK,
      )
      return setStatus(OUTAGE_STATUS.ERROR)
    }
  }

  const renderInputContainer = () => {
    return (
      <div className={classes.inputContainerParent}>
        <div className={classes.inputContainer}>
          <input
            placeholder={enterYourAddressPlaceholder?.value}
            className={classes.input}
            value={addressInput}
            ref={inputRef}
            onChange={(e) => {
              setAddressInput(e.target.value)
              dispatch(bgaSlice.actions.setSelectedAddress(undefined))
            }}
          />
          <SearchIcon className={styles.searchIcon} />
        </div>
        <div className={clx({ [classes.predictiveLayover]: showPredictions })}>
          {showPredictions &&
            predictions?.map((address: any) => {
              return (
                <div
                  key={`address-${address?.addressKey}`}
                  className={classes.addressRecord}
                  onClick={async () => {
                    dispatch(bgaSlice.actions.setSelectedAddress(address))
                    await setAddressInput(
                      formSingleLineAddress(address?.address, true),
                    )
                    if (inputRef?.current) {
                      inputRef?.current?.focus()
                    }
                    addressCheck(address)
                  }}
                >
                  {formSingleLineAddress(
                    address?.address as SingleLineAddress,
                    true,
                  )}
                </div>
              )
            })}
        </div>
      </div>
    )
  }

  const addressCheck = async (selectedAddress: any) => {
    try {
      if (selectedAddress?.samRecords?.length === 0) {
        await postOutageEvent(selectedAddress)
        if (!selectedAddress?.inFootprint) {
          DTMClient.triggerEvent(
            {
              events: 'event48',
              eVar48: 'SOC|Invalid address entered',
              pageURL: window.location.href,
            },
            'tl_o',
            SERVICE_OUTAGE_CHECK,
          )
          setStatus(OUTAGE_STATUS.INVALID_ADDRESS)
        } else {
          DTMClient.triggerEvent(
            {
              events: 'event48',
              eVar48: 'SOC|Error status ' + OUTAGE_STATUS.ERROR,
              pageURL: window.location.href,
            },
            'tl_o',
            SERVICE_OUTAGE_CHECK,
          )
          setStatus(OUTAGE_STATUS.ERROR)
        }
      } else {
        handleCheck(selectedAddress.samRecords[0])
      }
    } catch (e: any) {
      DTMClient.triggerEvent(
        {
          events: 'event48',
          eVar48: 'SOC|Error status address check failed',
          pageURL: window.location.href,
        },
        'tl_o',
        SERVICE_OUTAGE_CHECK,
      )
    }
  }

  const handleChatClick = () => {
    setChatParams({
      launchOption: SERVICE_OUTAGE_LAUNCH_OPTION,
      samRecords: selectedAddress?.samRecords || [],
    })
    setChatState(true)
  }

  const renderStatus = () => {
    if (status === OUTAGE_STATUS.NONE) {
      return null
    }
    if (status === OUTAGE_STATUS.LOADING) {
      return <Loading className={styles.loading} />
    }
    if (status === OUTAGE_STATUS.NO_OUTAGE) {
      return (
        <div className={styles.outageHeaderContainer}>
          <div>
            <GreenCircleCheckOverlay />
          </div>
          <div>
            <InjectHTML
              addAnchorStyles
              styleType="h4"
              tagType="h4"
              value={noOutageHeader?.value}
            />
          </div>
          <div>
            <InjectHTML addAnchorStyles value={noOutageMessage?.value} />
            <div
              data-testid="bannerChatButton"
              className={styles.chatContainer}
            >
              <Button
                type="button"
                text={chatButtonText?.value}
                onClick={handleChatClick}
              />
            </div>
          </div>
        </div>
      )
    }
    if (status === OUTAGE_STATUS.OUTAGE) {
      return (
        <div className={styles.outageHeaderContainer}>
          <div>
            <WarningOutline />
          </div>
          <div>
            <InjectHTML
              addAnchorStyles
              styleType="h4"
              tagType="h4"
              value={outageHeader?.value}
            />
          </div>
          {outageData?.ettr && (
            <div>
              <div>
                <h6 className={styles.removeMargin}>
                  {ettrTitle?.value}
                  <p className={styles.outageEttr}>
                    <Clock className={styles.clockIcon} />
                    {outageData?.ettr}
                  </p>
                </h6>
              </div>
            </div>
          )}
          <div>
            <div>
              <InjectHTML
                addAnchorStyles
                styleType="h6"
                tagType="h6"
                value={affectedServicesTitles?.value}
              />
            </div>
            <ul className={styles.affectedServices}>
              {outageData?.affectedServices?.map((item: any) => {
                return <li key={`${item}-outageItem`}>{item}</li>
              })}
            </ul>
          </div>
          <div>
            <div>
              <p className={styles.addPhoneDescription}>
                {outageMessage?.value}
                <p
                  className={styles.getOutageUpdates}
                  onClick={() => scrollToContent('getoutageupdates')}
                >
                  {serviceOutageNotificationText?.value}
                </p>
              </p>
            </div>
          </div>
          <div className={styles.appBox}>
            <div className={styles.appLogo}>
              <Logo />
            </div>
            <InjectHTML
              addAnchorStyles
              tagType="div"
              value={serviceOutageAppText?.value}
              className={styles.appText}
            />
            <div className={styles.appLink}>
              <a href={serviceOutageAppLink?.value}>
                <RightArrowIcon />
              </a>
            </div>
          </div>
        </div>
      )
    }
    const errorMessage =
      status === OUTAGE_STATUS.INVALID_ADDRESS
        ? addressCheckError?.value
        : apiErrorHeader?.value
    return (
      <div className={styles.error}>
        <p className={styles.error}>{errorMessage ?? apiErrorHeader?.value}</p>
      </div>
    )
  }

  return (
    <div className={clx(styles.root, styles.serviceOrderCheck)} id={id?.value}>
      {title?.value && (
        <InjectHTML
          addAnchorStyles
          tagType="h2"
          styleType="h4"
          className={styles.title}
          value={title?.value}
        />
      )}
      {description?.value && (
        <InjectHTML
          addAnchorStyles
          tagType="p"
          styleType="p1"
          value={description?.value as string}
        />
      )}
      {inputTitle?.value && (
        <InjectHTML
          addAnchorStyles
          tagType="p"
          styleType="p1"
          value={inputTitle?.value as string}
        />
      )}
      {renderInputContainer()}
      <div className={styles.renderStatus}>{renderStatus()}</div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    padding: '2rem 2rem 1rem',
    marginBottom: 80,
    borderRadius: 32,
    [breakpoints.down('sm')]: {
      marginBottom: 32,
      padding: 16,
    },
  },
  inputContainerParent: {
    position: 'relative',
  },
  title: {
    marginBottom: 16,
  },
  inputContainer: {
    width: '100%',
    flex: 1,
    height: 50,
    borderRadius: '25px',
    display: 'flex',
    background: colors.main.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    position: 'relative',
    borderStyle: 'solid',
    borderColor: colors.main.midnightExpress,
    borderWidth: '1px 1px 1px 1px',
  },
  input: {
    width: '100%',
    height: 48,
    outline: 'none',
    border: 'none',
    // background: 'transparent',
    // color: colors.main.white,
    fontSize: '1rem',
    margin: '0 8px',
    fontFamily: PP_OBJECT_SANS,
    '&::placeholder': {
      color: colors.main.backgroundGray,
    },
  },
  button: {
    marginTop: 32,
    display: 'flex',
    fontSize: 18,
  },
  renderStatus: {
    margin: '20px 0px',
  },
  loading: {
    margin: 0,
  },
  removeMargin: {
    marginTop: 0,
    marginBottom: '32px !important',
  },
  messageHeaderContainer: {
    display: 'flex',
    gap: 8,
    '& svg': {
      marginTop: 4,
      height: 20,
      width: 20,
    },
  },
  outageHeaderContainer: {
    display: 'flex',
    flexDirection: 'column',
    '& svg': {
      height: 29.3,
      width: 29.3,
    },
    background: colors.main.white,
    borderRadius: '32px',
    padding: '48px 32px',
  },
  clockIcon: {
    height: '22.5px !important',
    width: '20.575593948364258px !important',
    marginLeft: '8.92px',
    marginRight: '8.92px',
    top: '0.5px',
    borderRadius: '0px',
    color: colors.main.dark,
  },
  outageEttr: {
    display: 'inline',
    fontWeight: 400,
  },
  getOutageUpdates: {
    display: 'inline',
    fontWeight: 600,
    textDecoration: 'underline',
    cursor: 'pointer',
    marginLeft: 8,
    '&:hover': {
      color: colors.main.brightRed,
    },
  },
  appBox: {
    background: colors.main.blue,
    borderRadius: 10,
    padding: 16,
    gap: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    ['@media screen and (max-width: 1023px)']: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: 16,
      gap: 16,
    },
  },
  appLogo: {
    width: 60,
    height: 60,
    borderRadius: 16,
    gap: 5,
    padding: 11,
    background: colors.main.midnightExpress,
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      width: 38,
      height: 37.05,
      top: 0.44,
    },
  },
  appText: {
    maxWidth: 484,
    fontFamily: 'PP Object Sans',
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '26px',
    color: colors.main.midnightExpress,
    alignItems: 'center',
    ['@media screen and (max-width: 1023px)']: {
      fontSize: 16,
      lineHeight: 'auto',
      alignSelf: 'stretch',
      flexGrow: 0,
    },
  },
  appLink: {
    width: 24,
    height: 24,
    flex: 'none',
    order: 2,
    flexGrow: 0,
    '& svg': {
      width: 24,
      height: 24,
    },
    '& path': {
      stroke: colors.main.midnightExpress,
    },
  },
  success: {
    '& path': {
      stroke: colors.main.green,
    },
  },
  error: {
    margin: '-12px 0 0 0',
    '& p': {
      fontFamily: 'PP Object Sans',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '18px',
      letterSpacing: '-0.01em',
      textAlign: 'left',
      color: colors.main.activeSliderRed,
    },
  },
  affectedServices: {
    '& li': {
      fontFamily: 'PP Object Sans',
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: '26px',
      color: colors.main.midnightExpress,
    },
  },
  addPhoneDescription: {
    marginTop: 16,
    fontFamily: 'PP Object Sans',
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '26px',
    letterSpacing: '0em',
    textAlign: 'left',
  },
  searchIcon: {
    '& path': {
      stroke: colors.main.midnightExpress,
      width: 18.33,
      height: 18.33,
    },
    marginRight: 15,
  },
  predictiveLayover: {
    position: 'absolute',
    top: '50px',
    marginTop: 5,
    background: colors.main.white,
    left: 'auto',
    width: '100%',
    borderRadius: 32,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.main.midnightExpress,
    textAlign: 'left',
    zIndex: 9,
  },
  addressRecord: {
    padding: '8px 16px',
    margin: '4px 8px',
    cursor: 'pointer',
    '&:hover': {
      color: colors.main.brightRed,
    },
  },
  serviceOrderCheck: {
    backgroundColor: colors.main.grey,
    marginTop: 80,
    '& h6': {
      fontFamily: 'PP Object Sans',
      fontSize: '18px',
      fontWeight: 700,
      lineHeight: '26px',
      letterSpacing: '0em',
      textAlign: 'left',
      marginBottom: 0,
    },
    '& h4': {
      fontFamily: 'PP Object Sans',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '30px',
      lineHeight: '38px',
      letterSpacing: '-0.01em',
      margin: '17px 0 32px 0',
    },
    [breakpoints.down('xs')]: {
      marginTop: 16,
    },
  },
  chatContainer: {
    marginTop: 32,
  },
}))

export default ServiceOrderCheck
