import colors from '@/shared-ui/colors'
import { makeStyles } from '@material-ui/core'
import TwoColumnLayout from './TwoColumnLayout'

const ExperienceHighSpeed = (data: any) => {
  const classes = useStyles()
  const { leftContent, rightContent, legalText, toolTipText }: any =
    data?.data || {}

  if (!data || Object.keys(data)?.length === 0) {
    return null
  }

  return (
    <div id="experience-high-speed" className={classes.root}>
      <div className={classes.wrapper}>
        <TwoColumnLayout
          leftContent={leftContent?.value}
          rightContent={rightContent?.value}
          legalText={legalText?.value}
          toolTipText={toolTipText?.value}
          rightClass={classes.rightClass}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: colors.main.white,
  },
  wrapper: {
    boxSizing: 'content-box',
    maxWidth: 1200,
    margin: '0 auto',
    padding: '2rem 1rem ',
    [theme.breakpoints.up('md')]: {
      padding: '6.25rem 4rem',
    },
  },
  rightClass: {
    flex: 'unset',
    width: 'calc(53% + (5 / 244) * (100vw - 800px))',
    [theme.breakpoints.down(768)]: {
      flex: '1',
      width: 'unset',
    },
  },
}))

export default ExperienceHighSpeed
