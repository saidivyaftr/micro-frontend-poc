import { Typography } from '@/shared-ui/components'
import { ActionModal } from 'src/libs/account/shared/modals'
import { TechnicalErrorIcon } from '@/shared-ui/react-icons/index'
import { makeStyles } from '@material-ui/core'
import useChatState from '@/shared-ui/hooks/useChatState'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'
import useAppData from '@/shared-ui/hooks/useAppData'

export const EmailAlreadyRegisteredModal = ({
  isOpen,
  handleClose,
  closeFormEdit,
}: {
  isOpen: boolean
  handleClose: () => void
  closeFormEdit: () => void
}) => {
  const classes = useStyles()
  const { setChatState } = useChatState()
  const emailAlreadyRegisteredModalData = useAppData(
    'emailAlreadyRegisteredModalData',
    true,
  )

  const closeModal = () => {
    handleClose()
    closeFormEdit()
  }
  return (
    <ActionModal
      isOpen={isOpen}
      handleClose={closeModal}
      title={
        <Typography styleType="h5">
          {emailAlreadyRegisteredModalData?.title?.value}
        </Typography>
      }
      subTitle={emailAlreadyRegisteredModalData?.description?.value}
      icon={<TechnicalErrorIcon />}
      className={classes.modalClassName}
      primaryBtnText={emailAlreadyRegisteredModalData?.tryAgainBtn?.value}
      primaryBtnAction={handleClose}
      secondaryBtnText={
        emailAlreadyRegisteredModalData?.discardChangesBtn?.value
      }
      secondaryBtnAction={closeModal}
      disclaimer={
        <Typography styleType="p3" className={classes.disclaimer}>
          <>
            <span>{emailAlreadyRegisteredModalData?.needHelp?.value}</span>
            <span
              onClick={() => {
                handleClose()
                setChatState(true)
                closeFormEdit()
              }}
              className={classes.chatWithUs}
            >
              {emailAlreadyRegisteredModalData?.chatWithMe?.value}
            </span>
          </>
        </Typography>
      }
    />
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  disclaimer: {
    display: 'flex',
    gap: 4,
    marginTop: 16,
  },
  chatWithUs: {
    textDecoration: 'underline',
    fontFamily: PP_OBJECT_SANS_MEDIUM,
    cursor: 'pointer',
  },
  modalClassName: {
    '& .primaryBtn': {
      flex: 1,
      maxWidth: 240,
      [breakpoints.down('xs')]: {
        maxWidth: 'unset',
        width: '100%',
      },
    },
    '& .secondaryBtn': {
      flex: 1,
      maxWidth: 240,
      [breakpoints.down('xs')]: {
        maxWidth: 'unset',
        width: '100%',
      },
    },
  },
}))
