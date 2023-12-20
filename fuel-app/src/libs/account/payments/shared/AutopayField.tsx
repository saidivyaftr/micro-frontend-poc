import { makeStyles } from '@material-ui/core'
import { Typography } from 'src/blitz'

const useStyles = makeStyles(({ breakpoints }) => ({
  field: {
    display: 'flex',
    marginBottom: '1rem',
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  fieldLabel: {
    width: '33.33%',
    paddingRight: '1rem',
    [breakpoints.down('xs')]: {
      width: 'auto',
    },
  },
  fieldValue: {
    width: '66.66%',
    [breakpoints.down('xs')]: {
      width: 'auto',
    },
  },
}))

const AutopayField = ({ label, value }: { label: string; value: string }) => {
  const css = useStyles()
  return (
    <div role="group" aria-labelledby={label} className={css.field}>
      <Typography
        styleType="h6"
        tagType="div"
        fontType="mediumFont"
        className={css.fieldLabel}
      >
        {label}
      </Typography>
      <Typography
        styleType="h6"
        tagType="div"
        fontType="regularFont"
        className={css.fieldValue}
      >
        {value}
      </Typography>
    </div>
  )
}

export default AutopayField
