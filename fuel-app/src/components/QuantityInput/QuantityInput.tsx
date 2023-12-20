import clsx from 'classnames'
import { makeStyles } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import { Typography } from '@/shared-ui/components'
import { Add, Minus } from '@/shared-ui/react-icons'
import colors from 'src/styles/theme/colors'

interface QuantityInputProps {
  quantityValue: number
  disableMinus: boolean
  disablePlus: boolean
  handleDecrement: () => void
  handleIncrement: () => void
}

const QuantityInput = ({
  quantityValue,
  disableMinus,
  disablePlus,
  handleDecrement,
  handleIncrement,
}: QuantityInputProps) => {
  const classes = useStyles()

  return (
    <div className={classes.quantityInput}>
      <IconButton
        aria-label="minus"
        className={clsx(classes.quantityControl, {
          [classes.disabled]: disableMinus,
        })}
        onClick={handleDecrement}
      >
        <Minus />
      </IconButton>

      <Typography
        tagType="span"
        styleType="p1"
        className={classes.quantityValue}
      >
        <>{quantityValue}</>
      </Typography>

      <IconButton
        aria-label="plus"
        className={clsx(classes.quantityControl, {
          [classes.disabled]: disablePlus,
        })}
        onClick={handleIncrement}
      >
        <Add />
      </IconButton>
    </div>
  )
}
export default QuantityInput

const useStyles = makeStyles(({ breakpoints }) => ({
  quantityInput: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 32,
    border: `1px solid ${colors.main.dark}`,
    background: `${colors.main.white}`,
    width: '100%',
    height: 48,
    padding: 10,
    [breakpoints.up('sm')]: {
      width: 124,
    },
  },
  quantityControl: {
    padding: 0,
  },
  quantityValue: {
    width: 40,
    textAlign: 'center',
    border: 'none',
  },
  disabled: {
    opacity: 0.3,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
}))
