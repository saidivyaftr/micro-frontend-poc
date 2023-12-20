import { Modal } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { ModalCloseIcon } from '@/shared-ui/react-icons/index'
import colors from '@/shared-ui/colors'
import ModalContent from './ModalContent'

const InfoModal = (props: any) => {
  const { openDialog, modalData, setModalOpen } = props
  const classes = useStyles()
  return (
    <div>
      <Modal
        modalOpen={openDialog}
        setModalOpen={setModalOpen}
        modalContainerClassName={classes.ModalContainer}
        modalContent={
          <div className={classes.modalContentWrapper}>
            <div className={classes.modalCloseIconWrapper}>
              <ModalCloseIcon
                strokeWidth="4"
                color={colors.main.black}
                onClick={() => setModalOpen(false)}
                className={classes.closeIcon}
              />
            </div>
            <ModalContent data={modalData} />
          </div>
        }
        stopDefaultExit={false}
        strokeWidth="4"
        iconColor={colors.main.black}
        modalCloseIconClassName={classes.modalCloseBtn}
        padding="0rem "
        width="100%"
        maxWidth="800px"
        height="auto"
        background={colors.main.white}
        borderRadius="2rem"
      />
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  ModalContainer: {
    maxWidth: '50rem !important',
    padding: '0rem !important',
    '& div': {
      [breakpoints.down('sm')]: {
        borderRadius: '1rem  !important',
      },
    },
  },
  modalCloseBtn: {
    display: 'none',
    top: '1rem',
    right: '.5rem',
  },
  modalContentWrapper: {
    textAlign: 'left',
  },
  modalCloseIconWrapper: {
    textAlign: 'end',
    margin: '1.7rem 1.7rem 0rem 0rem',
    [breakpoints.down('sm')]: {
      margin: '0rem',
    },
  },
  closeIcon: {
    width: '1.5rem',
    height: '1.5rem',
    cursor: 'pointer',
    margin: '1rem 1rem 0rem 0rem',
    [breakpoints.down('sm')]: {
      width: '1rem',
      height: '1rem',
    },
    '&:hover *': {
      fill: colors.main.brightRed,
      stroke: colors.main.brightRed,
      color: colors.main.brightRed,
    },
  },
}))
export default InfoModal
