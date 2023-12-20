import { ActionModal } from 'src/libs/account/shared/modals'
import { Typography } from '@/shared-ui/components'
import useAppData from '@/shared-ui/hooks/useAppData'

export const TurnOffConfirmationModal = ({
  isOpen,
  handleClose,
  handleTurnOffAutoPay,
  isBusy,
  hasError,
}: {
  isOpen: boolean
  handleClose: any
  handleTurnOffAutoPay: any
  isBusy: boolean
  hasError: boolean
}) => {
  const turnOffAutoPayModal = useAppData('turnOffAutoPayModal', true)
  return (
    <ActionModal
      isOpen={isOpen}
      handleClose={handleClose}
      title={turnOffAutoPayModal?.turnOffAutoPayQuestion?.value}
      subTitle={turnOffAutoPayModal?.description?.value}
      primaryBtnText={turnOffAutoPayModal?.primaryBtnText?.value}
      primaryBtnAction={handleClose}
      secondaryBtnText={turnOffAutoPayModal?.secondaryBtnText?.value}
      secondaryBtnAction={handleTurnOffAutoPay}
      isSecondaryBusy={isBusy}
      disclaimer={
        hasError ? (
          <Typography color="primary">
            {turnOffAutoPayModal?.somethingWentWrong?.value}
          </Typography>
        ) : null
      }
    />
  )
}
