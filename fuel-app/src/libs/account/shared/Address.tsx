import { makeStyles } from '@material-ui/core'
import { BillingAddress, ServiceAddress } from 'src/redux/types/accountTypes'

const AddressRenderer = ({
  address,
}: {
  address: ServiceAddress | BillingAddress
}) => {
  const classes = useAdressStyles()
  return (
    <div className={classes.addressWrapper}>
      <div>{address.street ?? ''}</div>
      <div className={classes.cityStateWrapper}>
        <div>{address.city ?? ''}</div>
        <div>{`${address.state ?? ''} ${address.zip ?? ''}`}</div>
      </div>
    </div>
  )
}

const useAdressStyles = makeStyles(() => ({
  addressWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  cityStateWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: '0.4rem',
  },
}))

export default AddressRenderer
