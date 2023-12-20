import { ActionModal } from 'src/libs/account/shared/modals'
import { AutoPayBadge } from '@/shared-ui/react-icons/index'
import useAppData from '@/shared-ui/hooks/useAppData'

export const EnrollConfirmation = ({
  isOpen,
  handleClose,
}: {
  isOpen: boolean
  handleClose: any
}) => {
  const enrollConformationModal = useAppData('enrollConformationModal', true)
  return (
    <ActionModal
      isOpen={isOpen}
      icon={<AutoPayBadge />}
      handleClose={handleClose}
      title={enrollConformationModal?.title?.value}
      subTitle={enrollConformationModal?.description?.value}
      primaryBtnText={enrollConformationModal?.manageAutoPayBtn?.value}
      primaryBtnAction={handleClose}
    />
  )
}
