import { makeStyles } from '@material-ui/core/styles'
import { InjectHTML, Typography } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import colors from '@/shared-ui/colors'

const Hero = ({ data }: any) => {
  const { initialTitle, heading }: any = data
  const classes = useStyles()()
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        {initialTitle?.value && (
          <Typography tagType="h6" styleType="h6" color="tertiary">
            {initialTitle?.value}
          </Typography>
        )}
        {heading?.value && (
          <InjectHTML
            tagType="h1"
            styleType="h1"
            className={classes.heading}
            value={heading?.value}
            color="secondary"
            fontType="regularFont"
          />
        )}
      </div>
    </div>
  )
}

const useStyles = () =>
  makeStyles(({ breakpoints }) => ({
    root: {
      backgroundColor: colors.main.dark,
    },
    wrapper: {
      ...COMPONENT_WRAPPER,
      paddingTop: '9.25rem',
      paddingBottom: '9.25rem',
    },
    heading: {
      margin: '1rem 0',
      textTransform: 'none',
      [breakpoints.down('sm')]: {
        margin: '0.5rem 0',
      },
    },
  }))

export default Hero
