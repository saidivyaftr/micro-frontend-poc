import { useEffect, useState } from 'react'
import { InjectHTML, Typography } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import CampaignForm from './CampaignForm'
import { useDispatch, useSelector } from 'react-redux'
import { bgaSlice } from 'src/redux/slicers'
import { State } from 'src/redux/types'
import { formSingleLineAddress } from 'src/utils/addressHelpers'
import colors from '@/shared-ui/colors'
import { haveFiberNet } from 'src/redux/slicers/bga'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { useAppData } from 'src/hooks'

const NominateYourArea = () => {
  const {
    nominateTitle,
    editAddress,
    signupText,
    signupSubText,
    nominateTitleNOPAL,
    signupTextNOPAL,
    signupSubTextNOPAL,
  } = useAppData('availability', true)

  const buildingFiber = useAppData('buildingFiber', true)
  const classes = useStyles()
  const dispatch = useDispatch()
  const { selectedAddress, scenario, fiberComingDate } = useSelector(
    (state: State) => state?.bga,
  )
  const [isFuture, setIsFuture] = useState(false)
  const [formTitle, setTitle] = useState('')
  const [formText, setText] = useState('')
  const [formSubText, setSubText] = useState('')
  const singleLineAddress =
    selectedAddress?.address != null
      ? formSingleLineAddress(selectedAddress?.address, true)
      : ''

  const handleEdit = () => {
    DTMClient.triggerEvent({
      events: 'event14',
      eVar14: 'bga:BGANominateAddress',
      pageURL: window.location.href,
    })
    dispatch(bgaSlice.actions.setStep('check_availability'))
    dispatch(bgaSlice.actions.setSelectedAddress(undefined))
    dispatch(bgaSlice.actions.setStatus(''))
  }

  const sendAnalytics = () => {
    DTMClient.triggerEvent(
      {
        events: 'event2',
        eVar2: 'bga nomination',
      },
      'tl_o',
      'form submit',
    )
  }

  const handleSubmit = (data: any) => {
    sendAnalytics()
    data.fiberComingDate = fiberComingDate
    data.scenario = scenario
    dispatch(haveFiberNet(selectedAddress!, data))
    dispatch(bgaSlice.actions.setStep('building_fiber_success'))
  }

  useEffect(() => {
    setIsFuture(scenario.includes('FUTURE'))

    if (scenario === 'PAL_NEEDED') {
      setTitle(nominateTitleNOPAL?.value)
      setText(signupTextNOPAL?.value)
      setSubText(signupSubTextNOPAL?.value)
    } else {
      setTitle(nominateTitle?.value)
      setText(signupText?.value)
      setSubText(signupSubText?.value)
    }
  }, [scenario])

  return (
    <div className={classes.container}>
      {!isFuture && (
        <InjectHTML
          tagType="h2"
          styleType="h4"
          color="secondary"
          className={classes.title}
          value={formTitle}
        />
      )}
      {isFuture && (
        <>
          <InjectHTML
            tagType="h2"
            styleType="h4"
            color="secondary"
            className={classes.title}
            value={buildingFiber?.header?.value}
          />
        </>
      )}
      <div className={classes.addressWrapper}>
        {isFuture && (
          <Typography color="tertiary" tagType="div" styleType="h6">
            {buildingFiber?.subheader?.value}
          </Typography>
        )}
        <Typography
          color="tertiary"
          tagType="div"
          styleType="p2"
          className={classes.singleLineAddress}
        >
          {singleLineAddress}
        </Typography>
        <button onClick={handleEdit} className={classes.editBtn}>
          <Typography color="tertiary" className={classes.editAddressBtnText}>
            {editAddress?.value}
          </Typography>
        </button>
      </div>
      <div className={classes.signup}>
        {!isFuture && (
          <>
            <InjectHTML
              tagType="h5"
              styleType="h5"
              color="tertiary"
              className={classes.signupHeader}
              value={formText}
            />
            <InjectHTML
              tagType="p"
              styleType="p2"
              color="tertiary"
              className={classes.signupSubHeader}
              value={formSubText}
            />
          </>
        )}
        {isFuture && (
          <InjectHTML
            tagType="h5"
            styleType="h5"
            color="secondary"
            className={classes.signupHeader}
            value={buildingFiber?.signupText?.value}
          />
        )}
        <CampaignForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    textAlign: 'center',
  },
  title: {
    margin: 'auto',
    marginBottom: 16,
    fontSize: '42px',
    lineHeight: '50px',
    [breakpoints.down('xs')]: {
      margin: '0px',
    },
    [breakpoints.down('xs')]: {
      fontSize: '24px',
      lineHeight: '32px',
    },
  },
  addressWrapper: {
    margin: 'auto',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    '& p': {
      display: 'inline',
      fontSize: 16,
    },
    [breakpoints.down('xs')]: {
      alignItems: 'center',
      '& p': {
        display: 'flex',
        flexDirection: 'column',
        fontSize: 16,
      },
    },
    marginTop: 16,
  },
  editBtn: {
    background: 'transparent',
    border: 0,
    marginLeft: 8,
    cursor: 'pointer',
    [breakpoints.down('xs')]: {
      marginLeft: 0,
      paddingLeft: '5px',
    },
  },
  editAddressBtnText: {
    fontSize: '18px',
    textDecoration: 'underline',
    lineHeight: '26px',
    '&:hover': {
      color: colors.main.brightRed,
    },
    [breakpoints.down('xs')]: {
      fontSize: 16,
      lineHeight: '24px',
    },
  },
  signup: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '32px',
    [breakpoints.down('xs')]: {
      fontSize: '1.125rem',
    },
  },
  signupHeader: {
    textAlign: 'left',
    [breakpoints.down('xs')]: {
      paddingLeft: 0,
      fontSize: '1.125rem',
      lineHeight: '1.625rem',
    },
  },
  signupSubHeader: {
    textAlign: 'left',
    marginBottom: 0,
    fontSize: '18px',
    lineHeight: '26px',
    marginTop: '8px',
    [breakpoints.down('xs')]: {
      fontSize: '1rem',
      paddingLeft: 0,
      lineHeight: '1.5rem',
    },
  },
  singleLineAddress: {
    fontSize: '30px !important',
    lineHeight: '38px',
    [breakpoints.down('xs')]: {
      fontSize: '20px !important',
      lineHeight: '28px',
    },
  },
}))

export default NominateYourArea
