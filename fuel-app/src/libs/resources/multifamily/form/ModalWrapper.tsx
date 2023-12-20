import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { Modal } from '@/shared-ui/components'

const ModalWrapper = ({
  isOpen,
  modalContent,
}: {
  isOpen: boolean
  modalContent: any
}) => {
  const classes = useStyles()

  return (
    <Modal
      modalOpen={isOpen}
      setModalOpen={() => false}
      stopDefaultExit={true}
      modalContainerClassName={classes.modalWrapper}
      strokeWidth="4"
      iconColor={colors.main.black}
      modalCloseIconClassName={classes.modalCloseBtn}
      modalContent={modalContent}
      width="800px"
      padding="0"
      background={colors.main.white}
      borderRadius="32px"
    />
  )
}

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
    '& div': {
      [breakpoints.down('sm')]: {
        width: 'unset !important',
      },
    },
  },
  modalCloseBtn: {
    visibility: 'hidden',
  },
}))

export default ModalWrapper
