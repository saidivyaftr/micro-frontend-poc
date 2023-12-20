import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'

const Sticky: React.FC = () => {
  const classes = useStyles()()
  const { residential, business } = useAppData('sticky', true)
  if (!residential?.value || !residential?.value) {
    return null
  }
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {residential?.value && (
          <Button
            variant="lite"
            hoverVariant={'primary'}
            type="link"
            className={classes.button}
            href={'#'}
            text={residential?.value}
          />
        )}
        {business?.value && (
          <Button
            variant="lite"
            hoverVariant={'primary'}
            type="link"
            className={classes.button}
            href={'#'}
            text={business?.value}
          />
        )}
      </div>
    </div>
  )
}

const useStyles = () =>
  makeStyles(({ breakpoints }) => ({
    root: {
      backgroundColor: colors.main.midnightExpress,
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      zIndex: 10000,
    },
    button: {
      fontSize: '30px',
      color: colors.main.white,
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    content: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      padding: '2.5rem 0',
      [breakpoints.down('xs')]: {
        display: 'none',
      },
    },
  }))

export default Sticky
