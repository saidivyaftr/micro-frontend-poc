import { InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { MAX_WIDTH_WITH_PADDING } from 'src/constants'
import { useAppData } from 'src/hooks'

const GamingBadge = () => {
  const data = useAppData('GamingBadge', true)
  const { title, description, legalText, image } = data

  const classes = useStyles()

  if (Object.keys(data).length === 0) {
    return null
  }

  return (
    <div id="gaming-badge" className={classes.root}>
      <div className={classes.container}>
        <div className={classes.leftContainer}>
          <img src={image?.src} alt={image?.alt} loading="lazy" />
        </div>
        <div className={classes.rightContainer}>
          {title?.value && (
            <InjectHTML tagType="h4" styleType="h4" value={title?.value} />
          )}
          {description?.value && (
            <InjectHTML
              tagType="p"
              styleType="p2"
              value={description?.value}
              className={classes.description}
            />
          )}
          {legalText?.value && (
            <InjectHTML
              tagType="p"
              data-testid="caption"
              styleType="legal"
              value={legalText?.value}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default GamingBadge

const useStyles = makeStyles(({ breakpoints }) => ({
  root: { backgroundColor: colors.main.greenishBlue },
  container: {
    maxWidth: MAX_WIDTH_WITH_PADDING,
    padding: '1rem',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      paddingTop: '2rem',
      paddingBottom: '3rem',
      marginTop: 0,
    },
  },
  leftContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    [breakpoints.down('sm')]: {
      marginTop: '2rem',
    },
  },
  description: {
    paddingTop: '1rem',
    paddingBottom: '.5rem',
    '& sup': {
      lineHeight: 0,
    },
    [breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
}))
