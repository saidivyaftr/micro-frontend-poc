import { InjectHTML } from '@/shared-ui/components'
import useAppData from '@/shared-ui/hooks/useAppData'
import { makeStyles } from '@material-ui/core'
import { ActionModal } from 'src/libs/account/shared/modals'

export const WhereToFindAccountModal = ({
  isOpen,
  handleClose,
  isAccountPinInfo,
}: {
  isOpen: boolean
  handleClose: () => void
  isAccountPinInfo?: boolean
}) => {
  const classes = useStyles()
  const linkAccountData = useAppData('linkAccountData', true)

  let title = linkAccountData?.whereToFindAccNumberTitle?.value
  let description = linkAccountData?.whereToFindAccNumberDescription?.value

  if (isAccountPinInfo) {
    title = linkAccountData?.whereToFindAccPinTitle?.value
    description = linkAccountData?.whereToFindAccPinDescription?.value
  }

  return (
    <ActionModal
      isOpen={isOpen}
      handleClose={handleClose}
      title={title}
      titleClassName={classes.titleClassName}
      bodyClassName={classes.bodyClassName}
      info={
        <InjectHTML
          className={classes.description}
          value={description}
          styleType="p1"
        />
      }
      primaryBtnText={linkAccountData?.ok?.value}
      primaryBtnAction={handleClose}
    />
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  bodyClassName: {
    marginTop: 0,
  },
  description: {
    textAlign: 'left',
    '& ul': {
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      [breakpoints.down('xs')]: {
        paddingLeft: 32,
      },
    },
  },
  titleClassName: {
    [breakpoints.down('xs')]: {
      textAlign: 'left',
    },
  },
}))
