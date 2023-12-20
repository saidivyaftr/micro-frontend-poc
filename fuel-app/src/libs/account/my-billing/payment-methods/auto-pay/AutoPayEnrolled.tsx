import { makeStyles } from '@material-ui/core'
import { Button, Typography } from 'src/blitz'
import { CardWithTitle } from '@/shared-ui/components/Card/Card'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'
import { PaymentMethod } from 'src/redux/types/payments'
import { useState } from 'react'
import APIClient from 'src/api-client'
import { Edit, InfoIcon } from 'src/blitz/assets/react-icons'
import { useActiveAccountId, useShowAutoPayEditForm } from 'src/selector-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'src/redux/types'
import { paymentSlice } from 'src/redux/slicers/payment'
import { SetupAutoPay } from './SetupAutoPayForm'
import { TurnOffConfirmationModal } from './auto-pay-modals'
import { accountSlice } from 'src/redux/slicers/account'
import { getPaymentMethodLabel } from '../../helper'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import colors from '@/shared-ui/colors'
import useAppData from '@/shared-ui/hooks/useAppData'
import moment from 'moment'
import { SITE_ERROR } from 'src/constants'

export const AutoPayEnrolled = ({
  autoPayPaymentDetails,
}: {
  autoPayPaymentDetails: PaymentMethod
}) => {
  const classes = useStyles()
  const autoPayData = useAppData('autoPayData', true)
  const dispatch = useDispatch()
  const activeAccountId = useActiveAccountId()
  const showEditForm = useShowAutoPayEditForm()

  const { accountInfoOnLoad } =
    useSelector((state: State) => state?.account) || {}
  const dueDate = accountInfoOnLoad?.data?.scheduledAutopayDate
  const formattedDueDate = dueDate
    ? moment(dueDate).format('MMM DD, YYYY')
    : null

  const [showTurnOffModal, setShowTurnOffModal] = useState(false)
  const [isTurningOff, setIsTurningOff] = useState(false)
  const [hasAPIError, setHasAPIError] = useState(false)

  const setShowEditForm = (value: boolean) => {
    dispatch(paymentSlice.actions.setShowAutoPayEditForm(value))
  }

  const handleTurnOffAutoPay = async () => {
    setIsTurningOff(true)
    setHasAPIError(false)
    try {
      const cancelType =
        autoPayPaymentDetails?.systemOfOrigin === 'DST'
          ? autoPayPaymentDetails?.id
          : 'DPI'
      await APIClient.deleteAutoPayDetails(activeAccountId, cancelType)
      setShowTurnOffModal(false)
      if (activeAccountId) {
        dispatch(accountSlice.actions.turnAutoPayOff())
        dispatch(
          paymentSlice.actions.setAutopayDetails({
            type: 'Success',
            data: [],
          }),
        )
        // dispatch(fetchAutopayDetails(activeAccountId, ''))
      }
      DTMClient.triggerEvent(
        { events: 'event54' },
        'tl_o',
        'my account:confirm cancel autopay',
      )
    } catch (error) {
      setHasAPIError(true)
      DTMClient.triggerEvent(
        {
          events: 'event88',
          eVar2: 'my account:confirm cancel autopay',
          eVar88: 'Failed to cancel autopay',
        },
        'tl_o',
        SITE_ERROR,
      )
    }
    setIsTurningOff(false)
  }

  return (
    <CardWithTitle>
      <div>
        <div className={classes.cardHead}>
          <Typography styleType="h5">{autoPayData?.onTitle?.value}</Typography>
          <Button
            text={autoPayData?.turnOffAutoPay?.value}
            type="button"
            variant="lite"
            className={classes.turnOffBtn}
            onClick={() => {
              DTMClient.triggerEvent(
                { events: 'event55' },
                'tl_o',
                'my account:cancel autopay',
              )
              setShowTurnOffModal(true)
            }}
          />
        </div>
        {showEditForm ? (
          <SetupAutoPay
            previousPaymentMethodId={autoPayPaymentDetails?.id}
            isUpdate
            setShowSetupForm={setShowEditForm}
          />
        ) : (
          <>
            <div className={classes.sectionItem}>
              <Typography
                fontType="boldFont"
                className={classes.editSectionContainer}
              >
                {autoPayData?.paymentMethod?.value}
              </Typography>
              <Typography className={classes.editSectionContainer}>
                <>
                  <span className={classes.selectedPayment}>
                    {getPaymentMethodLabel(autoPayPaymentDetails)}
                  </span>
                  <button
                    className={classes.editBtn}
                    onClick={() => {
                      setShowEditForm(true)
                    }}
                  >
                    <Edit />
                  </button>
                </>
              </Typography>
              {autoPayPaymentDetails?.class === 'BUSINESS' && (
                <Typography
                  styleType="p4"
                  className={classes.commercialCreditCardSurcharge}
                >
                  <>
                    <InfoIcon height={13} width={13} />
                    {autoPayData?.commercialCreditCardSurcharge?.value}
                  </>
                </Typography>
              )}
            </div>
            <div>
              <div className={classes.innerSectionItem}>
                <Typography
                  fontType="boldFont"
                  className={classes.innerSectionItemTitle}
                >
                  {autoPayData?.paymentDate?.value}
                </Typography>
                <Typography>
                  {dueDate ? formattedDueDate : autoPayData?.dueDate?.value}
                </Typography>
              </div>
              <div className={classes.innerSectionItem}>
                <Typography
                  fontType="boldFont"
                  className={classes.innerSectionItemTitle}
                >
                  {autoPayData?.amount?.value}
                </Typography>
                <Typography>{autoPayData?.totalBalance?.value}</Typography>
              </div>
              <div className={classes.innerSectionItem}>
                <Typography styleType="p2">
                  {autoPayData?.autoPaymentMessage?.value}
                </Typography>
              </div>
            </div>
          </>
        )}
        <TurnOffConfirmationModal
          isOpen={showTurnOffModal}
          handleClose={() => setShowTurnOffModal(false)}
          handleTurnOffAutoPay={handleTurnOffAutoPay}
          isBusy={isTurningOff}
          hasError={hasAPIError}
        />
      </div>
    </CardWithTitle>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  cardHead: {
    display: 'flex',
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  turnOffBtn: {
    fontFamily: PP_OBJECT_SANS_MEDIUM,
    textDecoration: 'underline',
    fontSize: 16,
    fontWeight: 500,
    minWidth: 'fit-content',
  },
  sectionItem: {
    marginBottom: 32,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  innerSectionItem: {
    marginTop: 16,
    display: 'flex',
    [breakpoints.down('xs')]: {
      marginTop: 32,
      flexDirection: 'column',
    },
  },
  innerSectionItemTitle: {
    marginRight: 32,
    minWidth: 150,
  },
  editSectionContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  editBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    '&:hover': {
      '& svg': {
        '& path': {
          fill: colors.main.brightRed,
        },
      },
    },
  },
  selectedPayment: {
    width: '50%',
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  commercialCreditCardSurcharge: {
    display: 'flex',
    alignItems: 'top',
    gap: 4,
    fontSize: 12,
    lineHeight: '14px',
  },
}))
