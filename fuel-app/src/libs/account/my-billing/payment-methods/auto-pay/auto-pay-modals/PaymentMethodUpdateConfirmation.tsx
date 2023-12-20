import { ActionModal } from 'src/libs/account/shared/modals'
import useAppData from '@/shared-ui/hooks/useAppData'

export const PaymentMethodUpdateConfirmation = ({
  isOpen,
  handleClose,
}: {
  isOpen: boolean
  handleClose: any
}) => {
  const autoPayPaymentMethodUpdatedModal = useAppData(
    'autoPayPaymentMethodUpdatedModal',
    true,
  )
  return (
    <ActionModal
      isOpen={isOpen}
      handleClose={handleClose}
      title={autoPayPaymentMethodUpdatedModal?.title?.value}
      subTitle={autoPayPaymentMethodUpdatedModal?.description?.value}
      primaryBtnText={autoPayPaymentMethodUpdatedModal?.ok?.value}
      primaryBtnAction={handleClose}
    />
  )
}
