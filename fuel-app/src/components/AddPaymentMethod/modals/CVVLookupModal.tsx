import { ActionModal } from 'src/libs/account/shared/modals'
import { CVV } from '@/shared-ui/react-icons'
import { paymentForm } from '../sitecore-mock'
import { makeStyles } from '@material-ui/core'

export const CVVLookupModal = ({
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
      title={paymentForm?.cvvNumberLookup?.value}
      subTitle={paymentForm?.cvvNumberLookupDescription?.value}
      info={<CVV className={classes.cvvCard} />}
    />
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  cvvCard: {
    [breakpoints.down('xs')]: {
      maxWidth: 200,
    },
  },
}))
