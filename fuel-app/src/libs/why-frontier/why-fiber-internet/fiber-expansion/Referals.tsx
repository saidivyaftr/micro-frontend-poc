import { Button, InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'

const Referals = () => {
  const { heading, button } = useAppData('referals', true)
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.gridContainer}>
        <div>
          {heading?.value && (
            <InjectHTML
              tagType="h4"
              styleType="h5"
              className={classes.title}
              value={heading?.value}
            />
          )}
        </div>
        <div className={classes.btnRefer}>
          {button?.text && (
            <Button
              type="link"
              target="blank"
              className={classes.btn}
              text={button?.text}
              href={button?.link}
              variant="tertiary"
              hoverVariant="secondary"
            />
          )}
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    marginBottom: 60,
    backgroundColor: colors.main.newBackgroundGray,
    [breakpoints.down('md')]: {
      padding: 10,
    },
    [breakpoints.down('xs')]: {
      padding: 0,
    },
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridContainer: {
    padding: 41,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    gap: '16px',
    flexWrap: 'wrap',
    [breakpoints.down('xs')]: {
      padding: '32px 16px 32px 16px',
    },
  },
  title: {
    [breakpoints.down('xs')]: {},
  },
  btnRefer: {
    width: 'auto',
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  btn: {
    display: 'block',
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}))

export default Referals
