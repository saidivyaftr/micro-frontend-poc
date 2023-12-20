import { makeStyles } from '@material-ui/core'
import { InjectHTML } from 'src/blitz'
import { useAppData } from 'src/hooks'

const CartDisclaimer = () => {
  const classes = useStyles()
  const { description } =
    useAppData('EstimatedTotalLegalDescription', true) || {}

  return (
    <InjectHTML
      styleType="legal"
      tagType="div"
      color="default"
      className={classes.space}
      value={description?.value}
    />
  )
}

const useStyles = makeStyles(({}) => ({
  space: {
    marginTop: 20,
  },
}))

export default CartDisclaimer
