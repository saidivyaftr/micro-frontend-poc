import colors from '@/shared-ui/colors'
import { makeStyles } from '@material-ui/core'
import { Button, Modal, Typography } from 'src/blitz'
import { usePaymentConfirmation, usePaymentMethods } from 'src/selector-hooks'
import moment from 'moment'
import { formatAmountInDollar } from 'src/utils/amount'
import { ConfirmationModalType } from './PaymentsForm'
import useAppData from '@/shared-ui/hooks/useAppData'
import WarningIcon from '@/shared-ui/react-icons/warning'
import ConfirmationIcon from '@/shared-ui/react-icons/confirmation-icon'
import SchedulePayIcon from '@/shared-ui/react-icons/SchedulePay'

type ConfirmationProps = {
  openModal: boolean
  setConfirmationModal: (value: boolean) => void
  closeModal: () => void
  onConfirm: () => void
  modalType: ConfirmationModalType
}

const ConfirmationModal = ({
  openModal,
  setConfirmationModal,
  closeModal,
  onConfirm,
  modalType,
}: ConfirmationProps) => {
  const classes = useStyles()
  const { data: paymentMethodsData } = usePaymentMethods()
  const paymentConfirmation = usePaymentConfirmation()
  const paymentModal = useAppData('paymentModal', true)
  const ordinaryPayment = paymentModal?.ordinaryPayment?.targetItem
  const schedulePayment = paymentModal?.schedulePayment?.targetItem
  const paymentError = paymentModal?.paymentError.targetItem
  const insufficientFundError = paymentModal?.insufficientFundError?.targetItem
  const commercialCard = paymentModal?.commercialCard?.targetItem
  const higherPayment = paymentModal?.higherPayment?.targetItem
  const lesserPayment = paymentModal?.lesserPayment?.targetItem

  let ModalIcon: any = WarningIcon

  let data: any = null
  switch (modalType) {
    case 'BUSINESS':
      data = JSON.parse(JSON.stringify(commercialCard))
      break
    case 'SCHEDULE':
      data = JSON.parse(JSON.stringify(schedulePayment))
      ModalIcon = SchedulePayIcon
      break
    case 'FAILURE':
      data = JSON.parse(JSON.stringify(paymentError))
      break
    case 'INSUFFICIENT':
      data = JSON.parse(JSON.stringify(insufficientFundError))
      break
    case 'ORDINARY':
      data = JSON.parse(JSON.stringify(ordinaryPayment))
      ModalIcon = ConfirmationIcon
      break
    case 'HIGHER_PAYMENT':
      data = JSON.parse(JSON.stringify(higherPayment))
      break
    case 'LESSER_PAYMENT':
      data = JSON.parse(JSON.stringify(lesserPayment))
      break
  }

  if (data !== null && paymentConfirmation.kind === 'OneTimePayment') {
    data.description.value = data.description.value.replace(
      '{mailId}',
      paymentConfirmation.data.email,
    )
    const formattedDate = moment(paymentConfirmation.data?.paymentDate).format(
      'MMM DD, yyyy',
    )
    data.detailsData.value = `${formatAmountInDollar(
      paymentConfirmation.data?.paymentAmount,
    )} ${
      modalType === 'SCHEDULE' ? 'scheduled for' : 'paid on'
    } ${formattedDate}`
    const paymentMethodsDetail = paymentMethodsData?.paymentMethods?.find(
      (method) =>
        method.description === paymentConfirmation.data?.paymentMethod,
    )
    data.paymentData.value = paymentMethodsDetail?.subtype
      ? `${paymentMethodsDetail?.subtype} ****${paymentMethodsDetail?.accountNumberEndsWith}`
      : paymentConfirmation?.data?.paymentMethod || '-'
    data.codeData.value =
      modalType === 'ORDINARY'
        ? paymentConfirmation?.data?.confirmationNumber ||
          paymentConfirmation?.data?.confirmationCode
        : null
  }

  const handleConfirm = (textValue: string) => {
    if (
      textValue.toLowerCase() === 'SUBMIT PAYMENT'.toLowerCase() ||
      textValue.toLowerCase() === 'SUBMIT'.toLowerCase()
    ) {
      onConfirm()
    } else {
      setConfirmationModal(false)
    }
  }

  if (data === null) {
    return null
  }

  const getContent = () => {
    return (
      <div className={classes.modalContent}>
        <div className={classes.iconCtr}>
          <ModalIcon />
        </div>
        <Typography
          className={classes.removeHeading}
          tagType="h3"
          styleType="h4"
        >
          {data?.title.value}
        </Typography>
        <Typography tagType="p" styleType="p1" className={classes.description}>
          {data?.description.value}
        </Typography>
        {(modalType === 'SCHEDULE' || modalType === 'ORDINARY') && (
          <>
            <Typography
              tagType="h6"
              styleType="p1"
              fontType="boldFont"
              className={classes.subTitle}
            >
              {data?.detailsTitle.value}
            </Typography>
            <Typography
              tagType="p"
              styleType="p1"
              className={classes.description}
            >
              {data?.detailsData.value}
            </Typography>
            <Typography
              tagType="h6"
              styleType="p1"
              fontType="boldFont"
              className={classes.subTitle}
            >
              {data?.paymentTitle.value}
            </Typography>
            <Typography
              tagType="p"
              styleType="p1"
              className={classes.description}
            >
              {data?.paymentData.value}
            </Typography>
            {data?.codeTitle.value && (
              <Typography
                tagType="h6"
                styleType="p1"
                fontType="boldFont"
                className={classes.subTitle}
              >
                {data?.codeTitle.value}
              </Typography>
            )}
            {data?.codeData.value && (
              <Typography
                tagType="p"
                styleType="p1"
                className={classes.description}
              >
                {data?.codeData.value}
              </Typography>
            )}
          </>
        )}
        <div className={classes.confirmBtnsContainer}>
          {data?.secondaryBtn.value && (
            <Button
              onClick={() => handleConfirm(data?.secondaryBtn.value)}
              type="button"
              variant="tertiary"
              text={data?.secondaryBtn.value}
              className={classes.actionBtns}
            />
          )}
          {data?.primaryBtn?.value && (
            <Button
              onClick={() => handleConfirm(data?.primaryBtn.value)}
              type="submit"
              variant="primary"
              text={data?.primaryBtn.value}
              className={classes.actionBtns}
            />
          )}
        </div>
        <Typography
          styleType="legal"
          tagType="p"
          className={classes.description}
        >
          {data?.legalText.value}
        </Typography>
      </div>
    )
  }

  return (
    <Modal
      modalOpen={openModal}
      setModalOpen={closeModal}
      modalContent={getContent()}
      strokeWidth="4"
      width="100%"
      padding="0"
      background={colors.main.white}
      borderRadius="32px"
      modalContainerClassName={classes.modalWrapper}
      modalCloseIconClassName={classes.modalCloseBtn}
    />
  )
}

export default ConfirmationModal

const useStyles = makeStyles(({ breakpoints }) => ({
  modalWrapper: {
    maxWidth: '670px !important',
    maxHeight: '90vh',
    borderRadius: 32,
    padding: '0 !important',
    backgroundColor: colors.main.white,
    [breakpoints.down('xs')]: {
      maxWidth: 'unset !important',
    },
  },
  confirmBtnsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1rem 0',
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
      width: '100%',
    },
  },
  removeHeading: {
    marginBottom: '1rem',
  },
  actionBtns: {
    margin: '0.75rem',
    width: 'fit-content',
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '3rem',
    [breakpoints.down('xs')]: {
      padding: '3rem 1rem',
    },
  },
  closeBtn: {
    cursor: 'pointer',
    height: '1.5rem',
    width: '1.5rem',
  },
  enrollSuccess: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem',
    '& svg': {
      height: '5rem',
      width: '5rem',
      marginBottom: '2rem',
    },
    [breakpoints.down('xs')]: {
      padding: 0,
      '& svg': {
        height: '3.75rem',
        width: '3.75rem',
      },
    },
  },
  emailNotif: {
    marginTop: '1rem',
    textAlign: 'center',
  },
  perkContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem',
    gap: '0.5rem',
    background: colors.main.greenishBlue,
    borderRadius: '50%',
    marginBottom: '1rem',
  },
  iconCtr: {
    width: '5rem',
    height: '5rem',
    background: colors.main.greenishBlue,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem',
    alignItems: 'center',
    '& img': {
      width: '3rem',
      height: '3rem',
    },
  },
  description: {
    margin: '0 auto',
  },
  subTitle: {
    margin: '1rem auto 0',
  },
  modalCloseBtn: {
    top: '40px !important',
    right: '0px !important',
    fontWeight: 'bold',
    cursor: 'pointer',
    [breakpoints.down('xs')]: {
      top: '2rem !important',
    },
  },
}))
