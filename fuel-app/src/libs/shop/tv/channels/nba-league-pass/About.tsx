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
      <div className={classes.aboutContainer}>
        <div>
          <Typography tagType="h2" styleType="h3" className={classes.pageTitle}>
            {title?.value}
          </Typography>
        </div>
        <div className={classes.body}>
          {list?.targetItems?.map((item: any) => (
            <div className={classes.leftPannel} key={item?.title?.value}>
              <Typography tagType="h4" styleType="h5" className={classes.title}>
                {item?.title?.value}
              </Typography>
              <InjectHTML
                value={item?.description?.value}
                styleType="p1"
                className={classes.itemContent}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints, typography }) => ({
  root: {
    color: `${colors.main.white}`,
    backgroundColor: `${colors.main.midnightExpress}`,
    marginTop: `${typography.pxToRem(48)}`,
  },
  aboutContainer: {
    ...COMPONENT_WRAPPER,
    [breakpoints.down('sm')]: {
      margin: `${typography.pxToRem(48)} ${typography.pxToRem(16)}`,
    },
  },
  body: {
    display: 'flex',
    paddingBottom: `${typography.pxToRem(99)}`,
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      paddingBottom: 0,
    },
  },
  leftPannel: {
    backgroundColor: `${colors.main.white}`,
    marginRight: `${typography.pxToRem(16)}`,
    padding: `${typography.pxToRem(32)}`,
    flex: 1,
    [breakpoints.down('sm')]: {
      padding: `${typography.pxToRem(16)}`,
      marginBottom: `${typography.pxToRem(32)}`,
    },
  },
  pageTitle: {
    color: '#fff',
    marginBottom: `${typography.pxToRem(48)}`,
    paddingTop: `${typography.pxToRem(48)}`,
    [breakpoints.down('sm')]: {
      paddingTop: `${typography.pxToRem(48)}`,
    },
  },
  title: {
    fontSize: `${typography.pxToRem(20)}`,
    [breakpoints.down('sm')]: {
      fontSize: `${typography.pxToRem(16)}`,
    },
  },
  list: {
    paddingLeft: 0,
  },
  content: {
    [breakpoints.down('sm')]: {
      fontSize: `${typography.pxToRem(16)}`,
    },
  },
  itemContent: {
    '& ul': {
      marginTop: 0,
      '& li': {
        marginBottom: `1rem`,
      },
    },
  },
}))
export default AboutSection
