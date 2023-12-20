import { makeStyles } from '@material-ui/core'
import { Picture, Typography } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
import { COMPONENT_WRAPPER } from 'src/constants'

const LagInfo = () => {
  const classes = useStyles()
  const { title, description, disclaimer, desktopImg, mobileImg } = useAppData(
    'communityData',
    true,
  )
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.imgContainer}>
          <Picture
            desktop={{ image: desktopImg?.src || '' }}
            mobile={{
              image: mobileImg?.src || '',
            }}
            altText={desktopImg?.alt || ''}
          />
        </div>
        <div className={classes.rightContent}>
          <Typography tagType="h2" styleType="h4" className={classes.title}>
            {title?.value}
          </Typography>
          <Typography tagType="p" styleType="p2">
            {description?.value}
          </Typography>
          <Typography tagType="p" styleType="p4">
            {disclaimer?.value}
          </Typography>
        </div>
      </div>
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints, typography }) => ({
  root: {
    background: colors.main.greenishBlue,
    padding: `${typography.pxToRem(38)} ${typography.pxToRem(120)}`,
    [breakpoints.down('sm')]: {
      padding: `${typography.pxToRem(32)} 0`,
    },
  },
  content: {
    ...COMPONENT_WRAPPER,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  imgContainer: {
    margin: `0 ${typography.pxToRem(120)} ${typography.pxToRem(16)}`,
  },
  rightContent: {
    [breakpoints.down('sm')]: {
      margin: `${typography.pxToRem(16)} 0 ${typography.pxToRem(30)} 0`,
    },
  },
  title: {
    [breakpoints.down('sm')]: {
      fontSize: `${typography.pxToRem(18)}`,
    },
  },
}))
export default LagInfo
