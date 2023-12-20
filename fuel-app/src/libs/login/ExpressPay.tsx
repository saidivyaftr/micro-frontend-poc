import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { Button, InjectHTML } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'

const ExpressPay = () => {
  const classes = useStyles()
  const { title, expressText, expressLink } = useAppData('expressPay', true)
  return (
    <div className={classes.expressRoot}>
      <div className={classes.innerWrapper}>
        <InjectHTML
          styleType="h5"
          tagType="h3"
          className={classes.title}
          value={title?.value}
        />
        <Button
          type="link"
          variant="primary"
          hoverVariant="secondary"
          text={expressText?.value}
          href={expressLink?.value}
          className={classes.expressBtn}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  expressRoot: {
    width: '100%',
    backgroundColor: colors.main.black,
    height: 137,
    display: 'flex',
    justifyContent: 'center',
  },
  innerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '57rem',
    margin: '0 auto',
    [breakpoints.down('sm')]: {
      justifyContent: 'center',
      gap: 16,
      flexDirection: 'column',
    },
  },
  title: {
    color: colors.main.white,
  },
  expressBtn: {
    background: colors.main.black,
    borderColor: colors.main.white,
    width: 250,
  },
}))

export default ExpressPay
