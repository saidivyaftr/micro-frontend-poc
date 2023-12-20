import { InjectHTML, Typography } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
import { COMPONENT_WRAPPER } from 'src/constants'

const AboutSection = () => {
  const classes = useStyles()
  const { title, list } = useAppData('leaguePass', true)
  return (
    <div className={classes.root}>
      <div>
        {title?.value && (
          <Typography tagType="h2" styleType="h3" className={classes.pageTitle}>
            {title?.value}
          </Typography>
        )}
      </div>
      <div className={classes.body}>
        {list?.targetItems?.map((item: any) => (
          <div className={classes.cardStyles} key={item?.title?.value}>
            <Typography tagType="h2" styleType="h4">
              {item?.title?.value}
            </Typography>
            <InjectHTML
              tagType="p"
              value={item.description.value}
              styleType="p1"
              className={classes.description}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints, typography }) => ({
  root: {
    backgroundColor: `${colors.main.midnightExpress}`,
  },
  body: {
    display: 'flex',
    ...COMPONENT_WRAPPER,
    paddingTop: '5rem',
    paddingBottom: '5rem',
    justifyContent: 'space-between',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      paddingTop: '3rem',
      paddingBottom: '1rem',
    },
  },
  description: {
    '& a': {
      '&:hover': {
        color: colors.main.brightRed,
      },
    },
  },
  cardStyles: {
    backgroundColor: `${colors.main.white}`,
    padding: '3rem 3rem 2rem 3rem',
    width: 'calc(50% - 16px)',
    [breakpoints.down('sm')]: {
      padding: '2rem 2rem 1rem 2rem',
      marginBottom: `${typography.pxToRem(32)}`,
      width: '100%',
    },
  },
  pageTitle: {
    marginBottom: `${typography.pxToRem(48)}`,
  },
  title: {
    fontSize: `${typography.pxToRem(20)}`,
  },
  list: {
    paddingLeft: 0,
  },
  content: {
    [breakpoints.down('sm')]: {
      fontSize: `${typography.pxToRem(16)}`,
    },
  },
}))
export default AboutSection
