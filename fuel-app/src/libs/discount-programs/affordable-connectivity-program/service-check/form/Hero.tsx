import { makeStyles } from '@material-ui/styles'
import { Typography } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'

const Hero = () => {
  const styles = useStyles()
  const { heroData: [heroData] = [] } = useAppData('heroData', true)

  return (
    <div className={styles.root}>
      <div className={styles.innerWrapper}>
        <Typography
          color="tertiary"
          tagType="h6"
          styleType="h6"
          className={styles.preTitle}
        >
          {heroData?.subTitle?.value}
        </Typography>
        <Typography
          styleType="h1"
          tagType="h1"
          color="secondary"
          fontType="boldFont"
          className={styles.title}
        >
          {heroData?.title?.value}
        </Typography>
        <Typography color="tertiary" tagType="h5" styleType="h5">
          {heroData?.description?.value}
        </Typography>
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    background: colors.main.dark,
  },
  innerWrapper: {
    ...COMPONENT_WRAPPER,
    padding: '7.5rem 1rem',
  },
  title: {
    marginBottom: 16,
    textTransform: 'unset',
  },
  preTitle: {
    textTransform: 'uppercase',
    marginBottom: 16,
  },
}))

export default Hero
