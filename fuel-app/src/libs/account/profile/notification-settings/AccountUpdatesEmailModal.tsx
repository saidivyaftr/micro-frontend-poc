import TechnicalErrorIcon from '@/shared-ui/react-icons/technical-error-icon'
import { ActionModal } from '../../shared/modals'
import { useAppData } from 'src/hooks'

export const AccountUpdatesEmailModal = ({
  isOpen,
  handleClose,
  handleSave,
}: {
  isOpen: boolean
  handleClose: () => void
  handleSave: () => void
}) => {
  const notificationSettingsData = useAppData('notificationSettingsData', true)

  return (
    <ActionModal
      icon={<TechnicalErrorIcon height={80} width={80} />}
      showCloseButton={false}
      isOpen={isOpen}
      handleClose={handleClose}
      title={notificationSettingsData?.accountUpdateModalTitle?.value}
      subTitle={notificationSettingsData?.accountUpdateModalDescription?.value}
      primaryBtnText={notificationSettingsData?.noKeepOnButtonText?.value}
      primaryBtnAction={handleClose}
      secondaryBtnText={notificationSettingsData?.yesTurnOffButtonText?.value}
      secondaryBtnAction={handleSave}
    />
  )
}
