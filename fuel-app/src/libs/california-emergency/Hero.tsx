import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@/shared-ui/components'
import { PADDING } from 'src/constants'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'

const Hero: React.FC = () => {
  const classes = useStyles()()
  const { title, description } = useAppData('hero', true)
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {title?.value && (
          <Typography
            tagType="h2"
            styleType="h2"
            fontType="regularFont"
            color="secondary"
            className={classes.title}
          >
            {title?.value}
          </Typography>
        )}
        {description?.value && (
          <Typography
            tagType="h4"
            styleType="h4"
            color="tertiary"
            fontType="boldFont"
            className={classes.description}
          >
            {description?.value}
          </Typography>
        )}
      </div>
    </div>
  )
}
const useStyles = () =>
  makeStyles(({ breakpoints }) => ({
    root: {
      backgroundColor: colors.main.midnightExpress,
      backgroundRepeat: 'no-repeat',
    },
    description: {
      marginTop: `${PADDING}px`,
      [breakpoints.down('sm')]: {
        fontSize: '25px',
      },
    },
    content: {
      padding: '120px 60px',
      [breakpoints.up('lg')]: {
        margin: '0 auto',
        maxWidth: '1000px',
      },
      [breakpoints.down('sm')]: {
        margin: '0 auto',
        width: '100%',
        textAlign: 'center',
        padding: '60px 20px',
      },
    },
    title: {
      [breakpoints.down('sm')]: {
        fontSize: '35px',
      },
    },
  }))

export default Hero
