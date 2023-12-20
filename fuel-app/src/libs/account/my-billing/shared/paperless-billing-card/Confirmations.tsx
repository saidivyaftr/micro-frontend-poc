import { CircularProgress, makeStyles } from '@material-ui/core'
import { InjectHTML, Modal } from '@/shared-ui/components'
import { ModalCloseIcon } from '@/shared-ui/react-icons/index'
import colors from '@/shared-ui/colors'
import { Button, Typography } from 'src/blitz'
import PaperActive from 'src/blitz/assets/react-icons/paperActive'
import { TechnicalErrorIcon } from 'src/blitz/assets/react-icons'
import ErrorMessage from 'src/libs/account/shared/ErrorMessage'
import { paperBillingCard as paperBillingCardMock } from './sitecore-mock'
import useWindowDimensions from '@/shared-ui/hooks/useWindowDimensions'
import { useTrackPaperlessView } from './useTrackPaperlessView'
import { formatAmountInDollar } from 'src/utils/amount'
import { useAppData } from '@/shared-ui/hooks/index'

type ConfirmationProps = {
  status: string
  errorMsg?: string
  currentPreference: string
  openModal: boolean
  closeModal: () => void
  title?: string
  paperBillFee: number | string
  onConfirm?: () => void
}

const ConfirmationModal = ({
  status,
  currentPreference,
  openModal,
  closeModal,
  paperBillFee = '',
  onConfirm,
}: ConfirmationProps) => {
  const classes = useStyles()
  const { width } = useWindowDimensions()
  useTrackPaperlessView(openModal, currentPreference, status)
  const paperBillingCardData = useAppData('paperBillingCard', true)
  const paperBillingCard =
    Object.keys(paperBillingCardData)?.length > 0
      ? paperBillingCardData
      : paperBillingCardMock

  const {
    okText,
    closeText,
    somethingWentWrong,
    turnOffTitle,
    turnOffPaperless,
    turnOffWarning,
    keepPaperLessOn,
    paperLessRemoved,
    paperbillSubtitle,
    paperbillSubtitle2,
  } = paperBillingCard
  const RemoveConfirmation = () => {
    return (
      <>
        <Typography
          className={classes.removeHeading}
          tagType="h3"
          styleType="h4"
        >
          {turnOffTitle?.value}
        </Typography>
        <Typography styleType="p1" className={classes.confirmDesc}>
          {turnOffWarning?.value}
        </Typography>
        <div className={classes.confirmBtnsContainer}>
          <Button
            onClick={closeModal}
            type="button"
            text={keepPaperLessOn?.value}
          />
          <Button
            onClick={onConfirm}
            type="submit"
            variant="tertiary"
            text={turnOffPaperless?.value}
          />
        </div>
      </>
    )
  }

  const PaperBillConfirmation = () => {
    return (
      <div className={classes.enrollSuccess}>
        <TechnicalErrorIcon />
        <Typography tagType="h3" styleType="h4">
          {paperLessRemoved?.value}
        </Typography>
        {paperBillFee && (
          <Typography
            className={classes.emailNotif}
            tagType="div"
            styleType="p1"
          >
            {paperbillSubtitle?.value.replace(
              '{amount}',
              ` ${formatAmountInDollar(paperBillFee)}`,
            )}
          </Typography>
        )}
        <InjectHTML
          className={classes.additionalDesc}
          tagType="div"
          styleType="p1"
          value={paperbillSubtitle2?.value}
        />
        <Button
          onClick={closeModal}
          type="button"
          text={okText?.value}
          className={classes.okBtn}
        ></Button>
      </div>
    )
  }

  const ErrorContainer = () => {
    return (
      <>
        <ErrorMessage message={somethingWentWrong?.value} />
        <Button
          onClick={closeModal}
          type="button"
          text={closeText?.value}
          className={classes.okBtn}
        ></Button>
      </>
    )
  }

  const EnrollConfirmation = () => {
    const { title, subTitle, confirmationSubTitle, okText } = paperBillingCard
    return (
      <div className={classes.enrollSuccess}>
        <PaperActive />
        <Typography tagType="h3" styleType="h4">
          {title?.value}
        </Typography>
        <Typography className={classes.emailNotif} tagType="div" styleType="p1">
          {subTitle?.value}
        </Typography>
        <InjectHTML
          className={classes.additionalDesc}
          tagType="div"
          styleType="p1"
          value={confirmationSubTitle?.value}
        />
        <Button
          onClick={closeModal}
          type="button"
          text={okText?.value}
          className={classes.okBtn}
        ></Button>
      </div>
    )
  }

  return (
    <Modal
      modalOpen={openModal}
      setModalOpen={closeModal}
      modalContent={
        <div className={classes.modalContainer}>
          <div className={classes.modalCloseIconWrapper}>
            <ModalCloseIcon
              strokeWidth="4"
              color={colors.main.black}
              onClick={closeModal}
              className={classes.closeIcon}
            />
          </div>
          <div className={classes.modalContentWrapper}>
            {status === 'error' ? (
              <ErrorContainer />
            ) : status === 'inprogress' ? (
              <CircularProgress />
            ) : status === 'init' && currentPreference === 'active' ? (
              <RemoveConfirmation />
            ) : status === 'success' && currentPreference === 'disabled' ? (
              <PaperBillConfirmation />
            ) : (
              status === 'success' &&
              currentPreference === 'active' && <EnrollConfirmation />
            )}
          </div>
        </div>
      }
      stopDefaultExit={true}
      strokeWidth="4"
      iconColor={colors.main.black}
      modalCloseIconClassName={classes.modalCloseBtn}
      padding={width > 768 ? '5rem' : '3rem 1rem'}
      height="auto"
      width={'90%'}
      background={colors.main.white}
      borderRadius="2rem"
    ></Modal>
  )
}

export default ConfirmationModal

const useStyles = makeStyles(({ breakpoints }) => ({
  modalCloseBtn: {
    display: 'none',
  },
  modalContainer: {
    position: 'relative',
  },
  confirmDesc: {
    textAlign: 'center',
  },
  modalContentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  modalCloseIconWrapper: {
    position: 'absolute',
    top: -50,
    right: -50,
    [breakpoints.down('sm')]: {
      top: -28,
      right: 8,
    },
  },
  confirmBtnsContainer: {
    width: '100%',
    display: 'flex',
    marginTop: '2rem',
    justifyContent: 'center',
    gap: '1rem',
    [breakpoints.down('xs')]: {
      marginTop: '3rem',
      flexDirection: 'column',
    },
  },
  removeHeading: {
    marginBottom: '1rem',
    [breakpoints.down('xs')]: {
      marginBottom: '0.5rem',
    },
  },
  modalContent: {
    padding: '1rem 2rem 3rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  closeIcon: {
    width: '1.5rem',
    height: '1.5rem',
    cursor: 'pointer',
    [breakpoints.down('sm')]: {
      width: '1rem',
      height: '1rem',
    },
    '&:hover *': {
      fill: colors.main.red,
      stroke: colors.main.red,
      color: colors.main.red,
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
    [breakpoints.down('xs')]: {
      marginTop: '0.5rem',
    },
  },
  additionalDesc: {
    marginTop: '2rem',
    textAlign: 'center',
  },
  okBtn: {
    marginTop: '1rem',
    minWidth: 92,
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}))
