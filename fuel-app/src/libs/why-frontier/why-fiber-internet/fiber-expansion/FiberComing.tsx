import { InjectHTML, Typography } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'src/redux/types'
import { formSingleLineAddress } from 'src/utils/addressHelpers'
import { bgaSlice } from 'src/redux/slicers'
import colors from '@/shared-ui/colors'
import CampaignForm from './CampaignForm'
import { haveFiberNet } from 'src/redux/slicers/bga'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { useAppData } from 'src/hooks'

const FiberComing = () => {
  const { header, subheader, editAddress, signupText } = useAppData(
    'fiberComing',
    true,
  )
  const classes = useStyles()
  const { selectedAddress, fiberComingDate, scenario } = useSelector(
    (state: State) => state?.bga,
  )
  const singleLineAddress =
    selectedAddress?.address != null
      ? formSingleLineAddress(selectedAddress?.address, true)
      : ''
  const dispatch = useDispatch()

  const handleEdit = () => {
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
    dispatch(bgaSlice.actions.setStep('fiber_is_coming_success'))
  }

  return (
    <div className={classes.container}>
      {header?.value && (
        <InjectHTML
          tagType="h2"
          styleType="h4"
          color="secondary"
          className={classes.title}
          value={header?.value}
        />
      )}
      {subheader?.value && (
        <InjectHTML
          tagType="h5"
          styleType="h5"
          color="tertiary"
          className={classes.description}
          value={subheader?.value}
        />
      )}
      <div className={classes.addressWrapper}>
        <Typography
          color="tertiary"
          tagType="p"
          styleType="h6"
          fontType="regularFont"
          className={classes.adderessText}
        >
          {singleLineAddress}
        </Typography>
        <button onClick={handleEdit} className={classes.editBtn}>
          {editAddress?.value && (
            <Typography color="tertiary" className={classes.editAddressBtnText}>
              {editAddress?.value}
            </Typography>
          )}
        </button>
      </div>
      <div className={classes.signup}>
        {signupText?.value && (
          <InjectHTML
            tagType="h5"
            styleType="h6"
            color="tertiary"
            className={classes.signupHeader}
            value={signupText?.value}
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
    maxWidth: 600,
    margin: 'auto',
    marginBottom: 16,
    fontSize: '42px',
    [breakpoints.down('xs')]: {
      fontSize: '24px',
    },
  },
  adderessText: {
    fontSize: '30px',
    [breakpoints.down('xs')]: {
      fontSize: '20px',
    },
  },
  description: {
    maxWidth: 600,
    margin: 'auto',
    fontSize: '30px !important',
    [breakpoints.down('xs')]: {
      fontSize: '20px !important',
    },
  },
  addressWrapper: {
    margin: 'auto',
    display: 'flex',
    alignItems: 'start',
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: '32px',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  editBtn: {
    background: 'transparent',
    border: 0,
    marginLeft: 8,
    cursor: 'pointer',
    [breakpoints.down('xs')]: {
      marginLeft: 0,
      padding: 0,
      fontSize: '18px !important',
    },
  },
  editAddressBtnText: {
    textDecoration: 'underline',
    '&:hover': {
      color: colors.main.brightRed,
    },
    fontSize: '18px !important',
    [breakpoints.down('xs')]: {
      fontSize: '18px !important',
    },
  },
  signup: {
    display: 'flex',
    flexDirection: 'column',
  },
  signupHeader: {
    textAlign: 'left',
    fontSize: '24px',
    [breakpoints.down('xs')]: {
      fontSize: '18px',
    },
  },
}))

export default FiberComing
