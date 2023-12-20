import colors from '@/shared-ui/colors'
import { Button, InjectHTML, Typography } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import { makeStyles } from '@material-ui/core'
import { useState } from 'react'
import {
  COMPONENT_WRAPPER,
  CTA_BUTTON,
  RETURNS_FIND,
  RETURNS_FIND_ACCOUNT,
  RETURNS_FIND_SERVICES,
  SITE_ERROR,
  SITE_INTERACTION,
} from 'src/constants'
import { Input } from 'src/ui-kit'
import { useDispatch } from 'react-redux'
import { equipmentReturnFindSlice } from 'src/redux/slicers'
import APIClient from 'src/api-client'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { WarningOutline } from '@/shared-ui/react-icons/index'
import { PP_OBJECT_SANS_BOLD } from 'src/constants/fontFamilyNames'

const ReturnsFind = () => {
  const classes = useStyles()
  let getServiceAPIResponse: any
  const data = useAppData('returnsFind', true)
  const [value, setValue] = useState('')
  const [isError, setAPIError] = useState<boolean>(false)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(false)
  if (!data || Object.keys(data).length === 0) {
    return null
  }
  const { title, description, label, buttonLabel, errorMessage } = data

  const handleChange = (e: any) => {
    setValue(e.target.value)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      setAPIError(false)
      const reqbody = {
        accountNumber: value,
        type: 'account_from_usi',
      }
      await APIClient.postSession(reqbody)
      DTMClient.triggerEvent(
        {
          events: 'event2',
          eVar2: 'returns-find',
        },
        'tl_o',
        RETURNS_FIND,
      )
    } catch (error) {
      setLoading(false)
      setAPIError(true)
      DTMClient.triggerEvent(
        {
          events: 'event88',
          eVar2: RETURNS_FIND_ACCOUNT,
          eVar88: 'Failed to fetch session',
        },
        'tl_o',
        SITE_ERROR,
      )
    }
    try {
      getServiceAPIResponse = await APIClient.getServices(true, true)
      await dispatch(
        equipmentReturnFindSlice.actions.getServicesResponse(
          getServiceAPIResponse,
        ),
      )
    } catch (error) {
      setLoading(false)
      setAPIError(true)
      DTMClient.triggerEvent(
        {
          events: 'event88',
          eVar2: RETURNS_FIND_SERVICES,
          eVar88: 'Failed to fetch service',
        },
        'tl_o',
        SITE_ERROR,
      )
    }
    try {
      const getEquipmentData = await APIClient.equipmentsFindGet(
        getServiceAPIResponse?.data[0].id,
      )
      if (getEquipmentData) {
        await dispatch(
          equipmentReturnFindSlice.actions.setEquipmentData(getEquipmentData),
        )
        await dispatch(
          equipmentReturnFindSlice.actions.setStep('EQUIPMENT_LIST'),
        )
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      setAPIError(true)
      DTMClient.triggerEvent(
        {
          events: 'event88',
          eVar2: RETURNS_FIND,
          eVar88: 'Failed to fetch',
        },
        'tl_o',
        SITE_ERROR,
      )
    }
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.section}>
        <Typography styleType="h4" tagType="h2" className={classes.header}>
          {title?.value}
        </Typography>
        <InjectHTML
          addAnchorStyles
          styleType="p2"
          value={description?.value}
          className={classes.description}
        />
        <div className={classes.inputContainer}>
          <Input
            label={label.value}
            name={'refernceNumber'}
            inputClassName={classes.inputRootContainer}
            value={value}
            fullWidth
            onChange={handleChange}
            required={true}
            className={classes.inputBox}
          />

          <div className={classes.alignCenter}>
            <Button
              type="submit"
              variant="primary"
              onClick={(event) => handleSubmit(event)}
              className={classes.btn}
              text={buttonLabel.value}
              eventObj={{
                events: 'event14',
                eVar14: `${CTA_BUTTON}:returns-find`,
              }}
              isBusy={loading}
              interactionType={SITE_INTERACTION}
              disabled={value === '' || value.length < 11}
            />
          </div>
        </div>
        {isError && (
          <Typography>
            <span className={classes.errorContainer}>
              <WarningOutline height={24} width={24} />
              <Typography styleType="p2" className={classes.errorMessage}>
                {errorMessage?.value}
              </Typography>
            </span>
          </Typography>
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    textAlign: 'left',
  },
  warningContainer: {
    display: 'flex',
  },
  header: {
    marginTop: '1.5rem',
    fontSize: '2.25rem',
    lineHeight: '2.5rem',
  },
  errorMessage: {
    fontFamily: PP_OBJECT_SANS_BOLD,
  },

  errorContainer: {
    display: 'flex',
    alignItems: 'top',
    gap: 4,
  },
  inputRootContainer: {
    height: '45px',
  },
  warningIcon: {
    width: 100,
    margin: '0 auto',
  },

  section: {
    padding: '4.25rem 0',
    textAlign: 'left',
    margin: '0 auto',
    maxWidth: '75%',
    justifyContent: 'flex-start',
    gap: '2rem',
    [breakpoints.down('xs')]: {
      gap: '0',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '2rem 0',
    },
  },
  description: {
    paddingTop: '1.25rem',
    maxWidth: 'auto',
    margin: 'auto',
    [breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '2rem',
    marginTop: '1rem',
    [breakpoints.down('xs')]: {
      gap: 0,
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
  inputBox: {
    margin: '10px 0px',
    width: `calc(55% - 50px)`,
    '& .MuiFormHelperText-root': {
      color: colors.main.brightRed,
      marginLeft: 4,
      marginTop: 8,
    },
    '& .MuiInputLabel-root': {
      fontSize: '14px',
    },
    '& div:hover': {
      borderColor: colors.main.black,
      outline: 'none',
    },
    '& div.Mui-focused': {
      borderColor: colors.main.greenishBlue,
    },
    [breakpoints.down('sm')]: {
      margin: '10px 0px',
      width: `100%`,
    },
  },
  alignCenter: {
    textAlign: 'start',
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  btn: {
    marginTop: 16,
    marginBottom: 24,
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}))

export default ReturnsFind
