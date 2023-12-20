import { useRef, useState, useEffect } from 'react'
import { InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import { ChevronRight, MapCurve } from '@/shared-ui/react-icons'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import clx from 'classnames'
import colors from '@/shared-ui/colors'
import { useAddressPredictor, useDebounce } from 'src/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'src/redux/types'
import {
  formSingleLineAddress,
  SingleLineAddress,
} from 'src/utils/addressHelpers'
import { bgaSlice } from 'src/redux/slicers'
import { generateAndPost } from 'src/redux/slicers/bga'
import { UNVERIFIED_SERVICE_AREA, WHY_FRONTIER_PAGE } from 'src/constants'
import { useAppData } from 'src/hooks'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'
import APIClient from 'src/api-client'
import { Loading } from '@/shared-ui/components'

const CheckAvailability = ({
  isSectionFixed,
  handleScrollToSection,
}: {
  isSectionFixed: boolean
  handleScrollToSection: () => void
}) => {
  const {
    checkAvailabilityTitle,
    enterYourAddressPlaceholder,
    checkAvailabilityStickyTitle,
  } = useAppData('availability', true)
  const [showLoading, setShowLoading] = useState(false)
  const [addressInput, setAddressInput] = useState('')
  const predictions = useAddressPredictor(useDebounce(addressInput, 300))
  const [serviceType, setServiceType] = useState('')
  const dispatch = useDispatch()
  const { selectedAddress, status, scenario, addressKey } = useSelector(
    (state: State) => state.bga,
  )
  const inputRef: any = useRef(null)
  const showPredictions = predictions?.length > 0 && selectedAddress == null

  const isContinueEnabled =
    selectedAddress != null && status.length > 0 && scenario != 'UNDETERMINABLE'
  const classes = useStyles()

  useEffect(() => {
    if (serviceType === 'UNDETERMINABLE')
      dispatch(bgaSlice.actions.setStep('nominate_area'))
  }, [serviceType])

  useEffect(() => {
    if (addressKey.controlNumber && addressKey.environment) {
      skipInput(addressKey.environment, addressKey.controlNumber)
    }
  }, [addressKey])

  useEffect(() => {
    selectedAddress && isContinueEnabled && handleSubmit()
  }, [selectedAddress, isContinueEnabled])

  const skipInput = async (environment: string, controlNumber: string) => {
    setShowLoading(true)
    const data = await APIClient.getAddressDetails(environment, controlNumber)
    await addressCheck(data?.data)
    dispatch(bgaSlice.actions.setSelectedAddress(data?.data))
    if (data?.data) setShowLoading(false)
  }

  const addressCheck = async (selectedAddress: any) => {
    try {
      if (selectedAddress?.samRecords?.length === 0) {
        if (!selectedAddress?.inFootprint) {
          dispatch(bgaSlice.actions.setScenario('OUT_OF_FOOTPRINT'))
          handleScrollToSection()
        } else dispatch(bgaSlice.actions.setScenario('UNDETERMINABLE'))
        dispatch(bgaSlice.actions.setStep('nominate_area'))
      } else {
        const serviceType: any = await dispatch(
          generateAndPost(selectedAddress),
        )
        setServiceType(serviceType)
      }
    } catch (e: any) {
      DTMClient.triggerEvent(
        {
          events: 'event28',
          pageName: WHY_FRONTIER_PAGE,
          prop31: e?.response?.data,
          eVar50: selectedAddress.address.zipCode,
        },
        't1_0',
        'service check',
      )
    }
  }

  const handleSubmit = async () => {
    if (!isContinueEnabled) {
      return null
    }
    handleScrollToSection()
    const domain = window?.location?.origin || ''
    let events = ['event30']
    let variables: any = {
      pageName: WHY_FRONTIER_PAGE,
      eVar65: domain,
      eVar69: serviceType,
      eVar70: 'PreSale:No',
      eVar49: UNVERIFIED_SERVICE_AREA,
      prop40: '',
      eVar50: selectedAddress.address.zipCode,
    }
    if (serviceType === 'FIBER_AVAILABLE') {
      events = ['event30', 'event100', 'event156']
      variables = {
        pageName: WHY_FRONTIER_PAGE,
        eVar65: domain,
        eVar49: 'In service area',
        eVar50: selectedAddress.address.zipCode,
        eVar69: serviceType,
        eVar70: 'PreSale:Yes',
        prop40: '',
      }
    }
    if (status != undefined && status != '' && status === 'SUCCESS') {
      DTMClient.triggerEvent(
        {
          events,
          ...variables,
        },
        't1_0',
        'service check',
      )
      if (
        scenario == undefined ||
        scenario == '' ||
        scenario === 'OUT_OF_FOOTPRINT' ||
        'UNDETERMINABLE'
      ) {
        dispatch(bgaSlice.actions.setStep('nominate_area'))
      }
      if (scenario === 'PAL_NEEDED') {
        dispatch(bgaSlice.actions.setStep('nominate_area'))
      } else if (scenario === 'PAL_CONFIRMED_COPPER_UNAVAILABLE') {
        dispatch(bgaSlice.actions.setStep('fiber_is_coming'))
      } else if (scenario === 'PAL_CONFIRMED_COPPER_AVAILABLE') {
        dispatch(bgaSlice.actions.setStep('fiber_is_coming'))
      } else if (scenario === 'NO_FIBER_PLANS_COPPER_AVAILABLE') {
        dispatch(bgaSlice.actions.setStep('nominate_area'))
      } else if (scenario === 'NO_FIBER_PLANS_COPPER_UNAVAILABLE') {
        dispatch(bgaSlice.actions.setStep('nominate_area'))
      } else if (scenario === 'FUTURE_FIBER_COPPER_AVAILABLE') {
        dispatch(bgaSlice.actions.setStep('fiber_is_coming'))
      } else if (scenario === 'FUTURE_FIBER_COPPER_UNAVAILABLE') {
        dispatch(bgaSlice.actions.setStep('fiber_is_coming'))
      } else if (scenario === 'BUILDING_FIBER_COPPER_AVAILABLE') {
        dispatch(bgaSlice.actions.setStep('building_fiber'))
      } else if (scenario === 'BUILDING_FIBER_COPPER_UNAVAILABLE') {
        dispatch(bgaSlice.actions.setStep('building_fiber'))
      } else if (scenario === 'FIBER_AVAILABLE') {
        dispatch(bgaSlice.actions.setStep('fiber_is_available'))
      }
    }
  }

  const handleInputKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const renderInputContainer = () => {
    return (
      <div className={classes.inputContainer}>
        <MapCurve color={colors.main.white} />
        <input
          placeholder={enterYourAddressPlaceholder?.value}
          className={classes.input}
          value={addressInput}
          ref={inputRef}
          onKeyDown={handleInputKeyDown}
          onChange={(e) => {
            setAddressInput(e.target.value)
            dispatch(bgaSlice.actions.setSelectedAddress(undefined))
          }}
        />
        <button
          className={classes.submitBtn}
          disabled={!isContinueEnabled}
          onClick={handleSubmit}
        >
          <ChevronRight color={colors.main.white} />
        </button>
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

  return (
    <>
      {showLoading ? (
        <Loading className={classes.loaderArea} />
      ) : (
        <div className={classes.container}>
          <div
            className={clx(classes.largeComponent, {
              [classes.hideLargeComponent]: isSectionFixed,
            })}
          >
            {checkAvailabilityTitle?.value && (
              <InjectHTML
                tagType="h2"
                styleType="h4"
                color="tertiary"
                className={classes.title}
                value={checkAvailabilityTitle?.value}
              />
            )}
            {renderInputContainer()}
          </div>
          <div
            className={clx(classes.stickyComponent, {
              [classes.hideStickyComponent]: !isSectionFixed,
            })}
          >
            {checkAvailabilityStickyTitle?.value && (
              <InjectHTML
                styleType="p1"
                fontType="boldFont"
                color="tertiary"
                value={checkAvailabilityStickyTitle?.value}
              />
            )}
            {renderInputContainer()}
          </div>
        </div>
      )}
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    textAlign: 'center',
  },
  title: {
    maxWidth: 600,
    margin: 'auto',
    marginBottom: 32,
    fontSize: '42px',
    lineHeight: '3rem',
    '& span': {
      fontSize: '42px !important',
    },
    [breakpoints.down('xs')]: {
      fontSize: '24px',
      lineHeight: '1.75rem',
      '& span': {
        fontSize: '24px !important',
      },
    },
  },
  inputContainer: {
    width: '100%',
    flex: 1,
    height: 50,
    borderRadius: '25px',
    display: 'flex',
    background: colors.main.highlightWhite,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    position: 'relative',
  },
  input: {
    width: '100%',
    height: 50,
    outline: 'none',
    border: 0,
    background: 'transparent',
    color: colors.main.white,
    fontSize: '1rem',
    margin: '0 8px',
    fontFamily: PP_OBJECT_SANS,
    '&::placeholder': {
      color: colors.main.white,
    },
  },
  predictiveLayover: {
    position: 'absolute',
    top: 55,
    background: colors.main.white,
    left: 8,
    width: 'calc(100% - 8px)',
    borderRadius: 16,
    border: '1px solid',
    borderColor: colors.main.gray,
    borderTop: 'none',
    maxWidth: 600,
    textAlign: 'left',
    zIndex: 9,
  },
  addressRecord: {
    padding: '8px 16px',
    margin: '4px 8px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: colors.main.newBackgroundGray,
      fontWeight: 700,
      borderRadius: 40,
    },
  },
  inputWithPredictions: {
    borderBottomLeftRadius: '0!important',
    borderBottomRightRadius: '0!important',
  },
  submitBtn: {
    backgroundColor: colors.main.brightRed,
    border: 0,
    height: 40,
    width: 46,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    borderRadius: '50%',
    marginRight: 5,
    cursor: 'pointer',
    '& svg': {
      height: 16,
    },
    '&:disabled': {
      opacity: 0.2,
      cursor: 'not-allowed',
    },
    [breakpoints.down('xs')]: {
      width: 56,
    },
    zIndex: 9,
  },
  largeComponent: {
    transition: '.1s all',
  },
  stickyComponent: {
    transition: '.3s all',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  hideLargeComponent: {
    opacity: 0,
    transition: '.0s all',
    height: 0,
  },
  hideStickyComponent: {
    opacity: 0,
    height: 0,
    transition: '.0s all',
  },
  loaderArea: {
    marginTop: 0,
    marginBottom: 0,
  },
}))

export default CheckAvailability
