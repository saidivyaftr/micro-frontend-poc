import { Modal, Typography, Button, InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { useAppData } from 'src/hooks'

const PasswordChangeSuccessModal = ({
  PasswordChangeSuccessModalOpen,
  setModalOpen,
}: any) => {
  const classes = useStyles()
  const PasswordChangeSuccessModalData = useAppData(
    'PasswordChangeSuccessModalData',
    true,
  )

  function dismissPasswordModal(): void {
    return setModalOpen(false)
  }

  return (
    <Modal
      modalOpen={PasswordChangeSuccessModalOpen}
      setModalOpen={dismissPasswordModal}
      borderRadius="32px"
      padding="0"
      width="90%"
      modalCloseIconClassName={classes.modalCloseBtn}
      modalContainerClassName={classes.modalWrapper}
      modalContent={
        <div className={classes.root}>
          <Typography className={classes.title} tagType="h5" styleType="h5">
            {PasswordChangeSuccessModalData?.title?.value}
          </Typography>
          <InjectHTML
            tagType="p"
            styleType="p1"
            value={PasswordChangeSuccessModalData?.subheading?.value}
            className={classes.description}
          />
          <Button
            text={PasswordChangeSuccessModalData?.dismiss?.value}
            type="button"
            onClick={dismissPasswordModal}
            className={classes.submitBtn}
          />
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
  description: {
    margin: '1rem 0',
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
  submitBtn: {
    marginBottom: '1rem',
  },
}))

export default PasswordChangeSuccessModal
