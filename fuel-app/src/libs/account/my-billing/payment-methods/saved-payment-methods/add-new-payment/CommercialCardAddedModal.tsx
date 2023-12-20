import { ActionModal } from 'src/libs/account/shared/modals'
import useAppData from '@/shared-ui/hooks/useAppData'

export const CommercialCardAdded = ({
  isOpen,
  handleClose,
}: {
  isOpen: boolean
  handleClose: () => void
}) => {
  const commercialCardAddedModal = useAppData('commercialCardAddedModal', true)
  return (
    <ActionModal
      isOpen={isOpen}
      handleClose={handleClose}
      title={commercialCardAddedModal?.title?.value}
      subTitle={commercialCardAddedModal?.description?.value}
      primaryBtnText={commercialCardAddedModal?.ok?.value}
      primaryBtnAction={handleClose}
      disclaimer={commercialCardAddedModal?.disclaimer?.value}
    />
  )
}
