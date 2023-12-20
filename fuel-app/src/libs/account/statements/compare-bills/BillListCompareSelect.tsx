import { makeStyles } from '@material-ui/core'
import { Typography } from 'src/blitz'
import { BillListCompareSelectTable } from './BillListCompareSelectTable'

const useStyles = makeStyles(() => ({
  container: {},
  title: {
    fontSize: '30px',
    marginTop: 0,
  },
}))

export const BillListCompareSelect = (): JSX.Element => {
  const classes = useStyles()
  return (
    <div className={`${classes.container}`}>
      <Typography
        tagType="h3"
        styleType="h3"
        fontType="regularFont"
        className={classes.title}
      >
        Compare Bills
      </Typography>
      <div>
        <Typography tagType="p" styleType="p2" fontType="regularFont">
          View and compare two bills at a time.
        </Typography>
      </div>
      <BillListCompareSelectTable />
    </div>
  )
}
