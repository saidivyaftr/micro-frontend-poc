import { InputAdornment, makeStyles } from '@material-ui/core'
import { Button, Typography } from 'src/blitz'
import {
  InfoIconWhite,
  Edit,
  WarningOutline,
} from 'src/blitz/assets/react-icons'
import { Tooltip } from '@/shared-ui/components'
import { useMemo, useState } from 'react'
import colors from '@/shared-ui/colors'
import clx from 'classnames'
import APIClient from 'src/api-client'
import { Input } from 'src/ui-kit'
import {
  MaskedPhoneNumber,
  PhoneNumberPlaceHolder,
} from 'src/libs/account/welcome/constant'
import { addDashes } from 'src/libs/account/welcome/helper'
import { RegExpValidPhoneNumber } from 'src/constants/regex'
import { OrderPageModals, ContactError } from './types'
import { useAppData } from 'src/hooks'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { HELP_CENTER } from 'src/constants'
import { RenderField } from './ResultCard'
import { TICKET_NUMBER } from './helper'
import { useDispatch } from 'react-redux'
import { setOrderModal, setOrders } from 'src/redux/slicers/orderTicket'
import { useAccountTickets } from 'src/selector-hooks'
import { Order } from 'src/redux/types/OrderTicketTypes'
const REQUIRED = 'required'
const INVALID_CONTACT = 'invalid-contact'

type IOrderData = {
  orderData: Order
}

const ContactNumber = ({ orderData }: IOrderData) => {
  const { data: orders } = useAccountTickets()
  const dispatch = useDispatch()
  const {
    isReschedulable,
    ticketNumber,
    ticketType,
    contactNumber,
    uuid = '',
  } = orderData
  const classes = useStyles()
  const [editContact, setEditContact] = useState<boolean>(false)
  const [isBusy, setIsBusy] = useState<boolean>(false)
  const [error, setError] = useState<ContactError>('')
  const formattedNum = addDashes(contactNumber)
  const [number, setNumber] = useState(formattedNum)
  const {
    contactNumber: contactNo,
    contactNumberInfo,
    save,
    cancel,
    noPhoneNumber,
    inVaildMobileError,
    mobileNumberRequired,
  } = useAppData('resultScenario', true)

  const contactSubmitHandler = async () => {
    const eVar14 = `${HELP_CENTER}/order-ticket-status:contact-number:save`
    if (ticketType === TICKET_NUMBER) {
      DTMClient.triggerEvent(
        {
          events: 'event46, event14',
          eVar52: `TTS|updated CBR for ticket ${ticketNumber}`,
          eVar14,
        },
        'tl_o',
      )
    } else {
      DTMClient.triggerEvent(
        {
          events: 'event47, event14',
          eVar52: `OS|updated CBR for order ${ticketNumber}`,
          eVar14,
        },
        'tl_o',
      )
    }
    setIsBusy(true)
    try {
      const payload = {
        ticketType,
        ticketNumber,
        contactNumber: number?.replace(/\D/g, ''),
      }
      await APIClient.updateOrderTicketContact(payload, uuid)
      const updateOrders = orders.map((orderData: Order) => {
        const order = { ...orderData }
        if (ticketNumber === orderData?.ticketNumber)
          order.contactNumber = number?.replace(/\D/g, '')
        return order
      })
      dispatch(
        setOrders({
          type: 'Success',
          data: updateOrders,
        }),
      )
      setEditContact(false)
    } catch (error) {
      dispatch(setOrderModal(OrderPageModals.TechnicalError))
    }
    setIsBusy(false)
  }

  const validatePhoneNumber = (number: string) => {
    const onlyNumber = number.replace(/[^0-9]/g, '')
    if (onlyNumber?.length === 0) setError(REQUIRED)
    else if (
      onlyNumber?.length < 10 ||
      !RegExpValidPhoneNumber.test(onlyNumber)
    )
      setError(INVALID_CONTACT)
    else setError('')
  }

  const onMobileInputChange = (num: string) => {
    setNumber(num)
    validatePhoneNumber(num)
  }

  const onEditContactHandler = () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: `${HELP_CENTER}/order-ticket-status:contact-number:edit`,
      },
      'tl_o',
    )
    setEditContact(true)
  }
  const isInValidContactNumber = useMemo(() => {
    return [REQUIRED, INVALID_CONTACT].includes(error)
  }, [error])

  if (!isReschedulable && !formattedNum) return null

  return (
    <RenderField>
      <div
        className={clx(classes.container, editContact && classes.editContactBg)}
      >
        <div className={classes.leftCol}>
          <Typography styleType="p2" fontType="boldFont">
            {contactNo?.value}
          </Typography>
          <div className={classes.toolTipWrapper}>
            <Tooltip
              tooltipIcon={<InfoIconWhite />}
              tooltipText={contactNumberInfo?.value}
              includeBorder={true}
              dropShadow={true}
              tooltipDirection="bottom"
              isDarkMode
            />
          </div>
        </div>
        {editContact ? (
          <div className={classes.editWrapper}>
            <div className={classes.inputContainer}>
              <Input
                mask={MaskedPhoneNumber}
                value={number}
                fullWidth={false}
                isError={isInValidContactNumber}
                placeholder={PhoneNumberPlaceHolder}
                name="number"
                onChange={(event: { target: { value: string } }) =>
                  onMobileInputChange(event.target.value)
                }
                className={clx(classes.inputPhoneNo, {
                  [classes.errorBorder]: isInValidContactNumber,
                })}
                endAdornment={
                  error === INVALID_CONTACT ? (
                    <InputAdornment className={classes.noBorder} position="end">
                      <WarningOutline className={classes.errorIcon} />
                    </InputAdornment>
                  ) : null
                }
              />
              {isInValidContactNumber && (
                <Typography styleType="p4" className={classes.errorTextWrapper}>
                  <div className={classes.errorText}>
                    {error === REQUIRED
                      ? mobileNumberRequired?.value
                      : inVaildMobileError?.value}
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
                disabled={isInValidContactNumber}
                className={clx(classes.btn, classes.saveBtn)}
                onClick={contactSubmitHandler}
              />
              <Button
                type="button"
                text={cancel?.value}
                variant="lite"
                className={clx(
                  classes.btn,
                  classes.editButton,
                  classes.helpLink,
                )}
                onClick={() => {
                  setEditContact(false)
                  setNumber(contactNumber)
                }}
              />
            </div>
          </div>
        ) : (
          <div className={classes.rightCol}>
            <Typography styleType="p2">
              {formattedNum || noPhoneNumber?.value}
            </Typography>
            {contactNumber && isReschedulable && (
              <Edit
                className={classes.editButton}
                onClick={onEditContactHandler}
              />
            )}
          </div>
        )}
      </div>
    </RenderField>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
    width: '100%',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: '0.5rem',
    },
  },
  helpLink: {
    textDecoration: 'underline',
    fontSize: '0.825rem',
  },
  leftCol: {
    display: 'flex',
    [breakpoints.up('md')]: {
      flex: '0 0 170px',
    },
  },
  rightCol: {
    display: 'flex',
    gap: '1rem',
  },
  editButton: {
    fontWeight: 'normal',
    outline: 'none',
    cursor: 'pointer',
    '&:hover': {
      '& path': {
        fill: colors.main.brightRed,
      },
    },
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
    width: '100%',
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
    '& path': {
      fill: colors.main.dark,
    },
  },
  noBorder: {
    border: 'none !important',
  },
}))

export default ContactNumber
