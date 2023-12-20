import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@/shared-ui/components'
import { Divider } from '@material-ui/core'
import { PADDING } from 'src/constants'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'

const ButtonLinks: React.FC = () => {
  const classes = useStyles()()
  const { tabButtons } = useAppData('buttonUrls', true)
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {tabButtons?.targetItems.map((item: any, index: number) => {
          return (
            <Button
              key={`btn-${index}`}
              variant="lite"
              hoverVariant={'primary'}
              type="link"
              className={classes.btn}
              href={item.button.url}
              text={item.button.value}
            />
          )
        })}
      </div>
      <Divider className={classes.divider} />
    </div>
  )
}

const useStyles = () =>
  makeStyles(({ breakpoints }) => ({
    root: {},
    btn: {
      color: colors.main.black,
      padding: `${PADDING}px`,
      '&:hover': {
        textDecoration: 'underline',
        color: colors.main.torchRed,
      },
    },
    content: {
      display: 'flex',
      justifyContent: 'center',
      alignItem: 'center',
      [breakpoints.down('md')]: {
        flexWrap: 'wrap',
        justifyContent: 'left',
      },
      [breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    divider: {
      backgroundColor: colors.main.torchRed,
      height: '3px',
      [breakpoints.down('xs')]: {
        display: 'none',
      },
    },
  }))

export default ButtonLinks
