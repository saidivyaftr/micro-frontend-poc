import { makeStyles } from '@material-ui/core/styles'
import { COMPONENT_WRAPPER } from 'src/constants'
import { Typography } from '@/shared-ui/components'
import FeatureListItem from './FeatureListItem'
import { useAppData } from 'src/hooks'
import colors from 'src/styles/theme/colors'

const SpreadTheWord = () => {
  const classes = useStyles()
  const { title, description, featurelist } = useAppData('SpreadTheWord', true)

  return (
    <div className={classes.wrapper}>
      <div className={classes.container} id="more">
        <Typography
          styleType="h3"
          tagType="h3"
          className={classes.componentTitle}
        >
          {title?.value}
        </Typography>

        <Typography
          styleType="p1"
          tagType="div"
          className={classes.componentDescr}
        >
          {description?.value}
        </Typography>
        <div className={classes.featureGridWrapper}>
          {featurelist?.list?.map((feature: any, i: number) => (
            <FeatureListItem
              key={`${feature.title.value}-${i}`}
              feature={feature}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SpreadTheWord

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    background: colors.main.white,
  },
  container: {
    ...COMPONENT_WRAPPER,
    paddingTop: 80,
    paddingBottom: 48,
    [breakpoints.down('md')]: {
      padding: '32px 16px',
      margin: '32px 16px 16px 16px',
    },
  },
  componentTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  componentDescr: {
    textAlign: 'center',
  },
  featureGridWrapper: {
    marginTop: 32,
    display: 'inline-grid',
    gridTemplateColumns: 'auto auto',
    gridGap: 32,
    [breakpoints.down('xs')]: {
      gridTemplateColumns: 'auto',
    },
  },
}))
