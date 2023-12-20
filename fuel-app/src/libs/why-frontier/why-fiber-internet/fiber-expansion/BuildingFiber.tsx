import { InjectHTML, Typography } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'src/redux/types'
import { formSingleLineAddress } from 'src/utils/addressHelpers'
import CampaignForm from './CampaignForm'
import { bgaSlice } from 'src/redux/slicers'
import colors from '@/shared-ui/colors'
import { haveFiberNet } from 'src/redux/slicers/bga'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { useAppData } from 'src/hooks'

const BuildingFibre = () => {
  const { header, subheader, editAddress, signupText } = useAppData(
    'buildingFiber',
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
    dispatch(bgaSlice.actions.setStep('building_fiber_success'))
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
      {signupText?.value && (
        <InjectHTML
          tagType="h5"
          styleType="h5"
          color="tertiary"
          className={classes.banner}
          value={signupText?.value}
        />
      )}
      <CampaignForm onSubmit={handleSubmit} />
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
    fontSize: 42,
    [breakpoints.down('xs')]: {
      fontSize: 24,
    },
  },
  description: {
    maxWidth: 600,
    margin: 'auto',
    fontSize: 30,
    [breakpoints.down('xs')]: {
      fontSize: 20,
    },
  },
  banner: {
    marginTop: 32,
    textAlign: 'left',
  },
  addressWrapper: {
    margin: 'auto',
    // maxWidth: 600,
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginTop: 8,
    '& p': {
      fontSize: 30,
    },
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    [breakpoints.down('xs')]: {
      marginTop: 0,
      '& p': {
        fontSize: 20,
      },
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
    },
  },
  editAddressBtnText: {
    fontSize: '15px',
    textDecoration: 'underline',
    '&:hover': {
      color: colors.main.brightRed,
    },
    [breakpoints.down('xs')]: {
      fontSize: 18,
    },
  },
}))

export default BuildingFibre
