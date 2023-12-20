import Typography from '@/shared-ui/components/Typography/Typography'
import { makeStyles } from '@material-ui/core'

const AddressRenderer = ({
  address,
}: {
  address: { street: string; city: string; state: string; zip: string }
}) => {
  const classes = useAdressStyles()

  if (!address) {
    return null
  }

  return (
    <div className={classes.addressWrapper}>
      <Typography styleType="p2" fontType="regularFont" testId="test-street">
        {`${address?.street}`}
      </Typography>
      <div className={classes.cityStateWrapper}>
        <Typography styleType="p2" fontType="regularFont" testId="test-city">
          {`${address?.city},`}
        </Typography>
        <Typography
          styleType="p2"
          fontType="regularFont"
          testId="test-zip"
        >{`${address?.state} ${address?.zip}`}</Typography>
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
