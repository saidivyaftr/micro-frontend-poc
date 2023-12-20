import { RoutingNumber } from '@/shared-ui/react-icons/index'
import { ActionModal } from 'src/libs/account/shared/modals'
import { paymentForm } from '../sitecore-mock'
import { makeStyles } from '@material-ui/core'

export const RouterAndAccountNumberLookupModal = ({
  isOpen,
  handleClose,
}: {
  isOpen: boolean
  handleClose: any
}) => {
  const classes = useStyles()

  return (
    <ActionModal
      isOpen={isOpen}
      handleClose={handleClose}
      title={paymentForm?.accountAndRoutingLookup?.value}
      subTitle={paymentForm?.accountAndRoutingLookupDescription?.value}
      info={<RoutingNumber className={classes.routingNumber} />}
    />
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  routingNumber: {
    [breakpoints.down('xs')]: {
      maxWidth: 200,
    },
  },
}))
