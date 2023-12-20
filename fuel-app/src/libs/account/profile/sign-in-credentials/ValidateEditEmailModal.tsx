import { Modal, Typography, Button, InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { useAppData } from 'src/hooks'
import { TechnicalErrorIcon } from 'src/blitz/assets/react-icons'

const ValidateEditEmailModal = ({
  setModalOpen,
  validateEditEmailModalOpen,
  editEmailHandler,
}: any) => {
  const classes = useStyles()
  const validateEditEmailModalData = useAppData(
    'validateEditEmailModalData',
    true,
  )
  function cancelEditEmail(): void {
    return setModalOpen(false)
  }

  function EditEmail(): void {
    editEmailHandler()
    return setModalOpen(false)
  }

  return (
    <Modal
      modalOpen={validateEditEmailModalOpen}
      setModalOpen={() => setModalOpen(false)}
      borderRadius="32px"
      padding="0"
      width="90%"
      modalCloseIconClassName={classes.modalCloseBtn}
      modalContainerClassName={classes.modalWrapper}
      modalContent={
        <div className={classes.root}>
          <div className={classes.errorIcon}>
            <TechnicalErrorIcon />
          </div>
          <Typography className={classes.title} tagType="h5" styleType="h5">
            {validateEditEmailModalData?.title?.value}
          </Typography>
          <InjectHTML
            tagType="p"
            styleType="p1"
            value={`<strong>${validateEditEmailModalData?.subheadingIntro?.value}</strong>&nbsp;${validateEditEmailModalData?.subheading?.value}`}
            className={classes.description}
          />
          <span>
            <Button
              text={validateEditEmailModalData?.keepEmail?.value}
              type="button"
              onClick={cancelEditEmail}
              className={classes.cancelButton}
            />
            <Button
              type="button"
              text={validateEditEmailModalData?.changeEmail?.value}
              onClick={EditEmail}
              variant="tertiary"
              className={classes.changeEmailButton}
            />
          </span>
        </div>
      }
    />
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '6rem 8rem',
    [breakpoints.down('xs')]: {
      padding: '3rem 1rem',
    },
  },
  errorIcon: {
    marginBottom: '2rem',
  },
  description: {
    margin: '1rem 0',
  },
  modalWrapper: {
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  modalCloseBtn: {
    top: '12% !important',
    cursor: 'pointer',
    right: '7% !important',
  },
  cancelButton: {
    margin: '0.5rem',
  },
  changeEmailButton: {
    margin: '0.5rem',
  },
  title: {
    fontSize: '1.875rem',
    lineHeight: '2.375rem',
    alignSelf: 'center',
    [breakpoints.down('xs')]: {
      fontSize: '1.25rem',
      lineHeight: '1.75rem',
    },
  },
}))

export default ValidateEditEmailModal
