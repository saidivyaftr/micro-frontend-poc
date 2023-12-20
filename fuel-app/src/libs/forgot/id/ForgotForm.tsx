import React, { useState, Dispatch, SetStateAction, useRef } from 'react'
import APIClient from 'src/api-client'
import clx from 'classnames'
import colors from '@/shared-ui/colors'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { siteInteractionConstant } from 'src/constants/forgotId'
import { makeStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'
import { Button } from '@/shared-ui/components'
import { useAddressPredictor, useDebounce } from '@/shared-ui/hooks'
import {
  formSingleLineAddress,
  SingleLineAddress,
} from 'src/utils/addressHelpers'
import { Typography } from '@/shared-ui/components'
import { stateConstant } from 'src/constants/forgotId'
import { useAppData } from 'src/hooks'
interface PageProps {
  setForgotId?: Dispatch<SetStateAction<string>>
  setForgotIdResponse?: Dispatch<SetStateAction<string>>
  setUserSelectedEmail?: Dispatch<SetStateAction<string>>
  setShowSystemErrorModal?: Dispatch<SetStateAction<boolean>>
  disableInput?: boolean
}

const ForgotForm = ({
  setForgotId,
  setForgotIdResponse,
  setUserSelectedEmail,
  setShowSystemErrorModal,
  disableInput,
}: PageProps) => {
  const classes = useStyles()
  const inputRef: any = useRef(null)
  const forgotIdContent = useAppData('ForgotIdContent', true) || {}
  const [addressInput, setAddressInput] = useState('')
  const [lastName, setLastName] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedServiceAddress, setSelectedServiceAddress] =
    useState<any>(null)

  const predictions = useAddressPredictor(useDebounce(addressInput, 300), true)
  const showPredictions =
    predictions?.length > 0 && selectedServiceAddress == null

  const handleForgotIdSubmit = async () => {
    setIsLoading(true)
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: siteInteractionConstant.FIND_YOUR_ACCOUNT_SUBMIT,
      },
      'tl_o',
      siteInteractionConstant.FIND_YOUR_ACCOUNT_SUBMIT,
    )
    try {
      const controlNumber =
        selectedServiceAddress?.samRecords?.[0]?.controlNumber
      const environment = selectedServiceAddress?.samRecords?.[0]?.environment
      if (!controlNumber || !environment) {
        setForgotId && setForgotId('')
        setForgotIdResponse &&
          setForgotIdResponse(stateConstant.NAME_ADDRESS_NOT_AVAILABLE)
      } else {
        const serviceAddress = {
          controlNumber: controlNumber,
          environment: environment,
        }
        const response: any = await APIClient.recoverIdEmail({
          lastName: lastName,
          serviceAddress: serviceAddress,
        })
        if (response.status === 200 && response.data.length > 0) {
          const useremail =
            response.data.length > 1 ? response.data : response.data[0]
          setForgotId && setForgotId(useremail)
          if (response.data.length > 1) {
            setForgotIdResponse &&
              setForgotIdResponse(stateConstant.MULTIPLE_EMAILS_PAGE)
          } else {
            setUserSelectedEmail && setUserSelectedEmail(useremail)
            setForgotIdResponse &&
              setForgotIdResponse(stateConstant.SENT_EMAIL_REMINDER)
          }
        } else {
          setForgotId && setForgotId('')
          setForgotIdResponse &&
            setForgotIdResponse(stateConstant.EMAIL_NOT_AVAILABLE)
        }
      }
    } catch (error: any) {
      setShowSystemErrorModal && setShowSystemErrorModal(true)
    }
    setIsLoading(false)
  }

  return (
    <div className={classes.container}>
      <Typography tagType="h2" styleType="h3" className={classes.header}>
        {forgotIdContent.title?.value}
      </Typography>

      <Typography tagType="p" styleType="p1">
        {forgotIdContent.forgotEmailDescription?.value}
      </Typography>

      <div className={classes.subheadings}>
        <Typography tagType="p" styleType="p1" className={classes.subtitle}>
          {forgotIdContent.lastName?.value}
        </Typography>
        <TextField
          InputProps={{ disableUnderline: true }}
          className={classes.textField}
          value={lastName}
          fullWidth
          onChange={(event: any) => setLastName(event.target.value)}
          helperText={''}
          disabled={disableInput}
        />
      </div>
      <div className={classes.subheadings}>
        <Typography tagType="p" styleType="p1" className={classes.subtitle}>
          {forgotIdContent.serviceAddress?.value}
        </Typography>
        <div className={classes.selectAddressWrapper}>
          <TextField
            InputProps={{ disableUnderline: true }}
            className={classes.serviceField}
            value={addressInput}
            ref={inputRef}
            onChange={(e) => {
              setAddressInput(e.target.value)
              setSelectedServiceAddress(null)
            }}
            disabled={disableInput}
          />
          <div
            className={clx({
              [classes.selectDropdownList]: showPredictions,
            })}
          >
            {showPredictions &&
              predictions?.map((address: any) => {
                return (
                  <div
                    key={`address-${address?.addressKey}`}
                    className={classes.addressRecord}
                    onClick={async () => {
                      setSelectedServiceAddress(address)
                      await setAddressInput(
                        formSingleLineAddress(address?.address, true),
                      )
                      if (inputRef?.current) {
                        inputRef?.current?.focus()
                      }
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
      </div>
      <div className={classes.footer}>
        <Button
          type="button"
          variant="primary"
          text={forgotIdContent.submit?.value}
          className={classes.submitButton}
          hoverVariant="primary"
          onClick={() => handleForgotIdSubmit()}
          disabled={!lastName || selectedServiceAddress == null}
          isBusy={isLoading}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  subtitle: {
    marginBottom: 8,
  },
  container: {
    backgroundColor: colors.main.white,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    [breakpoints.up('sm')]: {
      width: 518,
    },
  },
  header: {
    textAlign: 'center',
  },
  footer: {
    textAlign: 'center',
    display: 'flex',
    [breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  subheadings: {
    margin: '0px 0px 0px 0px',
  },
  textField: {
    width: '100%',
    borderRadius: 32,
    padding: '12px 16px 12px 16px',
    background: colors.main.white,
    border: '1px solid rgba(196, 197, 201, 1)',
    [breakpoints.up('sm')]: {
      width: 277,
      borderRadius: 25,
    },
  },
  serviceField: {
    width: '100%',
    borderRadius: 32,
    padding: '12px 16px 12px 16px',
    background: colors.main.white,
    border: '1px solid rgba(196, 197, 201, 1)',
    [breakpoints.up('sm')]: {
      borderRadius: 25,
    },
  },
  submitButton: { margin: '32px auto' },
  selectAddressWrapper: {
    position: 'relative',
  },
  selectDropdownList: {
    position: 'absolute',
    border: `1px solid ${colors.main.silverSand}`,
    zIndex: 1,
    background: colors.main.white,
    left: 0,
    top: '120%',
    margin: 'auto',
    padding: '10px 8px',
    borderRadius: 16,
    width: 'unset',
    [breakpoints.up('sm')]: {
      width: '100%',
    },
  },
  addressRecord: {
    padding: '8px 7px',
    margin: '4px 8px',
    cursor: 'pointer',
    '&:hover': {
      background: `${colors.main.gray}`,
      borderRadius: 32,
    },
  },
}))

export default ForgotForm
