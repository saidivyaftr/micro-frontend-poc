import { makeStyles } from '@material-ui/core'
import { InjectHTML } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'

const Hero = () => {
  const classes = useStyles()
  const { image, title, subTitle } = useAppData('heroData', true)
  return (
    <div className={classes.container}>
      <img
        src={image?.src}
        alt={image?.alt}
        className={classes.heroLogo}
        loading="lazy"
      />
      <InjectHTML
        tagType="h1"
        styleType="h1"
        fontType="boldFont"
        className={classes.title}
        value={title?.value}
      />
      <InjectHTML styleType="h5" value={subTitle?.value} />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    ...COMPONENT_WRAPPER,
    textAlign: 'center',
    padding: '32px 16px',
  },
  title: {
    maxWidth: 1000,
    textTransform: 'none',
    letterSpacing: '-.03em',
    margin: 'auto',
    marginBottom: 16,
    [breakpoints.down('xs')]: {
      '& br': {
        display: 'none',
      },
    },
  },
  heroLogo: {
    width: '100%',
  },
}))

export default Hero
