import { InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { ActionModal } from 'src/libs/account/shared/modals'
import { TechnicalErrorIcon } from '@/shared-ui/react-icons/index'
import useAppData from '@/shared-ui/hooks/useAppData'

export const CannotProceedFurtherModal = ({
  isOpen,
  handleClose,
  isVerifyFailed,
}: {
  isOpen: boolean
  handleClose: () => void
  isVerifyFailed?: boolean
}) => {
  const classes = useStyles()
  const linkAccountData = useAppData('linkAccountData', true)

  let title = linkAccountData?.cannotFindAccountTitle?.value
  let description = linkAccountData?.cannotFindAccountDescription?.value

  if (isVerifyFailed) {
    title = linkAccountData?.cannotVerifyAccountTitle?.value
    description = linkAccountData?.cannotFindAccountDescription?.value
  }

  return (
    <ActionModal
      icon={<TechnicalErrorIcon />}
      isOpen={isOpen}
      handleClose={handleClose}
      title={title}
      bodyClassName={classes.bodyClassName}
      info={<InjectHTML value={description} styleType="p1" />}
      primaryBtnText={linkAccountData?.tryAgainBtn?.value}
      primaryBtnAction={handleClose}
    />
  )
}

const useStyles = makeStyles(() => ({
  bodyClassName: {
    marginTop: 0,
  },
}))
