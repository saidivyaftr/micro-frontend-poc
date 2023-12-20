import { Hero, InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import useAppData from '@/shared-ui/hooks/useAppData'

const HeroBanner = () => {
  const classes = useStyles()
  const { heading } = useAppData('heroBanner', true) || {}
  return (
    <Hero
      backgroundColor="gravity"
      bkgImgClassName={classes.bkgContainer}
      leftContentClassName={classes.leftContent}
      content={
        <div className={classes.content}>
          {heading.value && (
            <InjectHTML
              tagType="h3"
              styleType="h3"
              className={classes.heading}
              value={heading.value}
              fontType="regularFont"
            />
          )}
        </div>
      }
    />
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  bkgContainer: {
    minHeight: '21.5rem !important',
  },
  heading: {
    fontSize: '40px',
    margin: '1rem 0',
    textTransform: 'none',
    color: colors.main.white,
    fontWeight: 400,
    lineHeight: 1.4,
    [breakpoints.down('sm')]: {
      margin: '0.5rem 0',
    },
  },
  content: {
    [breakpoints.down('md')]: {
      margin: '1.75rem 0',
    },
  },
  mainContent: {
    position: 'relative',
    marginBottom: '2rem',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  leftContent: { maxWidth: 'unset' },
}))
export default HeroBanner
