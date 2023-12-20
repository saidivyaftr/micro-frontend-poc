/* eslint-disable @typescript-eslint/indent */
import { Modal } from '@material-ui/core'
import { Button } from '@/shared-ui/components'
import { Loading } from 'src/blitz'
import { AUTOPAY_CANCEL_MODAL_CONFIRM } from 'src/constants'
import ReportProblemIcon from '@material-ui/icons/ReportProblem'

import css from './autopay-modal.module.scss'
import { makeStyles } from '@material-ui/styles'
import colors from '@/shared-ui/colors'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'

interface IModalProps {
  open: boolean
  inProgress: boolean
  onClose?: () => void
  onSubmit?: () => void
  cancelConfirmation?: boolean
  error?: any
}
//TODO: Decide to make this component as a generic PaymentsModal to handle autopay, onetime payment and express pay
// or have one modal for autopay and one for payments
const AutopayModal: React.FC<IModalProps> = ({
  open,
  inProgress,
  onClose,
  onSubmit,
  cancelConfirmation = false,
  error = '',
}) => {
  const classes = useStyles()
  const title = cancelConfirmation
    ? AUTOPAY_CANCEL_MODAL_CONFIRM
    : inProgress
    ? 'Saving changes...'
    : ''

  const onCancel = (): void => {
    onSubmit && onSubmit()
  }
  return (
    <Modal onClose={onClose} open={open} className={`${css.autopayModal}`}>
      <div
        className={`${css.autopayModalContent} ${css.autopayCancelModalContent}`}
      >
        {title && <p className={css.autopayModalTitle}>{title}</p>}
        {inProgress ? (
          <div
            style={{
              marginTop: '16px',
            }}
          >
            <Loading />
          </div>
        ) : cancelConfirmation ? (
          <section className={css.autopayCancelModalActions}>
            <Button
              type="link"
              variant="tertiary"
              onClick={onClose}
              text={'Do Not Cancel'}
            />
            <Button
              type="link"
              variant="tertiary"
              onClick={onCancel}
              text={'Cancel Auto Pay'}
            />
          </section>
        ) : error ? (
          <section>
            <p className={classes.notification}>
              <ReportProblemIcon color="primary" />
              {error}
            </p>
            <div className={css.autopayokButton}>
              <Button
                type="submit"
                variant="primary"
                hoverVariant="primary"
                onClick={onClose}
                text={'OK'}
              />
            </div>
          </section>
        ) : null}
      </div>
    </Modal>
  )
}

const useStyles = makeStyles(() => ({
  notification: {
    fontFamily: PP_OBJECT_SANS,
    display: 'flex',
    alignItems: 'start',
    gap: '1rem',
    '& svg': {
      color: colors.main.brightRed,
    },
  },
  okBtn: {
    '&:hover': {
      backgroundColor: colors.main.midnightExpress,
    },
  },
}))

export default AutopayModal
