import { makeStyles } from '@material-ui/core'
import { Button, Typography } from 'src/blitz'
import { Edit, ErrorCheckMark, InfoIconWhite } from 'src/blitz/assets/react-icons'
import { Tooltip } from '@/shared-ui/components'
import { useState } from 'react'
import colors from '@/shared-ui/colors'
import clx from 'classnames'
import APIClient from 'src/api-client'
import {
  useWelcomePageData,
} from 'src/selector-hooks'
import { Input } from 'src/ui-kit'
import { MaskedPhoneNumber, PhoneNumberPlaceHolder } from '../constant'
import { addDashes } from '../helper'
import {
  WELCOME_EDIT_CONTACT_NUMBER,
  WELCOME_EDIT_CONTACT_NUMBER_SAVED,
  RegExpValidPhoneNumber,
  SITE_INTERACTION,
  WELCOME_CONTACT_NUMBER_HOVER,
} from 'src/constants'
import { WelcomePageModals } from '../types'
import useAppData from '@/shared-ui/hooks/useAppData'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { hasAppointmentDetails } from '../helper'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'
import { welcomeSlice } from 'src/redux/slicers'
import { useDispatch } from 'react-redux'

const ContactNumber = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const {
    unprovisionedServiceOrder,
    isNoInstallationOrder,
    isSelfInstallationOrder,
    isCancelledOrder,
  } = useWelcomePageData()

  const contactNumber =
    unprovisionedServiceOrder?.contactNumber

  const [editContact, setEditContact] = useState<boolean>(false)
  const [isBusy, setIsBusy] = useState<boolean>(false)
  const [vaildContactNumber, setVaildContactNumber] = useState<boolean>(true)
  const formattedNum = addDashes(contactNumber || '')
  const [number, setNumber] = useState(formattedNum)
  const appointmentDetailsExist = unprovisionedServiceOrder
    ? hasAppointmentDetails(unprovisionedServiceOrder)
    : false

  const {
    contactNumber: contactNo,
    numberUsedByTechnician,
    changingThisNumber,
    noPhoneNumber,
    save,
    cancel,
    inVaildMobileError,
  } = useAppData('OrderDetails', true) || {}

  const isModifiable = unprovisionedServiceOrder?.appointment?.isReschedulable === 'Yes'
  const toolTipText =
    isSelfInstallationOrder || isNoInstallationOrder
      ? changingThisNumber?.value
      : `${numberUsedByTechnician?.value} ${changingThisNumber?.value}`

  const setModal = (value: WelcomePageModals) =>
    dispatch(welcomeSlice.actions.setModal(value))

  const contactSubmitHandler = async () => {
    setIsBusy(true)
    try {
      const uuid = unprovisionedServiceOrder?.id;
      const payload = {
        ticketNumber: unprovisionedServiceOrder?.OrderNumber,
        contactNumber: number?.replace(/\D/g, ''),
      }
      await APIClient.updateContactNumber(uuid ,payload)
      if (unprovisionedServiceOrder) {
        dispatch(
          welcomeSlice.actions.updateServiceOrder({
            ...unprovisionedServiceOrder,
            contactNumber: number
          }),
        )
      }

      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: WELCOME_EDIT_CONTACT_NUMBER_SAVED,
        },
        'tl_o',
        SITE_INTERACTION,
      )
      setEditContact(false)
    } catch (error) {
      setModal(WelcomePageModals.TechnicalError)
    }
    setIsBusy(false)
  }

  const onMobileInputChange = (num: string) => {
    setNumber(num)
    const onlyNumber = num.replace(/[^0-9]/g, '')
    setVaildContactNumber(
      onlyNumber?.length === 10 && RegExpValidPhoneNumber.test(onlyNumber),
    )
  }

  const onEditContactHandler = () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: WELCOME_EDIT_CONTACT_NUMBER,
      },
      'tl_o',
      SITE_INTERACTION,
    )
    setEditContact(true)
  }

  if (
    isCancelledOrder ||
    isNoInstallationOrder ||
    isSelfInstallationOrder ||
    !appointmentDetailsExist
  )
    return null

  return (
    <div
      className={clx(classes.container, editContact && classes.editContactBg)}
    >
      <div className={classes.leftCol}>
        <Typography fontType="boldFont" styleType="p2">{contactNo?.value}</Typography>
        <div className={classes.toolTipWrapper}>
          <Tooltip
            tooltipIcon={<InfoIconWhite />}
            tooltipText={toolTipText}
            includeBorder={true}
            dropShadow={true}
            tooltipDirection="bottom"
            isDarkMode
            recordAnalytics={() => {
              DTMClient.triggerEvent(
                {
                  events: 'event14',
                  eVar14: WELCOME_CONTACT_NUMBER_HOVER,
                },
                'tl_o',
                SITE_INTERACTION,
              )
            }}
          />
        </div>
      </div>
      {editContact ? (
        <div className={classes.editWrapper}>
          <div className={classes.inputContainer}>
            <Input
              mask={MaskedPhoneNumber}
              value={number}
              fullWidth={true}
              isError={!vaildContactNumber}
              placeholder={PhoneNumberPlaceHolder}
              name="number"
              onChange={(event: { target: { value: string } }) =>
                onMobileInputChange(event.target.value)
              }
              className={clx(
                classes.inputPhoneNo,
                !vaildContactNumber && classes.errorBorder,
              )}
            />
            {!vaildContactNumber && (
              <Typography styleType="p4" className={classes.errorTextWrapper}>
                <div className={classes.errorText}>
                  <ErrorCheckMark className={classes.errorIcon} />
                  {inVaildMobileError?.value}
                </div>
              </Typography>
            )}
          </div>
          <div className={classes.btnWrapper}>
            <Button
              type="button"
              text={save?.value}
              isBusy={isBusy}
              buttonSize="small"
              variant="secondary"
              disabled={!vaildContactNumber}
              className={clx(classes.btn, classes.saveBtn)}
              onClick={contactSubmitHandler}
            />
            <Button
              type="button"
              text={cancel?.value}
              variant="lite"
              className={clx(classes.btn, classes.editButton)}
              onClick={() => {
                setEditContact(false)
                setNumber(contactNumber || '')
                setVaildContactNumber(true)
              }}
            />
          </div>
        </div>
      ) : (
        <div className={classes.rightCol}>
          <Typography styleType="p2">
            {formattedNum || noPhoneNumber?.value}
          </Typography>
          {contactNumber && isModifiable && (
            <button
              className={classes.editIcoButton}
              onClick={onEditContactHandler}
            ><Edit /></button>
          )}
        </div>
      )}
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    [breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  leftCol: {
    display: 'flex',
    [breakpoints.up('md')]: {
      flex: '0 0 224px',
    },
  },
  rightCol: {
    display: 'flex',
    gap: '1rem',
  },
  editButton: {
    fontFamily: PP_OBJECT_SANS_MEDIUM,
    fontWeight: 'normal',
    textDecoration: 'underline',
    minWidth: 'auto',
    height: 'auto',
    lineHeight: '18px',
  },
  editIcoButton: {
    border: 'none',
    background: 'none',
    padding:0,
    cursor: 'pointer'
  },
  btnWrapper: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },
  btn: {
    padding: '1rem 2rem',
    width: 'fit-content',
    minWidth: 'fit-content',
    fontSize: '0.875rem',
  },
  saveBtn: {
    textTransform: 'uppercase',
    height: '32px !important',
    paddingTop: 'unset',
    paddingBottom: 'unset',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: '1rem',
  },
  inputPhoneNo: {
    borderRadius: '2rem',
    backgroundColor: colors.main.white,
    '& div': {
      borderRadius: '2rem',
      backgroundColor: colors.main.white,
      '&:hover': {
        backgroundColor: colors.main.white,
      },
      '&.Mui-focused': {
        backgroundColor: colors.main.white,
      },
      '& input': {
        padding: '0.75rem 1rem',
        fontSize: '1rem',
        lineHeight: '1.5rem',
        '& :hover': {
          backgroundColor: colors.main.white,
        },
      },
    },
  },
  editWrapper: {
    flexGrow: 1,
  },
  editContactBg: {
    background: `${colors.main.secondaryLight}`,
    margin: '0 -1rem',
    padding: '1rem',
    borderRadius: '0.5rem',
    [breakpoints.down('sm')]: {
      padding: '1rem 0.5rem',
      margin: '0 -0.5rem',
    },
  },
  toolTipWrapper: {
    marginTop: 2,
    marginLeft: 4,
  },
  errorTextWrapper: {
    fontSize: 12,
    lineHeight: '14px',
    display: 'flex',
    alignItems: 'center',
  },
  errorText: {
    marginTop: '0.5rem',
    display: 'flex',
    gap: '4px',
    alignItems: 'baseline',
  },
  errorBorder: {
    '& div': {
      border: `1px solid ${colors.main.activeSliderRed}`,
      '& hover': {
        backgroundColor: colors.main.white,
      },
    },
  },
  errorIcon: {
    width: '0.625rem',
    '& path': {
      fill: colors.main.dark,
    },
  },
}))

export default ContactNumber
