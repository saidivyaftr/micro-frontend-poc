import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { Modal } from '@/shared-ui/components'
const ModalWrapper = ({
  isOpen,
  handleClose,
  modalContent,
}: {
  isOpen: boolean
  handleClose: () => any
  modalContent: any
}) => {
  const classes = useStyles()
  return (
    <Modal
      modalOpen={isOpen}
      setModalOpen={handleClose}
      stopDefaultExit={true}
      modalContainerClassName={classes.modalWrapper}
      strokeWidth="4"
      iconColor={colors.main.black}
      modalCloseIconClassName={classes.modalCloseBtn}
      modalContent={modalContent}
      width="100%"
      padding="0"
      background={colors.main.white}
      borderRadius="32px"
    />
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  modalWrapper: {
    maxWidth: '780px !important',
    maxHeight: '90vh',
    borderRadius: 32,
    padding: '0 !important',
    backgroundColor: colors.main.white,
    [breakpoints.down('sm')]: {
      maxWidth: '680px !important',
    },
  },
  modalCloseBtn: {
    display: 'none',
  },
}))

export default ModalWrapper
